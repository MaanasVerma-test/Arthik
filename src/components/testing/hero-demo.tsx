import { useNavigate } from "react-router-dom";
import Hero from "@/components/ui/animated-shader-hero";

const HeroDemo: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Hero
      headline={{
        line1: "Finance is a skill.",
        line2: "Not a secret."
      }}
      subtitle="Master budgeting and investing through AI-powered insights and professional stock simulations. Take control of your financial future today."
      buttons={{
        primary: {
          text: "Start Budgeting",
          onClick: () => navigate("/budgeting")
        },
        secondary: {
          text: "Try Simulation",
          onClick: () => navigate("/games/stock-simulator")
        }
      }}
    />
  );
};

export default HeroDemo;
