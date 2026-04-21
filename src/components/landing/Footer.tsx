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
        <Link to="/budgeting" className="hover:text-foreground">Budgeting</Link>
        <Link to="/games/stock-simulator" className="hover:text-foreground">Stock Sim</Link>
        <Link to="/games/forex-simulator" className="hover:text-foreground">Forex Sim</Link>
        <Link to="/news" className="hover:text-foreground">News</Link>
        <Link to="/about" className="hover:text-foreground">About Us</Link>
        <Link to="/profile" className="hover:text-foreground">Profile</Link>
      </div>
      <p className="text-xs text-muted-foreground">
        © 2026 Arthik. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;
