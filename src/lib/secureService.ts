import { supabase } from "./supabase";

export interface ActivityLog {
  id: string;
  activity_type: string;
  details: string;
  created_at: string;
}

export const secureService = {
  /**
   * Fetches recent activity logs for the current user.
   */
  getRecentActivity: async (limit: number = 5): Promise<ActivityLog[]> => {
    try {
      const { data: session } = await supabase.auth.getSession();
      if (!session.session?.user) return [];

      const { data, error } = await supabase
        .from('activity_logs')
        .select('*')
        .eq('user_id', session.session.user.id)
        .order('created_at', { ascending: false })
        .limit(limit);

      if (error) throw error;
      return data || [];
    } catch (e) {
      console.error("Failed to fetch activity logs:", e);
      return [];
    }
  }
};
