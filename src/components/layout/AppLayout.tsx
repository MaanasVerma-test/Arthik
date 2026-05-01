import { ReactNode, useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, User, Menu, X, LineChart, Wallet, Coins, Globe, Newspaper, Info } from "lucide-react";
import { fetchCurrentUserProfile, UserProfile } from "@/lib/supabaseService";

const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Stock Sim", icon: LineChart, href: "/games/stock-simulator" },
  { label: "Forex Sim", icon: Globe, href: "/games/forex-simulator" },
  { label: "Crypto", icon: Coins, href: "/crypto" },
  { label: "Budgeting", icon: Wallet, href: "/budgeting" },
  { label: "Market News", icon: Newspaper, href: "/news" },
  { label: "About Us", icon: Info, href: "/about" },
  { label: "Profile", icon: User, href: "/profile" },
];

const defaultUser: UserProfile = {
  id: "",
  name: "Guest",
  email: "",
  initials: "G",
  role: "User",
  city: "",
  joinDate: new Date().toISOString(),
  balance: 100000,
  isPro: false,
  stockHoldings: [],
  forexHoldings: [],
  cryptoHoldings: [],
  financialAmbition: "",
  monthlySalary: 0,
  fieldOfWork: "",
};

const AppLayout = ({ children }: { children: ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserProfile>(defaultUser);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const profile = await fetchCurrentUserProfile();
        setUser(profile);
      } catch (err) {
        console.error("Unexpected error in AppLayout fetchProfile:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Top Header & Navigation */}
      <header className="sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-xl">
        <div className="flex h-16 items-center px-4 md:px-6">
          <div className="flex items-center gap-4">
            <button className="md:hidden text-foreground" onClick={() => setMobileMenuOpen(true)}>
              <Menu size={22} />
            </button>
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-display text-sm text-primary-foreground">अ</div>
              <span className="font-display text-lg hidden sm:inline-block">Arthik</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 ml-10">
            {navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${location.pathname === item.href ? "text-primary border-b-2 border-primary py-5" : "text-muted-foreground hover:text-foreground py-5"}`}
              >
                <item.icon size={16} />
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3 ml-auto">
             <div className="hidden sm:flex items-center gap-3 mr-2">

                {user.isPro && (
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-500 border border-yellow-500/30 rounded-full text-xs font-bold tracking-wider">
                    PRO
                  </div>
                )}
             </div>

            <Link
              to={user.id ? "/profile" : "/signup"}
              className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-xs font-medium text-primary-foreground ml-1 hover:bg-primary/90 transition-colors cursor-pointer"
            >
              {user.initials}
            </Link>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 border-r border-border bg-card transition-transform md:hidden ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-5">
          <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary font-display text-sm text-primary-foreground">अ</div>
            <span className="font-display text-lg">Arthik</span>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="text-muted-foreground">
            <X size={20} />
          </button>
        </div>
        <div className="p-4 border-b border-border">

          {user.isPro && (
            <div className="inline-flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-yellow-400/20 to-orange-500/20 text-yellow-500 border border-yellow-500/30 rounded-full text-xs font-bold tracking-wider">
              PRO MEMBER
            </div>
          )}
        </div>
        <nav className="mt-4 space-y-1 px-3">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setMobileMenuOpen(false)}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${location.pathname === item.href ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-secondary hover:text-foreground"}`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-6 lg:p-8">
        {children}
      </main>
    </div>
  );
};

export default AppLayout;
