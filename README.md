# Arthik (अर्थीक) — Full Project Description

> **Tagline:** *Earn. Play. Grow.*
> A gamified financial literacy platform that makes learning about money fun, interactive, and deeply personalized — powered by AI. Built for India.

---

## 1. Overview

Arthik is a **React + TypeScript** single-page application designed to teach financial literacy through interactive simulations, AI-powered budgeting, and structured learning content. The platform targets Indian users and uses the Indian Rupee (₹) as its primary currency, starting every user with a **virtual ₹1,00,000** portfolio.

**Live deployment:** [arthik-earn-play-grow.vercel.app](https://arthik-earn-play-grow.vercel.app/)

---

## 2. Tech Stack

| Layer              | Technology                                                     |
| ------------------ | -------------------------------------------------------------- |
| **Framework**      | React 18 + TypeScript                                          |
| **Build Tool**     | Vite 5                                                         |
| **Styling**        | Tailwind CSS 3 + shadcn/ui (50+ UI components)                 |
| **Animations**     | Framer Motion                                                  |
| **Charts**         | ApexCharts (candlestick, line) + Recharts                      |
| **AI**             | Google Gemini 2.5 Flash (`@google/generative-ai`)              |
| **Backend / Auth** | Supabase (Auth, Postgres DB, Realtime subscriptions, RLS)      |
| **State**          | TanStack React Query                                           |
| **Icons**          | Lucide React                                                   |
| **HTTP**           | Axios (Yahoo Finance proxy), native `fetch` (Binance, Twelve Data) |
| **Deployment**     | Vercel                                                         |
| **Testing**        | Vitest + Testing Library + Playwright (e2e)                    |

---

## 3. Architecture

### 3.1 Directory Structure

```
src/
├── App.tsx                 # Root router — defines all routes
├── main.tsx                # Entry point
├── index.css               # Global styles & Tailwind directives
├── components/
│   ├── landing/            # Marketing landing page components
│   │   ├── Navbar.tsx
│   │   ├── HeroSection.tsx
│   │   ├── PillarsSection.tsx
│   │   ├── WaitlistSection.tsx
│   │   └── Footer.tsx
│   ├── layout/
│   │   └── AppLayout.tsx   # Authenticated app shell (nav, sidebar, header)
│   ├── learn/              # Learning roadmap UI
│   │   ├── LearningPathMap.tsx
│   │   ├── LessonNode.tsx
│   │   └── LessonView.tsx
│   ├── budget/
│   │   └── AnimatedAvatar.tsx
│   ├── testing/
│   │   └── hero-demo.tsx   # Animated shader hero component
│   └── ui/                 # 50+ shadcn/ui primitives (button, dialog, card, etc.)
├── pages/
│   ├── Index.tsx            # Landing / home page
│   ├── LoginPage.tsx        # Supabase email auth login
│   ├── SignupPage.tsx       # Supabase email auth signup
│   ├── DashboardPage.tsx    # Unified portfolio dashboard
│   ├── StockSimulatorPage.tsx  # Live stock trading simulator
│   ├── ForexSimulatorPage.tsx  # Live forex trading simulator
│   ├── CryptoPage.tsx       # Live crypto trading simulator
│   ├── AiBudgetingPage.tsx  # AI-powered budget & roadmap builder
│   ├── NewsPage.tsx         # Live market news feed
│   ├── ProfilePage.tsx      # User profile & settings
│   ├── AboutUsPage.tsx      # About the creator
│   └── NotFound.tsx         # 404 page
├── lib/
│   ├── supabase.ts          # Supabase client initialization
│   ├── supabaseService.ts   # User profile CRUD, portfolio updates, realtime
│   ├── stockApi.ts          # Yahoo Finance API + mock fallback engine
│   ├── forexApi.ts          # Twelve Data API for forex quotes & history
│   ├── cryptoApi.ts         # Binance API for crypto prices & klines
│   ├── newsApi.ts           # Yahoo Finance RSS → JSON news feed
│   ├── gemini.ts            # Google Gemini AI integration for budgeting
│   ├── portfolioLogic.ts    # Monte Carlo portfolio simulation & rating
│   ├── multiplayerService.ts # (Planned) 1v1 multiplayer service
│   └── secureService.ts     # Activity logging
├── data/
│   ├── learningRoadmap.ts   # 7 structured lessons with quizzes (35+ subtopics)
│   ├── financialTriviaData.ts # Trivia quiz questions
│   ├── budgetEvents.ts      # Budget challenge event scenarios
│   └── mockData.ts          # Seed / fallback data
└── hooks/
    ├── use-mobile.tsx       # Responsive breakpoint hook
    └── use-toast.ts         # Toast notification hook
```

### 3.2 Routing

| Route                      | Component              | Description                    |
| -------------------------- | ---------------------- | ------------------------------ |
| `/`                        | `Index`                | Marketing landing page         |
| `/login`                   | `LoginPage`            | Email/password login           |
| `/signup`                  | `SignupPage`           | Email/password registration    |
| `/dashboard`               | `DashboardPage`        | Portfolio overview & stats     |
| `/games/stock-simulator`   | `StockSimulatorPage`   | NSE/BSE stock trading          |
| `/games/forex-simulator`   | `ForexSimulatorPage`   | Global forex pair trading      |
| `/crypto`                  | `CryptoPage`           | Crypto trading (Binance data)  |
| `/budgeting`               | `AiBudgetingPage`      | AI budget & roadmap generator  |
| `/news`                    | `NewsPage`             | Live financial news            |
| `/profile`                 | `ProfilePage`          | User settings & stats          |
| `/about`                   | `AboutUsPage`          | Creator info                   |

---

## 4. Feature Modules

### 4.1 🏠 Landing Page (`Index.tsx`)

- **Animated Shader Hero** — a WebGL-style animated background via `animated-shader-hero.tsx`
- **Hero Demo** — showcases a virtual portfolio card with floating streak/badge chips and animated XP progress bar
- **Pillars Section** — highlights the 3 pillars: Earn, Play, Grow
- **Waitlist Section** — email signup for early access
- **Navbar** — glassmorphism-style navigation with auth-aware buttons
- **Footer** — standard site footer

### 4.2 📊 Stock Market Simulator (`StockSimulatorPage.tsx`)

- **Virtual ₹1,00,000 starting balance** shared across all simulators
- **Real-time stock quotes** from Yahoo Finance via Vite dev proxy (`/api/yahoo/...`)
- **Stock search** — search any global equity/ETF by name or symbol
- **Candlestick & Line chart toggle** — powered by ApexCharts
- **Time range filters**: 1D, 5D, 15D, 1M, 5M, 1Y
- **Live/Mock indicator badge** — shows whether data is live or simulated
- **Buy/Sell functionality** with quantity input and portfolio tracking
- **Mock fallback engine** — generates realistic volatility-based price data when API is unavailable
- **Holdings table** — shows current positions with avg price, quantity, P&L
- **Persistent storage** — all trades saved to Supabase `profiles.stock_holdings`

### 4.3 🌍 Forex Simulator (`ForexSimulatorPage.tsx`)

- **10 major forex pairs** (EUR/USD, GBP/USD, USD/JPY, etc.)
- **Live quotes** from Twelve Data API
- **Historical candlestick/line charts** with time ranges: 1D, 5D, 1M, 6M, 1Y
- **Buy/Sell with shared balance** — deducts from the same ₹1,00,000 pool
- **Persistent forex holdings** — saved to `profiles.forex_holdings`

### 4.4 🪙 Crypto Simulator (`CryptoPage.tsx`)

- **9 cryptocurrencies**: BTC, ETH, BNB, SOL, ADA, XRP, DOT, DOGE, MATIC
- **Live data from Binance public API** — 24hr ticker + kline endpoints
- **USD → INR conversion** — fetches live USDT/INR rate from Binance
- **Time ranges**: 1H, 4H, 1D, 7D, 1M, 1Y
- **Candlestick charts** for each crypto
- **Buy/Sell with shared balance** — saved to `profiles.crypto_holdings`

### 4.5 🤖 AI Budget & Roadmap Builder (`AiBudgetingPage.tsx`)

Powered by **Google Gemini 2.5 Flash**, this feature generates personalized financial plans:

**Inputs:**
- Age, Monthly Earnings, Field of Work, Expected Annual Increment %, Ultimate Financial Ambition

**AI-Generated Outputs:**
- **Monthly Savings Split** — Goal savings, Emergency Fund, Miscellaneous
- **Stress/Difficulty Meter** — Score 1–10 with color-coded severity
- **Time Analysis** — Estimated years to achieve the goal + achievability flag
- **Portfolio Allocation** — Donut chart + exact ₹ amounts for Equity, Debt, Gold, Other
- **Wealth Growth Projection** — Area chart showing projected wealth at every age
- **Step-by-Step Roadmap** — Year-by-year milestones with actionable advice

### 4.6 📈 Dashboard (`DashboardPage.tsx`)

A unified portfolio overview showing:
- **Cash Balance** — remaining liquid funds
- **Invested Value** — total across Stocks + Forex + Crypto
- **Total Equity** — Cash + Invested
- **Overall P&L** — profit/loss vs. initial ₹1,00,000 with percentage
- **Portfolio Breakdown by Market** — visual progress bars per asset class
- **Recent Activity Feed** — transaction history from `secureService`
- **Quick Actions** — links to Budget, Stocks, Forex, Crypto

### 4.7 📰 Market News (`NewsPage.tsx`)

- **Live Yahoo Finance RSS feed** via `rss2json.com` API
- Displays article titles, publication dates, thumbnails, and descriptions
- Links out to full articles

### 4.8 📚 Learning Roadmap (7 Lessons)

A **Duolingo-style vertical learning path** with structured content:

| Lesson | Title                  | Topics                                            |
| ------ | ---------------------- | ------------------------------------------------- |
| 1      | Making Money           | Get rich quick myths, asset classes, trading vs investing |
| 2      | How Markets Work       | Trading styles, correlations, CFDs, market cycles |
| 3      | Advanced Strategies    | Moving averages, technical analysis               |
| 4      | Risk Management        | Stop losses                                       |
| 6      | Trading Strategies     | Strategy definition, scalping, breakout/reversal  |
| 7      | Risk Management (Adv)  | Capital preservation, position sizing             |
| 8      | Chart Patterns         | Head & Shoulders, Flags & Pennants                |

Each subtopic has educational content + a multiple-choice quiz.

### 4.9 🎮 Portfolio Simulation Game (`portfolioLogic.ts`)

- Users allocate across **Equity, Debt, Gold, Real Estate**
- **Monte Carlo simulation** using Box-Muller transform for realistic market returns
- **Portfolio rating system** (1–10) with detailed feedback on diversification, risk, and allocation quality

### 4.10 👤 Auth & User Profile

- **Supabase Auth** — email/password signup and login
- **Profile management** — name, avatar, city, role
- **PRO badge support** — visual indicator for premium users
- **Realtime subscriptions** — profile updates via Supabase Realtime channels
- **Guest mode** — full simulator access with ₹1,00,000 virtual balance (no persistence)

---

## 5. External API Integrations

| API             | Purpose                         | Auth                |
| --------------- | ------------------------------- | ------------------- |
| Yahoo Finance   | Stock quotes + historical data  | Via Vite proxy      |
| Twelve Data     | Forex quotes + time series      | API key (embedded)  |
| Binance         | Crypto prices + klines + INR rate | Public (no key)   |
| Google Gemini   | AI budget/roadmap generation    | API key (`.env`)    |
| rss2json.com    | Yahoo Finance news RSS → JSON   | Public              |
| Supabase        | Auth, DB, Realtime              | URL + anon key      |

---

## 6. Bonus: Flask Quiz Game (`New folder/`)

A **standalone Python/Flask** application (separate from the main React app):
- 8-topic financial literacy quiz with 40 questions
- Duolingo-style progressive unlock (complete one topic to unlock the next)
- Session-based scoring and progress tracking
- Completion page with per-topic score breakdown
- Runs independently on `http://localhost:5000`

---

## 7. Database Schema (Supabase)

The Supabase `profiles` table stores:
- `id` (UUID, linked to auth.users)
- `full_name`, `avatar`, `role`, `city`, `created_at`
- `balance` (shared cash balance, default ₹1,00,000)
- `is_pro` (boolean)
- `stock_holdings` (JSONB array — symbol, qty, avgPrice)
- `forex_holdings` (JSONB array — symbol, qty, avgPrice)
- `crypto_holdings` (JSONB array — symbol, qty, avgPrice)

Multiple SQL migrations exist for schema evolution (`supabase_migration_v2` through `v5_fix_rls`).

---

## 8. Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

```sh
git clone https://github.com/MaanasVerma-test/arthik-earn-play-grow.git
cd arthik-earn-play-grow
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_SUPABASE_URL=your_supabase_url (optional)
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key (optional)
```

> Get a free Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey).

### Run Locally

```sh
npm run dev
```

---

## 9. Available Scripts

| Command          | Description               |
| ---------------- | ------------------------- |
| `npm run dev`    | Start development server  |
| `npm run build`  | Production build          |
| `npm run lint`   | Run ESLint                |
| `npm run test`   | Run unit tests (Vitest)   |

---

## 10. Key Design Decisions

1. **Unified Balance** — All three simulators (Stock, Forex, Crypto) share a single ₹1,00,000 balance, teaching users about capital allocation across asset classes
2. **Graceful Degradation** — Every API call has a mock/fallback engine so the app works even when APIs are down
3. **India-First** — INR formatting, NSE/BSE stock symbols, Indian financial context in lessons
4. **AI Realism** — The Gemini prompt explicitly asks for honest, realistic financial plans (including telling users when goals are unrealistic)
5. **Client-Side Caching** — 1-minute cache on quotes and charts to be respectful of free API rate limits

---

## 🌟 Mission

Our mission is to make financial education **inclusive, accessible, and fun**. Every citizen deserves the tools to manage their wealth and understand the economy.

**Start your journey with Arthik today** → [arthik-earn-play-grow.vercel.app](https://arthik-earn-play-grow.vercel.app/)
