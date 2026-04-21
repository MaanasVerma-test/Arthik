import { useNavigate } from "react-router-dom";
import Hero from "@/components/ui/animated-shader-hero";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const HeroDemo: React.FC = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuthenticated(!!session?.user);
    });
  }, []);

  const handleGetStarted = () => {
    if (isAuthenticated) {
      navigate("/games/stock-simulator");
    } else {
      navigate("/signup");
    }
  };

  return (
    <Hero
      headline={{
        line1: "Finance is a skill.",
        line2: "Not a secret."
      }}
      subtitle="Master budgeting and investing through AI-powered insights and professional stock simulations. Take control of your financial future today."
      buttons={{
        primary: {
          text: "Get Started",
          onClick: handleGetStarted
        }
      }}
    />
  );
};

export default HeroDemo;
