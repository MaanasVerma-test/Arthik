/**
 * Binance API Service
 * Fetches live cryptocurrency data and historical klines from public Binance API.
 */

const BINANCE_24HR_URL = "https://api.binance.com/api/v3/ticker/24hr";
const BINANCE_KLINES_URL = "https://api.binance.com/api/v3/klines";

export interface CryptoAsset {
  symbol: string;
  rawPrice: number;
  priceChangePercent: string;
  name: string;
  high24h: number;
  low24h: number;
  volume: string;
}

export interface CryptoKline {
  timestamp: number;
  open: number;
  high: number;
  low: number;
  close: number;
}

export type CryptoTimeRange = '1H' | '4H' | '1D' | '7D' | '1M' | '1Y';

const symbolToName: Record<string, string> = {
  BTCUSDT: "Bitcoin",
  ETHUSDT: "Ethereum",
  BNBUSDT: "Binance Coin",
  SOLUSDT: "Solana",
  ADAUSDT: "Cardano",
  XRPUSDT: "XRP",
  DOTUSDT: "Polkadot",
  DOGEUSDT: "Dogecoin",
  MATICUSDT: "Polygon",
};

export const CRYPTO_SYMBOLS = Object.keys(symbolToName);

const CACHE_KEY = "crypto_prices_cache";
const CACHE_EXPIRY = 30000; // 30 seconds

// Approximate USD → INR rate (fetched once per session)
let cachedInrRate: number | null = null;

export const getUsdToInrRate = async (): Promise<number> => {
  if (cachedInrRate) return cachedInrRate;
  try {
    const res = await fetch("https://api.binance.com/api/v3/ticker/price?symbol=USDTINR");
    if (!res.ok) throw new Error();
    const data = await res.json();
    cachedInrRate = parseFloat(data.price);
    return cachedInrRate;
  } catch {
    cachedInrRate = 85.5; // fallback rate
    return cachedInrRate;
  }
};

export const fetchCryptoPrices = async (): Promise<CryptoAsset[]> => {
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { data, timestamp } = JSON.parse(cached);
      if (Date.now() - timestamp < CACHE_EXPIRY) {
        return data;
      }
    }

    const response = await fetch(BINANCE_24HR_URL);
    if (!response.ok) throw new Error("Binance API error");

    const data = await response.json();

    const filtered: CryptoAsset[] = data
      .filter((item: any) => symbolToName[item.symbol])
      .map((item: any) => ({
        symbol: item.symbol,
        rawPrice: parseFloat(item.lastPrice),
        priceChangePercent: parseFloat(item.priceChangePercent).toFixed(2),
        name: symbolToName[item.symbol],
        high24h: parseFloat(item.highPrice),
        low24h: parseFloat(item.lowPrice),
        volume: parseFloat(item.quoteVolume).toLocaleString(undefined, { maximumFractionDigits: 0 }),
      }));

    localStorage.setItem(CACHE_KEY, JSON.stringify({ data: filtered, timestamp: Date.now() }));
    return filtered;
  } catch (error) {
    console.error("Failed to fetch crypto prices:", error);
    return [];
  }
};

const timeRangeToKlineParams: Record<CryptoTimeRange, { interval: string; limit: number }> = {
  '1H': { interval: '1m', limit: 60 },
  '4H': { interval: '5m', limit: 48 },
  '1D': { interval: '15m', limit: 96 },
  '7D': { interval: '1h', limit: 168 },
  '1M': { interval: '4h', limit: 180 },
  '1Y': { interval: '1d', limit: 365 },
};

export const fetchCryptoKlines = async (
  symbol: string,
  timeRange: CryptoTimeRange
): Promise<CryptoKline[]> => {
  try {
    const params = timeRangeToKlineParams[timeRange];
    const url = `${BINANCE_KLINES_URL}?symbol=${symbol}&interval=${params.interval}&limit=${params.limit}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Kline fetch failed");

    const data: any[][] = await res.json();

    return data.map((k) => ({
      timestamp: k[0] as number,
      open: parseFloat(k[1]),
      high: parseFloat(k[2]),
      low: parseFloat(k[3]),
      close: parseFloat(k[4]),
    }));
  } catch (error) {
    console.error("Failed to fetch klines:", error);
    return [];
  }
};
