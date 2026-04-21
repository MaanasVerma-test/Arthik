import { useState, useEffect, useCallback } from "react";
import AppLayout from "@/components/layout/AppLayout";
import {
  fetchCryptoPrices,
  fetchCryptoKlines,
  getUsdToInrRate,
  CryptoAsset,
  CryptoKline,
  CryptoTimeRange,
} from "@/lib/cryptoApi";
import { motion, AnimatePresence } from "framer-motion";
import {
  TrendingUp,
  TrendingDown,
  Coins,
  RefreshCw,
  ArrowLeft,
  Activity,
  BarChart,
  IndianRupee,
  DollarSign,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Chart from "react-apexcharts";

const TIME_RANGES: CryptoTimeRange[] = ["1H", "4H", "1D", "7D", "1M", "1Y"];

const CryptoPage = () => {
  const [assets, setAssets] = useState<CryptoAsset[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

  // Detail view state
  const [selectedSymbol, setSelectedSymbol] = useState<string | null>(null);
  const selectedAsset = assets.find((a) => a.symbol === selectedSymbol) || null;
  const [klines, setKlines] = useState<CryptoKline[]>([]);
  const [timeRange, setTimeRange] = useState<CryptoTimeRange>("1D");
  const [chartType, setChartType] = useState<"line" | "candlestick">("line");
  const [isChartLoading, setIsChartLoading] = useState(false);

  // Currency toggle
  const [currency, setCurrency] = useState<"USD" | "INR">("USD");
  const [inrRate, setInrRate] = useState<number>(85.5);

  const loadData = async () => {
    setLoading(true);
    const [data, rate] = await Promise.all([fetchCryptoPrices(), getUsdToInrRate()]);
    setAssets(data);
    setInrRate(rate);
    setLoading(false);
    setLastUpdated(new Date());
  };

  useEffect(() => {
    loadData();
    const interval = setInterval(loadData, 60000);
    return () => clearInterval(interval);
  }, []);

  // Load klines when asset or time range changes
  const loadChart = useCallback(async () => {
    if (!selectedAsset) return;
    setIsChartLoading(true);
    const data = await fetchCryptoKlines(selectedAsset.symbol, timeRange);
    setKlines(data);
    setIsChartLoading(false);
  }, [selectedAsset, timeRange, lastUpdated]);

  useEffect(() => {
    loadChart();
  }, [loadChart]);

  const openDetail = (asset: CryptoAsset) => {
    setSelectedSymbol(asset.symbol);
    setTimeRange("1D");
    setChartType("line");
  };

  const fx = (usdVal: number) => (currency === "INR" ? usdVal * inrRate : usdVal);
  const sym = currency === "INR" ? "₹" : "$";

  const formatPrice = (val: number) =>
    `${sym}${fx(val).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

  // ── Chart config ──
  const apexSeries =
    chartType === "candlestick"
      ? [{ data: klines.map((k) => ({ x: k.timestamp, y: [fx(k.open), fx(k.high), fx(k.low), fx(k.close)] })) }]
      : [{ name: "Price", data: klines.map((k) => ({ x: k.timestamp, y: parseFloat(fx(k.close).toFixed(2)) })) }];

  const apexOptions: any = {
    chart: { type: chartType, toolbar: { show: false }, animations: { enabled: false }, background: "transparent" },
    grid: { show: false },
    xaxis: {
      type: "datetime",
      labels: {
        style: { colors: "hsl(216 18% 62%)", fontSize: "10px" },
        datetimeUTC: false,
        format: timeRange === "1H" || timeRange === "4H" ? "HH:mm" : "dd MMM",
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: {
      labels: {
        style: { colors: "hsl(216 18% 62%)", fontSize: "10px" },
        formatter: (v: number) => `${sym}${v.toLocaleString(undefined, { maximumFractionDigits: 2 })}`,
      },
    },
    theme: { mode: "dark" },
    tooltip: {
      theme: "dark",
      y: { formatter: (v: number) => `${sym}${v.toLocaleString(undefined, { minimumFractionDigits: 2 })}` },
      x: { format: "dd MMM, HH:mm" },
    },
    stroke: { curve: "monotoneCubic", width: chartType === "line" ? 2 : 1 },
    colors: ["hsl(42 52% 54%)"],
    plotOptions: {
      candlestick: { colors: { upward: "hsl(142 71% 45%)", downward: "hsl(0 84% 60%)" } },
    },
  };

  // ── Render ──
  return (
    <AppLayout>
      <div className="mx-auto max-w-6xl space-y-6">
        {/* Header */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            {selectedAsset && (
              <Button variant="ghost" size="icon" onClick={() => setSelectedSymbol(null)}>
                <ArrowLeft size={18} />
              </Button>
            )}
            <div>
              <h1 className="font-display text-3xl">
                {selectedAsset ? selectedAsset.name : "Crypto Markets"}
              </h1>
              <p className="text-muted-foreground mt-1">
                {selectedAsset
                  ? `${selectedAsset.symbol.replace("USDT", " / USDT")} · Live chart`
                  : "Live prices and 24h performance from Binance"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {/* Currency toggle */}
            <div className="flex rounded-lg border border-border overflow-hidden text-xs font-semibold">
              <button
                onClick={() => setCurrency("USD")}
                className={`flex items-center gap-1 px-3 py-1.5 transition-colors ${currency === "USD" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              >
                <DollarSign size={12} /> USD
              </button>
              <button
                onClick={() => setCurrency("INR")}
                className={`flex items-center gap-1 px-3 py-1.5 transition-colors ${currency === "INR" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground hover:text-foreground"}`}
              >
                <IndianRupee size={12} /> INR
              </button>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap hidden sm:block">
              Updated: {lastUpdated.toLocaleTimeString()}
            </span>
            <Button variant="outline" size="sm" onClick={loadData} disabled={loading}>
              <RefreshCw size={14} className={`mr-2 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {selectedAsset ? (
            /* ─── Detail / Chart view ─── */
            <motion.div key="detail" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} className="space-y-6">
              {/* Price header */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
                      <Coins size={28} />
                    </div>
                    <div>
                      <h2 className="font-mono text-2xl font-bold">{selectedAsset.name}</h2>
                      <p className="text-sm text-muted-foreground">{selectedAsset.symbol.replace("USDT", " / USDT")}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono text-3xl font-bold">{formatPrice(selectedAsset.rawPrice)}</div>
                    <div
                      className={`flex items-center justify-end gap-1 text-sm font-medium mt-1 ${
                        !selectedAsset.priceChangePercent.startsWith("-") ? "text-success" : "text-destructive"
                      }`}
                    >
                      {!selectedAsset.priceChangePercent.startsWith("-") ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      {selectedAsset.priceChangePercent}%
                    </div>
                  </div>
                </div>

                {/* 24h stats */}
                <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border pt-4">
                  <div>
                    <span className="text-xs text-muted-foreground">24h High</span>
                    <div className="font-mono text-sm font-bold mt-0.5">
                      {formatPrice(selectedAsset.high24h)}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">24h Low</span>
                    <div className="font-mono text-sm font-bold mt-0.5">
                      {formatPrice(selectedAsset.low24h)}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs text-muted-foreground">24h Volume</span>
                    <div className="font-mono text-sm font-bold mt-0.5">${selectedAsset.volume}</div>
                  </div>
                </div>
              </div>

              {/* Chart controls */}
              <div className="rounded-xl border border-border bg-card p-5">
                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex gap-2">
                    {TIME_RANGES.map((r) => (
                      <button
                        key={r}
                        onClick={() => setTimeRange(r)}
                        className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors ${
                          timeRange === r
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                  <div className="w-[140px]">
                    <Select value={chartType} onValueChange={(v: "line" | "candlestick") => setChartType(v)}>
                      <SelectTrigger className="h-8 text-xs">
                        <SelectValue placeholder="Chart Type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="line">
                          <div className="flex items-center gap-2"><Activity size={14} /> Line</div>
                        </SelectItem>
                        <SelectItem value="candlestick">
                          <div className="flex items-center gap-2"><BarChart size={14} /> Candlestick</div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="mt-4 h-[320px] relative">
                  {isChartLoading && (
                    <div className="absolute inset-0 flex items-center justify-center bg-card/50 backdrop-blur-sm z-10 rounded-lg">
                      <RefreshCw size={24} className="animate-spin text-primary" />
                    </div>
                  )}
                  <div className="h-full w-full">
                    {klines.length > 0 && (
                      <Chart options={apexOptions} series={apexSeries} type={chartType} height="100%" width="100%" />
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            /* ─── Grid view ─── */
            <motion.div key="grid" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              {loading && assets.length === 0 ? (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div key={i} className="h-32 animate-pulse rounded-xl border border-border bg-card" />
                  ))}
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {assets.map((asset, i) => {
                    const isPositive = !asset.priceChangePercent.startsWith("-");
                    const Icon = isPositive ? TrendingUp : TrendingDown;

                    return (
                      <motion.button
                        key={asset.symbol}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => openDetail(asset)}
                        className="rounded-xl border border-border bg-card p-5 hover:border-primary/50 transition-colors text-left cursor-pointer"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-primary">
                              <Coins size={20} />
                            </div>
                            <div>
                              <h3 className="font-bold text-foreground">{asset.name}</h3>
                              <p className="text-xs text-muted-foreground">
                                {asset.symbol.replace("USDT", " / USDT")}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`flex items-center gap-1 rounded px-2 py-0.5 text-xs font-bold ${
                              isPositive ? "bg-success/10 text-success" : "bg-destructive/10 text-destructive"
                            }`}
                          >
                            <Icon size={12} />
                            {asset.priceChangePercent}%
                          </div>
                        </div>
                        <div className="mt-4">
                          <div className="text-2xl font-mono font-bold text-foreground">
                            {formatPrice(asset.rawPrice)}
                          </div>
                        </div>
                      </motion.button>
                    );
                  })}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AppLayout>
  );
};

export default CryptoPage;
