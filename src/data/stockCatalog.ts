/**
 * Stock Catalog — Reference data for Indian stocks.
 * This is NOT user data; it's a static catalog used by the Stock Simulator
 * and as a fallback when the Yahoo Finance API is unavailable.
 */

const generatePriceHistory = (base: number, volatility: number) => {
  const prices = [];
  let price = base;
  for (let i = 0; i < 30; i++) {
    price = price + (Math.random() - 0.48) * volatility;
    price = Math.max(price * 0.8, price);
    prices.push({ day: i + 1, price: Math.round(price * 100) / 100 });
  }
  return prices;
};

export const stockCatalog = [
  { symbol: "RELIANCE", name: "Reliance Industries", sector: "Energy", price: 2456.30, change: 1.2, priceHistory: generatePriceHistory(2400, 30) },
  { symbol: "TCS", name: "Tata Consultancy Services", sector: "IT", price: 3890.50, change: -0.8, priceHistory: generatePriceHistory(3850, 40) },
  { symbol: "HDFCBANK", name: "HDFC Bank", sector: "Banking", price: 1654.20, change: 0.5, priceHistory: generatePriceHistory(1620, 20) },
  { symbol: "INFY", name: "Infosys", sector: "IT", price: 1520.75, change: 2.1, priceHistory: generatePriceHistory(1480, 25) },
  { symbol: "ICICIBANK", name: "ICICI Bank", sector: "Banking", price: 1089.40, change: -0.3, priceHistory: generatePriceHistory(1070, 15) },
  { symbol: "HINDUNILVR", name: "Hindustan Unilever", sector: "FMCG", price: 2534.90, change: 0.7, priceHistory: generatePriceHistory(2500, 25) },
  { symbol: "SBIN", name: "State Bank of India", sector: "Banking", price: 625.30, change: 1.5, priceHistory: generatePriceHistory(610, 10) },
  { symbol: "BHARTIARTL", name: "Bharti Airtel", sector: "Telecom", price: 1456.80, change: -1.2, priceHistory: generatePriceHistory(1430, 20) },
  { symbol: "ITC", name: "ITC Limited", sector: "FMCG", price: 445.60, change: 0.9, priceHistory: generatePriceHistory(440, 8) },
  { symbol: "KOTAKBANK", name: "Kotak Mahindra Bank", sector: "Banking", price: 1798.25, change: 0.3, priceHistory: generatePriceHistory(1780, 22) },
  { symbol: "LT", name: "Larsen & Toubro", sector: "Infrastructure", price: 3245.70, change: -0.5, priceHistory: generatePriceHistory(3200, 35) },
  { symbol: "AXISBANK", name: "Axis Bank", sector: "Banking", price: 1123.45, change: 1.8, priceHistory: generatePriceHistory(1100, 15) },
  { symbol: "WIPRO", name: "Wipro", sector: "IT", price: 456.30, change: -1.5, priceHistory: generatePriceHistory(450, 8) },
  { symbol: "BAJFINANCE", name: "Bajaj Finance", sector: "Finance", price: 6890.20, change: 2.3, priceHistory: generatePriceHistory(6800, 70) },
  { symbol: "MARUTI", name: "Maruti Suzuki", sector: "Auto", price: 10234.50, change: 0.4, priceHistory: generatePriceHistory(10100, 100) },
  { symbol: "SUNPHARMA", name: "Sun Pharma", sector: "Pharma", price: 1567.80, change: -0.7, priceHistory: generatePriceHistory(1550, 18) },
  { symbol: "TATAMOTORS", name: "Tata Motors", sector: "Auto", price: 645.90, change: 3.1, priceHistory: generatePriceHistory(630, 12) },
  { symbol: "ASIANPAINT", name: "Asian Paints", sector: "Consumer", price: 2876.40, change: -0.2, priceHistory: generatePriceHistory(2850, 30) },
  { symbol: "TITAN", name: "Titan Company", sector: "Consumer", price: 3456.70, change: 1.4, priceHistory: generatePriceHistory(3400, 35) },
  { symbol: "NESTLEIND", name: "Nestle India", sector: "FMCG", price: 2345.60, change: 0.6, priceHistory: generatePriceHistory(2320, 25) },
];
