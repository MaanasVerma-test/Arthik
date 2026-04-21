-- ============================================================
-- Arthik Cleanup: Remove Learning and Gaming Components
-- ============================================================

-- 1. Drop Obsolete Tables
DROP TABLE IF EXISTS public.user_badges CASCADE;
DROP TABLE IF EXISTS public.badges CASCADE;
DROP TABLE IF EXISTS public.competitions CASCADE;
DROP TABLE IF EXISTS public.leaderboard_snapshots CASCADE;

-- 2. Drop RPC Functions
DROP FUNCTION IF EXISTS public.check_and_award_badges(UUID);
DROP FUNCTION IF EXISTS public.award_xp_securely(UUID, INTEGER, TEXT, JSONB);

-- 3. Cleanup Profiles Table
-- Removing columns related to gamification
ALTER TABLE public.profiles DROP COLUMN IF EXISTS xp;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS streak_days;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS games_played;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS modules_completed;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS tournaments_won;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS rank;
ALTER TABLE public.profiles DROP COLUMN IF EXISTS avatar; -- often used for gamified avatars

-- Note: keeping 'role', 'city', 'balance', 'is_pro' as they might be useful for 
-- budgeting/pro settings or general profile info.

-- 4. Drop Activity Logs if no longer needed for gamification
DROP TABLE IF EXISTS public.activity_logs CASCADE;
