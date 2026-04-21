/**
 * Static educational content and game data - DEPRECATED
 * Fixed platform focus: Budgeting and Stock Market Simulation
 */

// User-specific data (profiles) has been moved to Supabase.
// Stock catalog data has been moved to stockCatalog.ts.

export const getUserLevel = (xp: number) => {
  return { level: 1, minXP: 0, maxXP: Infinity, title: "Member" };
};

// Static fallbacks if needed for specific legacy UI parts
export const staticLeaderboard = [];
export const staticBadges = [];
