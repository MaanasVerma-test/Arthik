-- ============================================================
-- Arthik Migration V3: Shared Balance & Simulator Holdings
-- ============================================================

-- 1. Default Balance to 100,000 as requested
ALTER TABLE public.profiles ALTER COLUMN balance SET DEFAULT 100000;

-- 2. Update existing accounts that might have the old 50,000 default
UPDATE public.profiles SET balance = 100000 WHERE balance = 50000;

-- 3. Add JSONB columns for holdings
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS stock_holdings JSONB DEFAULT '[]'::jsonb;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS forex_holdings JSONB DEFAULT '[]'::jsonb;

-- Note: No new RLS policies are needed as they are stored directly on the profile
