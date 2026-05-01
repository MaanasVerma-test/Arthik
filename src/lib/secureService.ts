// Re-exports from the unified supabaseService for backward compatibility.
// All database operations are now centralized in supabaseService.ts.

export { getRecentActivity, getTradeHistory } from "./supabaseService";
export type { ActivityLog, TradeRecord } from "./supabaseService";
