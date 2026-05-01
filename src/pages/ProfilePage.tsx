import AppLayout from "@/components/layout/AppLayout";
import { fetchCurrentUserProfile, UserProfile } from "@/lib/supabaseService";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar, Wallet, Shield, Target, Briefcase } from "lucide-react";

const ProfilePage = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const profile = await fetchCurrentUserProfile();
      setUser(profile);
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading || !user) {
    return (
      <AppLayout>
        <div className="mx-auto max-w-4xl animate-pulse space-y-6">
          <div className="h-32 rounded-xl bg-card border border-border" />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {[1, 2].map(i => <div key={i} className="h-24 rounded-xl bg-card border border-border" />)}
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="mx-auto max-w-4xl">
        {/* Profile header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="gold-border-top rounded-xl border border-border bg-card p-6"
        >
          <div className="flex flex-col items-center gap-4 sm:flex-row">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">
              {user.initials}
            </div>
            <div className="text-center sm:text-left">
              <h1 className="font-display text-2xl">{user.name}</h1>
              <p className="text-muted-foreground">{user.role} {user.city ? `• ${user.city}` : ""}</p>
              <div className="mt-1 flex items-center justify-center gap-1 text-sm text-muted-foreground sm:justify-start">
                <Calendar size={14} /> Joined {new Date(user.joinDate).toLocaleDateString("en-IN", { month: "long", year: "numeric" })}
              </div>
            </div>
            <div className="sm:ml-auto flex items-center gap-2">
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${user.isPro ? 'bg-yellow-500/20 text-yellow-500 border border-yellow-500/30' : 'bg-secondary text-muted-foreground border border-border'}`}>
                {user.isPro ? 'PRO MEMBER' : 'BASIC ACCOUNT'}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Info Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Wallet size={16} />
              <span className="text-sm font-medium">Financial Tools</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Account Tier</span>
                <span className="font-medium text-foreground">{user.role}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Default Currency</span>
                <span className="font-medium text-foreground">INR (₹)</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Simulator Balance</span>
                <span className="font-mono font-medium text-foreground">₹{user.balance.toLocaleString("en-IN")}</span>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Shield size={16} />
              <span className="text-sm font-medium">Account Security</span>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between text-sm">
                <span>Verification</span>
                <span className="text-success font-medium">Verified</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Session Status</span>
                <span className="text-success font-medium">Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Ambition (from AI Roadmap) */}
        {(user.financialAmbition || user.monthlySalary > 0) && (
          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="flex items-center gap-2 text-muted-foreground mb-4">
              <Target size={16} />
              <span className="text-sm font-medium">Financial Profile (from AI Roadmap)</span>
            </div>
            <div className="space-y-3">
              {user.monthlySalary > 0 && (
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2"><Briefcase size={14} /> Monthly Salary</span>
                  <span className="font-mono font-medium text-foreground">₹{user.monthlySalary.toLocaleString("en-IN")}</span>
                </div>
              )}
              {user.fieldOfWork && (
                <div className="flex items-center justify-between text-sm">
                  <span>Field of Work</span>
                  <span className="font-medium text-foreground">{user.fieldOfWork}</span>
                </div>
              )}
              {user.financialAmbition && (
                <div className="pt-2 border-t border-border/50">
                  <span className="text-xs text-muted-foreground">Financial Ambition</span>
                  <p className="mt-1 text-sm font-medium text-foreground">{user.financialAmbition}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Notice */}
        <div className="mt-8 p-6 rounded-xl border border-border bg-secondary/30 text-center">
            <p className="text-sm text-muted-foreground italic">
                Your profile is focused on Budgeting insights and Stock market simulations. 
                Gamification features have been deactivated to provide a professional financial experience.
            </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default ProfilePage;
