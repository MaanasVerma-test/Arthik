import { supabase } from "./supabase";

// ============================================================
// Types
// ============================================================

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string; // Keeping for UI compatibility
  role: string;
  city: string;
  joinDate: string;
  balance: number;
  isPro: boolean;
  stockHoldings: any[];
  forexHoldings: any[];
}

// ============================================================
// Default empty profile (used when not logged in)
// ============================================================

const defaultProfile: UserProfile = {
  id: "",
  name: "Guest",
  email: "",
  avatar: "G",
  role: "User",
  city: "",
  joinDate: new Date().toISOString(),
  balance: 100000,
  isPro: false,
  stockHoldings: [],
  forexHoldings: [],
};

// ============================================================
// User Profile
// ============================================================

export const fetchCurrentUserProfile = async (): Promise<UserProfile> => {
  try {
    const {
      data: { user: authUser },
    } = await supabase.auth.getUser();
    if (!authUser) return defaultProfile;

    const { data: profile, error } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", authUser.id)
      .single();

    if (error || !profile) {
      console.warn("Could not fetch profile, using defaults:", error?.message);
      return {
        ...defaultProfile,
        id: authUser.id,
        name: authUser.email?.split("@")[0] || "User",
        email: authUser.email || "",
        avatar: (authUser.email?.split("@")[0] || "U").substring(0, 2).toUpperCase(),
      };
    }

    const displayName =
      profile.full_name ||
      authUser.user_metadata?.full_name ||
      authUser.email?.split("@")[0] ||
      "User";
    const initials = displayName
      .split(" ")
      .map((w: string) => w[0])
      .join("")
      .substring(0, 2)
      .toUpperCase();

    return {
      id: authUser.id,
      name: displayName,
      email: authUser.email || "",
      avatar: profile.avatar || initials,
      role: profile.role || "User",
      city: profile.city || "",
      joinDate: profile.created_at || authUser.created_at || new Date().toISOString(),
      balance: profile.balance !== undefined ? profile.balance : 100000,
      isPro: profile.is_pro || false,
      stockHoldings: profile.stock_holdings || [],
      forexHoldings: profile.forex_holdings || [],
    };
  } catch (err) {
    console.error("Error fetching user profile:", err);
    return defaultProfile;
  }
};

// ============================================================
// Realtime subscription for profile updates
// ============================================================

export const subscribeToProfile = (
  userId: string,
  callback: (profile: any) => void
) => {
  const channel = supabase
    .channel(`profile_${userId}`)
    .on(
      "postgres_changes",
      {
        event: "UPDATE",
        schema: "public",
        table: "profiles",
        filter: `id=eq.${userId}`,
      },
      (payload) => {
        callback(payload.new);
      }
    )
    .subscribe();

  return () => {
    channel.unsubscribe();
  };
};

// ============================================================
// Portfolio Updates
// ============================================================

export const updatePortfolio = async (
  userId: string,
  newBalance: number,
  newStockHoldings?: any[],
  newForexHoldings?: any[]
) => {
  try {
    const updates: any = { balance: newBalance };
    if (newStockHoldings !== undefined) updates.stock_holdings = newStockHoldings;
    if (newForexHoldings !== undefined) updates.forex_holdings = newForexHoldings;

    const { error } = await supabase
      .from("profiles")
      .update(updates)
      .eq("id", userId);

    if (error) throw error;
    return true;
  } catch (err) {
    console.error("Error updating portfolio:", err);
    return false;
  }
};
