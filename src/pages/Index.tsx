import Navbar from "@/components/landing/Navbar";
import HeroDemo from "@/components/testing/hero-demo";
import PillarsSection from "@/components/landing/PillarsSection";
import GamesSection from "@/components/landing/GamesSection";
import LeaderboardPreview from "@/components/landing/LeaderboardPreview";
import BadgesSection from "@/components/landing/BadgesSection";
import WaitlistSection from "@/components/landing/WaitlistSection";

import Footer from "@/components/landing/Footer";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <HeroDemo />
    <PillarsSection />
    <WaitlistSection />

    <Footer />
  </div>
);

export default Index;
