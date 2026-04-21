import AppLayout from "@/components/layout/AppLayout";
import { Info, Linkedin, Target, Users, BookOpen } from "lucide-react";

const AboutUsPage = () => {
  return (
    <AppLayout>
      <div className="container mx-auto max-w-4xl py-12 px-4 sm:px-6 lg:px-8 animate-fade-in">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <Info className="h-8 w-8 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold tracking-tight text-foreground sm:text-5xl mb-4">
            About Us
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Democratizing financial education through interactive simulations and AI-driven insights.
          </p>
        </div>

        <div className="grid gap-12 md:grid-cols-2 lg:gap-16 mb-16">
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500/10 rounded-lg shrink-0">
                <Target className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Our Mission</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Our mission is to empower individuals to make informed financial decisions. We believe that financial literacy is a fundamental skill, not a well-kept secret. Through immersive market simulations, intuitive budgeting tools, and modern AI, we aim to bridge the gap between complex financial concepts and everyday understanding.
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-4">
              <div className="p-3 bg-green-500/10 rounded-lg shrink-0">
                <BookOpen className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Our Approach</h3>
                <p className="text-muted-foreground leading-relaxed">
                  We combine gamified learning with real-world data to create a risk-free environment where you can practice trading, manage virtual portfolios, and learn from AI budgeting assistants. Experience the markets without the real-world financial risk.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-card border border-border rounded-xl p-8 flex flex-col items-center text-center justify-center shadow-sm relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            <div className="w-24 h-24 bg-secondary rounded-full flex items-center justify-center mb-6 border-4 border-background shadow-lg z-10">
              <Users className="h-10 w-10 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-bold mb-2 z-10">Connect With Us</h3>
            <p className="text-muted-foreground mb-8 z-10 w-full">
              Have questions or want to collaborate? Connect directly with the founder on LinkedIn.
            </p>
            <a 
              href="https://www.linkedin.com/in/maanas-verma-219360361" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#0A66C2] text-white hover:bg-[#0A66C2]/90 h-11 px-8 z-10 shadow-md hover:shadow-lg"
            >
              <Linkedin className="h-5 w-5" />
              Connect on LinkedIn
            </a>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-border/50 text-center">
          <p className="text-muted-foreground font-medium">
            Developed by <span className="text-foreground">Maanas Verma</span>
          </p>
        </div>
      </div>
    </AppLayout>
  );
};

export default AboutUsPage;
