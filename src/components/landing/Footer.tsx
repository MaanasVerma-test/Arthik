import { Link } from "react-router-dom";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto flex flex-col items-center gap-6 px-4 sm:flex-row sm:justify-between">
      <Link to="/" className="flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-display text-sm text-primary-foreground">
          अ
        </div>
        <span className="font-display text-lg text-foreground">Arthik</span>
      </Link>
      <div className="flex gap-6 text-sm text-muted-foreground">
        <Link to="/learn" className="hover:text-foreground">Learn</Link>
        <Link to="/games" className="hover:text-foreground">Games</Link>
        <Link to="/compete" className="hover:text-foreground">Compete</Link>
        <Link to="/leaderboard" className="hover:text-foreground">Leaderboard</Link>
      </div>
      <p className="text-xs text-muted-foreground">
        © 2026 Arthik. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
