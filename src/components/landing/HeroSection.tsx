import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { TrendingUp, Flame, Award } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen grid-texture radial-gold pt-16">
      <div className="container mx-auto flex flex-col items-center px-4 pt-20 pb-16 lg:flex-row lg:pt-28">
        {/* Left content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-4xl leading-tight sm:text-5xl lg:text-6xl"
          >
            Finance is a skill.
            <br />
            <span className="text-gold-gradient">Not a secret.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="mt-6 max-w-lg text-lg text-muted-foreground lg:text-xl"
          >
            Master investing, budgeting, and markets through interactive games
            and bite-sized lessons. Built for India.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <Button size="lg" asChild className="text-base">
              <Link to="/signup">Start Learning Free</Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="text-base">
              <Link to="/games">Explore Games</Link>
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="mt-10 flex flex-wrap justify-center gap-8 lg:justify-start"
          >
            {[
              { value: "40+", label: "Topics" },
              { value: "4", label: "Game Modes" },
              { value: "Live", label: "Leaderboards" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="font-mono text-2xl font-bold text-primary">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right — floating portfolio card */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-12 flex-1 lg:mt-0 lg:pl-12"
        >
          <div className="relative mx-auto max-w-sm">
            {/* Main card */}
            <div className="gold-border-top rounded-xl border border-border bg-card p-6 gold-glow">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">
                  Virtual Portfolio
                </span>
                <span className="flex items-center gap-1 text-sm text-success">
                  <TrendingUp size={14} /> +12.4%
                </span>
              </div>
              <div className="mt-3 font-mono text-3xl font-bold">
                ₹1,12,400
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                Starting: ₹1,00,000
              </div>

              <div className="mt-5 space-y-3">
                {[
                  { name: "RELIANCE", shares: 5, value: "₹12,280", change: "+3.2%" },
                  { name: "TCS", shares: 3, value: "₹11,670", change: "-0.8%" },
                  { name: "HDFCBANK", shares: 8, value: "₹13,230", change: "+1.5%" },
                ].map((stock) => (
                  <div
                    key={stock.name}
                    className="flex items-center justify-between rounded-lg bg-secondary/50 px-3 py-2"
                  >
                    <div>
                      <span className="font-mono text-sm font-medium">
                        {stock.name}
                      </span>
                      <span className="ml-2 text-xs text-muted-foreground">
                        {stock.shares} shares
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="font-mono text-sm">{stock.value}</div>
                      <div
                        className={`text-xs ${stock.change.startsWith("+") ? "text-success" : "text-destructive"}`}
                      >
                        {stock.change}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* XP progress */}
              <div className="mt-5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Level 3 — Practitioner</span>
                  <span className="font-mono">2,340 / 3,500 XP</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: "67%" }}
                    transition={{ duration: 1, delay: 0.8 }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </div>
            </div>

            {/* Floating chips */}
            <motion.div
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
              className="absolute -top-4 -right-4 flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm shadow-lg"
            >
              <Flame size={14} className="text-warning" />
              <span className="font-mono font-medium">12 day streak</span>
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3.5, repeat: Infinity, delay: 0.5 }}
              className="absolute -bottom-3 -left-4 flex items-center gap-1.5 rounded-full border border-border bg-card px-3 py-1.5 text-sm shadow-lg"
            >
              <Award size={14} className="text-primary" />
              <span className="font-medium">Week Warrior</span>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
