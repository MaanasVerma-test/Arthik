import { motion } from "framer-motion";
import { badges } from "@/data/mockData";

const rarityColor: Record<string, string> = {
  Common: "border-common/40 text-common",
  Rare: "border-rare/40 text-rare",
  Epic: "border-epic/40 text-epic",
  Legendary: "border-legendary/40 text-legendary",
};

const rarityBg: Record<string, string> = {
  Common: "bg-common/10",
  Rare: "bg-rare/10",
  Epic: "bg-epic/10",
  Legendary: "bg-legendary/10",
};

const BadgesSection = () => (
  <section className="border-t border-border py-20">
    <div className="container mx-auto px-4">
      <motion.h2
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center font-display text-3xl sm:text-4xl"
      >
        Collect <span className="text-gold-gradient">Badges</span>
      </motion.h2>
      <p className="mx-auto mt-3 max-w-md text-center text-muted-foreground">
        Earn achievements as you learn and play. From Common to Legendary.
      </p>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 max-w-2xl mx-auto">
        {badges.slice(0, 4).map((b, i) => (
          <motion.div
            key={b.id}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className={`flex flex-col items-center rounded-xl border bg-card p-5 text-center ${rarityColor[b.rarity]}`}
          >
            <div className={`flex h-14 w-14 items-center justify-center rounded-full text-2xl ${rarityBg[b.rarity]}`}>
              {b.icon}
            </div>
            <h4 className="mt-3 text-sm font-medium text-foreground">{b.name}</h4>
            <span className={`mt-1 text-xs ${rarityColor[b.rarity]}`}>{b.rarity}</span>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default BadgesSection;
