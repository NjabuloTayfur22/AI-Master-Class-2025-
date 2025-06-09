import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Base pricing currency
const BASE_CURRENCY = 'ZAR';

// Currencies the site supports
const SUPPORTED_CURRENCIES = [
  'ZAR',
  'USD',
  'EUR',
  'GBP',
  'INR',
  'AUD',
  'CAD',
  'JPY',
];

// Fallback rates used when live exchange rate APIs are unavailable.
// These represent the value of one ZAR in the target currency.
const FALLBACK_RATES: Record<string, number> = {
  ZAR: 1,
  USD: 0.053,
  EUR: 0.049,
  GBP: 0.042,
  INR: 4.4,
  AUD: 0.08,
  CAD: 0.07,
  JPY: 8.5,
};

export function useCurrency() {
  const { toast } = useToast();

  // Safe localStorage access
  const getFromStorage = (key: string): string | null => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return null;
    }
    try {
      return localStorage.getItem(key);
    } catch {
      return null;
    }
  };

  const setToStorage = (key: string, value: string): void => {
    if (typeof window === 'undefined' || typeof localStorage === 'undefined') {
      return;
    }
    try {
      localStorage.setItem(key, value);
    } catch {
      // Ignore storage errors (private browsing, quota exceeded, etc.)
    }
  };

  // Initialize state
  const savedCurrency = getFromStorage('currency');
  const savedRatesStr = getFromStorage('currencyRates');
  const savedRates: Record<string, number> | null = savedRatesStr 
    ? (() => {
        try {
          return JSON.parse(savedRatesStr);
        } catch {
          return null;
        }
      })()
    : null;

  const [currency, setCurrency] = useState(savedCurrency || BASE_CURRENCY);
  const [rates, setRates] = useState<Record<string, number>>(savedRates || FALLBACK_RATES);
  const [loading, setLoading] = useState(true);

  // Detect user's currency based on geolocation and locale
  async function detectCurrency(): Promise<string> {
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const data = await res.json();
        if (data?.currency && SUPPORTED_CURRENCIES.includes(data.currency.toUpperCase())) {
          return data.currency.toUpperCase();
        }
      }
    } catch {
      // Ignore network errors and fall back to locale detection
    }

    // Fallback to locale-based detection
    const locale = navigator.language || 'en-ZA';
    const region = locale.split('-')[1]?.toUpperCase() || 'ZA';
    
    const regionMap: Record<string, string> = {
      ZA: 'ZAR',
      US: 'USD',
      GB: 'GBP',
      IN: 'INR',
      AU: 'AUD',
      CA: 'CAD',
      JP: 'JPY',
    };
    
    const euroRegions = [
      'DE', 'FR', 'ES', 'IT', 'PT', 'NL', 'BE', 'AT', 
      'IE', 'FI', 'GR', 'CY', 'LU', 'LV', 'LT', 'MT', 
      'SI', 'SK', 'EE'
    ];
    
    if (euroRegions.includes(region)) {
      return 'EUR';
    }
    
    return regionMap[region] || 'USD';
  }

  // Fetch exchange rates from API
  async function fetchRates(signal?: AbortSignal): Promise<Record<string, number> | null> {
    try {
      const symbols = SUPPORTED_CURRENCIES.join(',');
      const res = await fetch(
        `https://api.exchangerate.host/latest?base=${BASE_CURRENCY}&symbols=${symbols}`, 
        { signal }
      );
      
      if (!res.ok) throw new Error('Bad response');
      
      const data = await res.json();
      return data?.rates as Record<string, number>;
    } catch {
      return null;
    }
  }

  // Initialize currency on component mount
  useEffect(() => {
    const controller = new AbortController();

    async function init() {
      try {
        // Determine target currency
        const targetCurrency = savedCurrency || await detectCurrency();
        
        // Fetch latest rates
        const fetchedRates = await fetchRates(controller.signal);
        
        if (fetchedRates) {
          setRates(fetchedRates);
          setToStorage('currencyRates', JSON.stringify(fetchedRates));
        }

        // Check if we have a rate for the target currency
        const currentRates = fetchedRates || rates;
        let rateValue = currentRates[targetCurrency];

        if (rateValue == null) {
          // Try fallback rates
          const fallbackRate = FALLBACK_RATES[targetCurrency];
          if (fallbackRate) {
            toast({
              title: 'Using offline rates',
              description: `Prices shown in ${targetCurrency}`,
            });
            setRates(prev => ({ ...prev, [targetCurrency]: fallbackRate }));
            rateValue = fallbackRate;
          } else {
            // Currency not supported, fall back to base currency
            toast({
              title: 'Currency conversion unavailable',
              description: `Prices shown in ${BASE_CURRENCY}`,
              variant: 'destructive',
            });
            setCurrency(BASE_CURRENCY);
            setLoading(false);
            return;
          }
        }

        // Set the currency
        setCurrency(targetCurrency);
        setToStorage('currency', targetCurrency);
        setLoading(false);
      } catch (error) {
        // If everything fails, use base currency
        setCurrency(BASE_CURRENCY);
        setLoading(false);
      }
    }

    init();

    return () => controller.abort();
  }, []);

  // Change currency function
  async function changeCurrency(newCurrency: string): Promise<void> {
    const controller = new AbortController();
    
    setCurrency(newCurrency);
    setToStorage('currency', newCurrency);
    setLoading(true);

    try {
      // Check if we already have the rate
      let rateValue = rates[newCurrency];
      
      if (rateValue == null) {
        // Fetch new rates
        const fetchedRates = await fetchRates(controller.signal);
        
        if (fetchedRates) {
          const updatedRates = { ...rates, ...fetchedRates };
          setRates(updatedRates);
          setToStorage('currencyRates', JSON.stringify(updatedRates));
          rateValue = fetchedRates[newCurrency];
        }
      }

      if (rateValue == null) {
        // Try fallback rates
        const fallbackRate = FALLBACK_RATES[newCurrency];
        if (fallbackRate) {
          toast({
            title: 'Using offline rates',
            description: `Prices shown in ${newCurrency}`,
          });
          rateValue = fallbackRate;
        } else {
          // Currency not supported, revert to base currency
          toast({
            title: 'Currency conversion unavailable',
            description: `Prices shown in ${BASE_CURRENCY}`,
            variant: 'destructive',
          });
          setCurrency(BASE_CURRENCY);
          setLoading(false);
          return;
        }
      }

      // Update rates with the new currency rate
      const updatedRates = { ...rates, [newCurrency]: rateValue };
      setRates(updatedRates);
      setToStorage('currencyRates', JSON.stringify(updatedRates));
      setLoading(false);
    } catch (error) {
      // Handle errors gracefully
      const fallbackRate = FALLBACK_RATES[newCurrency];
      if (fallbackRate) {
        toast({
          title: 'Using offline rates',
          description: `Prices shown in ${newCurrency}`,
        });
        setRates(prev => ({ ...prev, [newCurrency]: fallbackRate }));
      } else {
        toast({
          title: 'Currency conversion unavailable',
          description: `Prices shown in ${BASE_CURRENCY}`,
          variant: 'destructive',
        });
        setCurrency(BASE_CURRENCY);
      }
      setLoading(false);
    }
  }

  // Convert price from base currency to selected currency
  const convert = (value: number): number => {
    const rate = rates[currency] ?? 1;
    return value * rate;
  };

  // Get currency symbol
  const getSymbol = (currencyCode: string): string => {
    try {
      return new Intl.NumberFormat(undefined, {
        style: 'currency',
        currency: currencyCode,
        currencyDisplay: 'narrowSymbol',
      })
        .formatToParts(0)
        .find(part => part.type === 'currency')?.value || currencyCode;
    } catch {
      return currencyCode;
    }
  };

  return {
    currency,
    rates,
    loading,
    convert,
    getSymbol,
    changeCurrency,
    supportedCurrencies: SUPPORTED_CURRENCIES,
  };
}