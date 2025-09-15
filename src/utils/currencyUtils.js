// Currency conversion utility
import axios from 'axios';

// Free exchange rate API - you can replace with your preferred service
const EXCHANGE_API_BASE = 'https://api.exchangerate-api.com/v4/latest';

// Cache for exchange rates (valid for 1 hour)
let exchangeRateCache = {
  rates: null,
  timestamp: 0,
  ttl: 3600000 // 1 hour in milliseconds
};

// Supported currencies with their symbols and names
export const SUPPORTED_CURRENCIES = {
  USD: { symbol: '$', name: 'US Dollar', locale: 'en-US' },
  INR: { symbol: '₹', name: 'Indian Rupee', locale: 'en-IN' },
  EUR: { symbol: '€', name: 'Euro', locale: 'de-DE' },
  GBP: { symbol: '£', name: 'British Pound', locale: 'en-GB' },
  CAD: { symbol: 'C$', name: 'Canadian Dollar', locale: 'en-CA' },
  AUD: { symbol: 'A$', name: 'Australian Dollar', locale: 'en-AU' },
  JPY: { symbol: '¥', name: 'Japanese Yen', locale: 'ja-JP' }
};

// Get user's preferred currency from localStorage or default to INR for India
export const getUserCurrency = () => {
  return localStorage.getItem('preferredCurrency') || 'INR';
};

// Set user's preferred currency
export const setUserCurrency = (currency) => {
  localStorage.setItem('preferredCurrency', currency);
};

// Get exchange rates from API
const fetchExchangeRates = async (baseCurrency = 'USD') => {
  try {
    const response = await axios.get(`${EXCHANGE_API_BASE}/${baseCurrency}`);
    return response.data.rates;
  } catch (error) {
    console.error('Failed to fetch exchange rates:', error);
    // Fallback rates (approximate) - update these periodically
    return {
      USD: 1,
      INR: 83.12,
      EUR: 0.85,
      GBP: 0.73,
      CAD: 1.25,
      AUD: 1.35,
      JPY: 110.50
    };
  }
};

// Get current exchange rates with caching
export const getExchangeRates = async () => {
  const now = Date.now();
  
  // Return cached rates if still valid
  if (exchangeRateCache.rates && (now - exchangeRateCache.timestamp) < exchangeRateCache.ttl) {
    return exchangeRateCache.rates;
  }
  
  // Fetch new rates
  const rates = await fetchExchangeRates();
  exchangeRateCache = {
    rates,
    timestamp: now,
    ttl: 3600000
  };
  
  return rates;
};

// Convert price from USD to target currency
export const convertPrice = async (usdPrice, targetCurrency = 'INR') => {
  if (targetCurrency === 'USD') {
    return usdPrice;
  }
  
  try {
    const rates = await getExchangeRates();
    const convertedPrice = usdPrice * rates[targetCurrency];
    return convertedPrice;
  } catch (error) {
    console.error('Price conversion failed:', error);
    return usdPrice; // Return original price if conversion fails
  }
};

// Format price according to currency and locale
export const formatPrice = (price, currency = 'INR') => {
  const currencyInfo = SUPPORTED_CURRENCIES[currency];
  
  if (!currencyInfo) {
    return `${price.toFixed(2)}`;
  }
  
  try {
    return new Intl.NumberFormat(currencyInfo.locale, {
      style: 'currency',
      currency: currency,
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }).format(price);
  } catch (error) {
    // Fallback formatting
    return `${currencyInfo.symbol}${price.toFixed(2)}`;
  }
};

// Convert and format price in one function
export const convertAndFormatPrice = async (usdPrice, targetCurrency = 'INR') => {
  const convertedPrice = await convertPrice(usdPrice, targetCurrency);
  return formatPrice(convertedPrice, targetCurrency);
};

// Get local pricing context for India
export const getLocalPricingContext = (priceINR) => {
  // Provide context for Indian users about price ranges
  if (priceINR <= 200) return 'Budget-friendly';
  if (priceINR <= 500) return 'Moderate';
  if (priceINR <= 1000) return 'Premium';
  return 'Luxury';
};