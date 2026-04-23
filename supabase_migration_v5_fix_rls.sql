-- ============================================================
-- Arthik Migration V5: Fix Profile RLS & Auto-Creation
-- ============================================================

-- 1. Ensure profile row exists for the current user
-- (Run this first to fix existing accounts with no profile row)
INSERT INTO public.profiles (id, full_name, balance, stock_holdings, forex_holdings, crypto_holdings)
SELECT 
  auth.uid(),
  (SELECT raw_user_meta_data->>'full_name' FROM auth.users WHERE id = auth.uid()),
  100000,
  '[]'::jsonb,
  '[]'::jsonb,
  '[]'::jsonb
WHERE NOT EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid());

-- 2. Auto-create profile on signup (trigger)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, balance, stock_holdings, forex_holdings, crypto_holdings)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    100000,
    '[]'::jsonb,
    '[]'::jsonb,
    '[]'::jsonb
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Drop existing trigger if it exists, then recreate
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 3. RLS Policies for profiles (UPDATE policy is critical!)
-- Allow users to update their own profile
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'profiles' AND policyname = 'Users can update their own profile'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can update their own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id)';
    END IF;
END $$;

-- Allow users to insert their own profile (for first-time creation)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'profiles' AND policyname = 'Users can insert their own profile'
    ) THEN
        EXECUTE 'CREATE POLICY "Users can insert their own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id)';
    END IF;
END $$;
