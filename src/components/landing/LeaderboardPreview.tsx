import { motion } from "framer-motion";
import { leaderboardUsers } from "@/data/mockData";
import { Crown } from "lucide-react";

const rankStyles: Record<number, string> = {
  1: "text-primary font-bold",
  2: "text-muted-foreground font-semibold",
  3: "text-warning font-semibold",
};

const LeaderboardPreview = () => (
  <section className="border-t border-border py-20">
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-display text-3xl sm:text-4xl"
      >
        Weekly <span className="text-gold-gradient">Leaderboard</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto mt-10 max-w-2xl overflow-hidden rounded-xl border border-border bg-card"
      >
        <div className="grid grid-cols-[3rem_1fr_5rem_5rem] gap-2 border-b border-border px-4 py-3 text-xs text-muted-foreground">
          <span>#</span>
          <span>Player</span>
          <span className="text-right">XP</span>
          <span className="text-right">Badges</span>
        </div>
        {leaderboardUsers.slice(0, 5).map((u) => (
          <div
            key={u.rank}
            className="grid grid-cols-[3rem_1fr_5rem_5rem] items-center gap-2 border-b border-border px-4 py-3 last:border-0"
          >
            <span className={`font-mono text-sm ${rankStyles[u.rank] || "text-muted-foreground"}`}>
              {u.rank === 1 ? <Crown size={16} className="text-primary" /> : u.rank}
            </span>
            <div className="flex items-center gap-2">
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-secondary text-xs font-medium">
                {u.avatar}
              </div>
              <div>
                <span className="text-sm font-medium">{u.name}</span>
                <span className="ml-2 text-xs text-muted-foreground">{u.city}</span>
              </div>
            </div>
            <span className="text-right font-mono text-sm">{u.xp.toLocaleString()}</span>
            <span className="text-right font-mono text-sm">{u.badges}</span>
          </div>
        ))}
        {/* "You" row */}
        <div className="grid grid-cols-[3rem_1fr_5rem_5rem] items-center gap-2 border-t-2 border-primary/30 bg-primary/5 px-4 py-3">
          <span className="font-mono text-sm text-muted-foreground">14</span>
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground">
              AP
            </div>
            <div>
              <span className="text-sm font-medium text-primary">You</span>
              <span className="ml-2 text-xs text-muted-foreground">Mumbai</span>
            </div>
          </div>
          <span className="text-right font-mono text-sm">2,340</span>
          <span className="text-right font-mono text-sm">3</span>
        </div>
      </motion.div>
    </div>
  </section>
);

export default LeaderboardPreview;
