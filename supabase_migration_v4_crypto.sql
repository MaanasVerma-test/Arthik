-- ============================================================
-- Arthik Migration V4: Crypto Holdings Support
-- ============================================================

-- 1. Add JSONB column for crypto holdings on the profiles table
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS crypto_holdings JSONB DEFAULT '[]'::jsonb;

-- Note: The shared balance column already exists from V3.
-- Crypto holdings use the same format as stock/forex: [{symbol, qty, avgPrice}]
