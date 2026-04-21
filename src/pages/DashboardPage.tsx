import { useState, useEffect } from "react";
import AppLayout from "@/components/layout/AppLayout";
import { fetchCurrentUserProfile, UserProfile } from "@/lib/supabaseService";
import { Trophy, TrendingUp, History, Zap, Wallet, LayoutDashboard, Coins } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { secureService, ActivityLog } from "@/lib/secureService";

const DashboardPage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [activities, setActivities] = useState<ActivityLog[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [profile, recentLogs] = await Promise.all([
        fetchCurrentUserProfile(),
        secureService.getRecentActivity(),
      ]);

      setUser(profile);
      setActivities(recentLogs);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading || !user) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-5xl space-y-6">
          <div className="animate-pulse space-y-4">
            <div className="h-32 rounded-xl bg-card border border-border" />
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="h-24 rounded-xl bg-card border border-border" />
              ))}
            </div>
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-5xl space-y-6">
        {/* Welcome */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="gold-border-top rounded-xl border border-border bg-card p-6"
        >
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="font-display text-2xl">Welcome back, {user.name.split(" ")[0]}</h1>
              <p className="mt-1 text-muted-foreground">{user.role}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-secondary rounded-full text-sm">
                  <span className="text-muted-foreground">Status:</span>
                  <span className="font-medium text-foreground">{user.isPro ? 'PRO Member' : 'Basic Account'}</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Quick stats grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-2">
          {[
            { label: "Portfolio Simulation", value: "Active", icon: TrendingUp, href: "/games/stock-simulator" },
            { label: "Crypto Markets", value: "Live", icon: Coins, href: "/crypto" },
            { label: "AI Budgeting", value: "Ready", icon: Wallet, href: "/budgeting" },
          ].map((s, i) => (
            <Link key={s.label} to={s.href} className={i === 2 ? "col-span-2 sm:col-span-1" : ""}>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.05 }}
                className="rounded-xl border border-border bg-card p-6 hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <s.icon size={24} className="text-primary" />
                  <div className="text-xs font-bold text-success bg-success/10 px-2 py-1 rounded">{s.value}</div>
                </div>
                <div className="mt-4 text-lg font-bold">{s.label}</div>
                <div className="text-xs text-muted-foreground mt-1">Manage your {s.label.toLowerCase()} settings</div>
              </motion.div>
            </Link>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
           {/* Recent Activity */}
           <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="rounded-xl border border-border bg-card p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <History size={16} />
                <span className="text-sm font-medium">Recent Activity</span>
              </div>
            </div>
            <div className="space-y-4">
              {activities.length > 0 ? (
                activities.map((activity, i) => (
                  <div key={activity.id} className="flex items-center justify-between border-b border-border/50 pb-3 last:border-0 last:pb-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <Zap size={14} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{activity.details}</p>
                        <p className="text-xs text-muted-foreground">{new Date(activity.created_at).toLocaleDateString()}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="py-8 text-center text-sm text-muted-foreground">
                  <p>No recent activity found.</p>
                </div>
              )}
            </div>
          </motion.div>

          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="gold-border-top rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-2 text-muted-foreground">
                <LayoutDashboard size={16} />
                <span className="text-sm font-medium">Quick Actions</span>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3">
                <Button variant="outline" size="sm" asChild>
                  <Link to="/budgeting">Open Budget</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/games/stock-simulator">View Stocks</Link>
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default DashboardPage;
