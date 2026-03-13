import { motion } from "framer-motion";
import { BookOpen, Gamepad2, Swords, Trophy } from "lucide-react";

const pillars = [
  { icon: BookOpen, title: "Learn", description: "Bite-sized lessons on budgeting, investing, taxes, and markets — tailored for India." },
  { icon: Gamepad2, title: "Play", description: "Sharpen your skills with stock simulators, budget challenges, and financial trivia." },
  { icon: Swords, title: "Compete", description: "Enter weekly tournaments and climb the leaderboard against thousands of players." },
  { icon: Trophy, title: "Earn", description: "Collect XP, unlock badges, and track your progress from novice to finance master." },
];

const PillarsSection = () => (
  <section className="border-t border-border py-20">
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-display text-3xl sm:text-4xl"
      >
        The 4 Pillars of <span className="text-gold-gradient">Arthik</span>
      </motion.h2>
      <div className="mt-12 grid gap-px rounded-xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
        {pillars.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex flex-col items-center bg-card p-8 text-center first:rounded-tl-xl last:rounded-br-xl"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <p.icon size={24} />
            </div>
            <h3 className="mt-4 font-display text-xl">{p.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{p.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default PillarsSection;
