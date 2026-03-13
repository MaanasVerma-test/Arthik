import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { toast } from "sonner";

const WaitlistSection = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    toast.success("You're on the list! We'll notify you when Arthik launches.");
    setEmail("");
  };

  return (
    <section className="border-t border-border py-20 radial-gold">
      <div className="container mx-auto px-4 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-3xl sm:text-4xl"
        >
          Ready to master your <span className="text-gold-gradient">finances</span>?
        </motion.h2>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          Join the waitlist and be the first to know when we launch new features.
        </p>
        <form
          onSubmit={handleSubmit}
          className="mx-auto mt-8 flex max-w-md gap-3"
        >
          <Input
            type="email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="bg-secondary"
          />
          <Button type="submit">Join Waitlist</Button>
        </form>
      </div>
    </section>
  );
};

export default WaitlistSection;
