// Fetch and cache currencies
export const fetchCurrencies = async () => {
  const cacheKey = 'currencies_cache';
  let cachedCurrencies = localStorage.getItem(cacheKey);

  if (cachedCurrencies) {
    return Object.keys(JSON.parse(cachedCurrencies));
  }

  try {
    const response = await fetch('https://api.frankfurter.dev/v1/currencies');
    const data = await response.json();
    localStorage.setItem(cacheKey, JSON.stringify(data)); // Cache the data
    return Object.keys(data);
  } catch (error) {
    throw new Error(`Failed to fetch currencies: ${error.message}`);
  }
};