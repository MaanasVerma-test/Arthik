/**
 * Currency Service
 * Centralized service for exchange rates (USD to INR).
 */

const BINANCE_PRICE_URL = "https://api.binance.com/api/v3/ticker/price?symbol=USDTINR";
const CACHE_KEY = "usd_to_inr_rate_cache";
const CACHE_EXPIRY = 3600000; // 1 hour

let memoryCachedRate: number | null = null;
let lastFetchTime: number = 0;

export const FALLBACK_INR_RATE = 85.5;

export const getUsdToInrRate = async (): Promise<number> => {
  const now = Date.now();

  // 1. Check memory cache
  if (memoryCachedRate && (now - lastFetchTime < CACHE_EXPIRY)) {
    return memoryCachedRate;
  }

  // 2. Check localStorage cache
  try {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      const { rate, timestamp } = JSON.parse(cached);
      if (now - timestamp < CACHE_EXPIRY) {
        memoryCachedRate = rate;
        lastFetchTime = timestamp;
        return rate;
      }
    }
  } catch (e) {
    console.warn("Failed to read from localStorage cache", e);
  }

  // 3. Fetch from API
  try {
    const response = await fetch(BINANCE_PRICE_URL);
    if (!response.ok) throw new Error("Failed to fetch exchange rate");

    const data = await response.json();
    const rate = parseFloat(data.price);

    if (isNaN(rate)) throw new Error("Invalid rate received");

    // Update caches
    memoryCachedRate = rate;
    lastFetchTime = now;
    try {
      localStorage.setItem(CACHE_KEY, JSON.stringify({ rate, timestamp: now }));
    } catch (e) {
      // ignore localStorage errors
    }

    return rate;
  } catch (error) {
    console.error("Error fetching USD/INR rate:", error);
    // Use fallback if cache also unavailable
    return memoryCachedRate || FALLBACK_INR_RATE;
  }
};
