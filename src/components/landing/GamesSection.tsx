import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { TrendingUp, Wallet, HelpCircle, PieChart } from "lucide-react";

const games = [
  { icon: TrendingUp, title: "Stock Market Simulator", desc: "Trade with virtual ₹1,00,000 using real historical data from NSE/BSE.", difficulty: "Medium", xp: "100-200", link: "/games/stock-simulator" },
  { icon: Wallet, title: "Budget Challenge", desc: "Given a monthly salary and random life events — survive and grow savings.", difficulty: "Easy", xp: "80-150", link: "/games" },
  { icon: HelpCircle, title: "Financial Trivia", desc: "Test your knowledge with timed Q&A rounds. Solo or vs others.", difficulty: "Easy", xp: "50-100", link: "/games/trivia" },
  { icon: PieChart, title: "Portfolio Builder", desc: "Allocate across equity, debt, gold, and real estate. Simulate 10 years.", difficulty: "Hard", xp: "150-250", link: "/games" },
];

const diffColor: Record<string, string> = {
  Easy: "text-common",
  Medium: "text-warning",
  Hard: "text-destructive",
};

const GamesSection = () => (
  <section className="border-t border-border py-20 radial-gold">
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-display text-3xl sm:text-4xl"
      >
        Games that <span className="text-gold-gradient">teach</span>
      </motion.h2>
      <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
        Learn finance by doing. Each game awards XP and unlocks badges.
      </p>

      <div className="mt-12 grid gap-6 sm:grid-cols-2">
        {games.map((g, i) => (
          <motion.div
            key={g.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Link
              to={g.link}
              className="gold-border-top block rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40"
            >
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <g.icon size={20} />
                </div>
                <div>
                  <h3 className="font-display text-lg">{g.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">{g.desc}</p>
                  <div className="mt-3 flex gap-4 text-xs">
                    <span className={diffColor[g.difficulty]}>
                      {g.difficulty}
                    </span>
                    <span className="text-muted-foreground">
                      {g.xp} XP per session
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default GamesSection;
