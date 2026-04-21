/**
 * Twelve Data API Service
 * Fetches live forex data and historical time series from public Twelve Data API.
 */

const TWELVE_DATA_BASE_URL = "https://api.twelvedata.com";
const API_KEY = import.meta.env.VITE_TWELVEDATA_API_KEY || "03de116494574f5fb74d5d044d57a0f2";

export interface ForexQuote {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volume: number;
  previousClose: number;
}

export interface ForexKline {
  timestamp: number;
  datetime: string;
  open: number;
  high: number;
  low: number;
  close: number;
}

export type ForexTimeRange = '1D' | '5D' | '1M' | '6M' | '1Y';

export const FOREX_PAIRS = [
  { symbol: "EUR/USD", name: "Euro / US Dollar" },
  { symbol: "GBP/USD", name: "British Pound / US Dollar" },
  { symbol: "USD/JPY", name: "US Dollar / Japanese Yen" },
  { symbol: "USD/CHF", name: "US Dollar / Swiss Franc" },
  { symbol: "AUD/USD", name: "Australian Dollar / US Dollar" },
  { symbol: "USD/CAD", name: "US Dollar / Canadian Dollar" },
  { symbol: "NZD/USD", name: "New Zealand Dollar / US Dollar" },
  { symbol: "EUR/GBP", name: "Euro / British Pound" },
  { symbol: "EUR/JPY", name: "Euro / Japanese Yen" },
  { symbol: "GBP/JPY", name: "British Pound / Japanese Yen" }
];

const quoteCache: Record<string, { data: ForexQuote, timestamp: number }> = {};
const klineCache: Record<string, { data: ForexKline[], timestamp: number }> = {};
const CACHE_EXPIRY = 60000; // 1 minute

export const fetchForexQuote = async (symbol: string): Promise<ForexQuote | null> => {
  try {
    const cacheKey = `quote_${symbol}`;
    if (quoteCache[cacheKey] && Date.now() - quoteCache[cacheKey].timestamp < CACHE_EXPIRY) {
      return quoteCache[cacheKey].data;
    }

    const response = await fetch(`${TWELVE_DATA_BASE_URL}/quote?symbol=${symbol}&apikey=${API_KEY}`);
    if (!response.ok) throw new Error("Twelve Data API quote error");

    const data = await response.json();
    if (data.status === "error") throw new Error(data.message);

    const quote: ForexQuote = {
      symbol: data.symbol,
      name: data.name,
      price: parseFloat(data.close || data.price || "0"),
      change: parseFloat(data.change || "0"),
      changePercent: parseFloat(data.percent_change || "0"),
      open: parseFloat(data.open || "0"),
      high: parseFloat(data.high || "0"),
      low: parseFloat(data.low || "0"),
      volume: parseFloat(data.volume || "0"),
      previousClose: parseFloat(data.previous_close || "0"),
    };

    quoteCache[cacheKey] = { data: quote, timestamp: Date.now() };
    return quote;
  } catch (error) {
    console.error(`Failed to fetch forex quote for ${symbol}:`, error);
    return null;
  }
};

const mapTimeRangeToInterval = (timeRange: ForexTimeRange): { interval: string, outputsize: number } => {
  switch (timeRange) {
    case '1D': return { interval: '5min', outputsize: 288 };
    case '5D': return { interval: '15min', outputsize: 480 };
    case '1M': return { interval: '1h', outputsize: 720 }; // roughly a month of working hours
    case '6M': return { interval: '1day', outputsize: 130 };
    case '1Y': return { interval: '1day', outputsize: 260 };
    default: return { interval: '1h', outputsize: 50 };
  }
};

export const fetchForexHistorical = async (
  symbol: string,
  timeRange: ForexTimeRange
): Promise<ForexKline[]> => {
  try {
    const cacheKey = `klines_${symbol}_${timeRange}`;
    if (klineCache[cacheKey] && Date.now() - klineCache[cacheKey].timestamp < CACHE_EXPIRY) {
      return klineCache[cacheKey].data;
    }

    const { interval, outputsize } = mapTimeRangeToInterval(timeRange);
    const response = await fetch(`${TWELVE_DATA_BASE_URL}/time_series?symbol=${symbol}&interval=${interval}&outputsize=${outputsize}&apikey=${API_KEY}`);
    
    if (!response.ok) throw new Error("Kline fetch failed");

    const data = await response.json();
    if (data.status === "error") throw new Error(data.message);

    if (!data.values || !Array.isArray(data.values)) return [];

    const klines: ForexKline[] = data.values.map((k: any) => {
      // Twelve data datetime format: "2023-11-20 12:45:00"
      const dateStr = k.datetime.replace(' ', 'T') + 'Z'; 
      const timestamp = new Date(dateStr).getTime();
      return {
        timestamp,
        datetime: k.datetime,
        open: parseFloat(k.open),
        high: parseFloat(k.high),
        low: parseFloat(k.low),
        close: parseFloat(k.close),
      };
    }).reverse(); // API returns descending, chronological order should be ascending for charts

    klineCache[cacheKey] = { data: klines, timestamp: Date.now() };
    return klines;
  } catch (error) {
    console.error(`Failed to fetch historical forex for ${symbol}:`, error);
    return [];
  }
};
