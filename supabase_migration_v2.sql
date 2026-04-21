-- ============================================================
-- Arthik Migration V2: Badges, Competitions & Profile Extensions
-- ============================================================

-- 1. Extend Profiles Table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'Student';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS city TEXT DEFAULT '';
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS games_played INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS modules_completed INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS tournaments_won INTEGER DEFAULT 0;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS balance INTEGER DEFAULT 50000;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_pro BOOLEAN DEFAULT false;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS avatar TEXT DEFAULT '';

-- 2. Badge Definitions Table
CREATE TABLE IF NOT EXISTS public.badges (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT '🏅',
    rarity TEXT NOT NULL DEFAULT 'Common', -- Common, Rare, Epic, Legendary
    criteria_type TEXT, -- e.g., 'STREAK', 'GAME_WIN', 'XP_THRESHOLD', 'MODULE_COMPLETE'
    criteria_value INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 3. User Badges Junction Table
CREATE TABLE IF NOT EXISTS public.user_badges (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    badge_id TEXT REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
    earned_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    UNIQUE(user_id, badge_id)
);

-- 4. Competitions Table
CREATE TABLE IF NOT EXISTS public.competitions (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    game_type TEXT NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ NOT NULL,
    prize TEXT NOT NULL DEFAULT '100 XP',
    entry_count INTEGER DEFAULT 0,
    status TEXT NOT NULL DEFAULT 'upcoming', -- upcoming, active, completed
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- ============================================================
-- RLS Policies
-- ============================================================

-- Badges: everyone can read definitions
ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read badge definitions"
ON public.badges FOR SELECT
USING (true);

-- User Badges: users can see their own earned badges
ALTER TABLE public.user_badges ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Users can view their own badges"
ON public.user_badges FOR SELECT
USING (auth.uid() = user_id);

-- Competitions: everyone can read
ALTER TABLE public.competitions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read competitions"
ON public.competitions FOR SELECT
USING (true);

-- Profiles: anyone can read for leaderboard (public)
-- (Assuming an existing select policy, add this if it doesn't exist)
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE tablename = 'profiles' AND policyname = 'Public profiles are viewable by everyone'
    ) THEN
        EXECUTE 'CREATE POLICY "Public profiles are viewable by everyone" ON public.profiles FOR SELECT USING (true)';
    END IF;
END $$;

-- ============================================================
-- Seed Data: Badge Definitions
-- ============================================================
INSERT INTO public.badges (id, name, description, icon, rarity, criteria_type, criteria_value) VALUES
('first-login', 'Welcome Aboard', 'Log in for the first time', '🚀', 'Common', 'LOGIN', 1),
('streak-7', 'Week Warrior', 'Maintain a 7-day streak', '🔥', 'Rare', 'STREAK', 7),
('streak-30', 'Monthly Master', 'Maintain a 30-day streak', '⚡', 'Epic', 'STREAK', 30),
('first-win', 'First Victory', 'Win your first game', '🏆', 'Common', 'GAME_WIN', 1),
('rank-1', 'Champion', 'Reach #1 on leaderboard', '👑', 'Legendary', 'RANK', 1),
('category-complete', 'Subject Expert', 'Complete all modules in a category', '📚', 'Epic', 'MODULE_COMPLETE', 10),
('trivia-perfect', 'Perfect Score', 'Get 10/10 in Financial Trivia', '💯', 'Rare', 'TRIVIA_PERFECT', 1),
('portfolio-pro', 'Portfolio Pro', 'Achieve 20%+ returns in Stock Simulator', '📈', 'Legendary', 'PORTFOLIO_RETURN', 20)
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Seed Data: Competitions
-- ============================================================
INSERT INTO public.competitions (id, name, game_type, start_date, end_date, prize, entry_count, status) VALUES
('weekly-trivia-1', 'Weekly Finance Quiz', 'Financial Trivia', '2026-03-23T18:00:00+05:30', '2026-03-23T19:00:00+05:30', '500 XP + Rare Badge', 0, 'upcoming'),
('stock-challenge', 'Stock Trading Championship', 'Stock Market Simulator', '2026-03-25T10:00:00+05:30', '2026-03-27T18:00:00+05:30', '1000 XP + Epic Badge', 0, 'upcoming')
ON CONFLICT (id) DO NOTHING;

-- ============================================================
-- Function: Auto-award badges based on criteria
-- ============================================================
CREATE OR REPLACE FUNCTION public.check_and_award_badges(target_user_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
    user_profile RECORD;
    badge_record RECORD;
    awarded_badges TEXT[] := '{}';
BEGIN
    -- Get user profile
    SELECT * INTO user_profile FROM public.profiles WHERE id = target_user_id;
    IF NOT FOUND THEN
        RETURN jsonb_build_object('success', false, 'message', 'User not found');
    END IF;

    -- Check each badge
    FOR badge_record IN SELECT * FROM public.badges LOOP
        -- Skip if already earned
        IF EXISTS (SELECT 1 FROM public.user_badges WHERE user_id = target_user_id AND badge_id = badge_record.id) THEN
            CONTINUE;
        END IF;

        -- Check criteria
        IF badge_record.criteria_type = 'STREAK' AND COALESCE(user_profile.streak_days, 0) >= badge_record.criteria_value THEN
            INSERT INTO public.user_badges (user_id, badge_id) VALUES (target_user_id, badge_record.id) ON CONFLICT DO NOTHING;
            awarded_badges := array_append(awarded_badges, badge_record.name);
        ELSIF badge_record.criteria_type = 'GAME_WIN' AND COALESCE(user_profile.games_played, 0) >= badge_record.criteria_value THEN
            INSERT INTO public.user_badges (user_id, badge_id) VALUES (target_user_id, badge_record.id) ON CONFLICT DO NOTHING;
            awarded_badges := array_append(awarded_badges, badge_record.name);
        ELSIF badge_record.criteria_type = 'LOGIN' THEN
            INSERT INTO public.user_badges (user_id, badge_id) VALUES (target_user_id, badge_record.id) ON CONFLICT DO NOTHING;
            awarded_badges := array_append(awarded_badges, badge_record.name);
        ELSIF badge_record.criteria_type = 'MODULE_COMPLETE' AND COALESCE(user_profile.modules_completed, 0) >= badge_record.criteria_value THEN
            INSERT INTO public.user_badges (user_id, badge_id) VALUES (target_user_id, badge_record.id) ON CONFLICT DO NOTHING;
            awarded_badges := array_append(awarded_badges, badge_record.name);
        END IF;
    END LOOP;

    RETURN jsonb_build_object('success', true, 'awarded', awarded_badges);
END;
$$;
