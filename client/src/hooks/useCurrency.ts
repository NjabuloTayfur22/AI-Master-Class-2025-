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

  const savedCurrency = typeof localStorage !== 'undefined' ? localStorage.getItem('currency') : null;
  const savedRatesStr = typeof localStorage !== 'undefined' ? localStorage.getItem('currencyRates') : null;
  const savedRates: Record<string, number> | null = savedRatesStr ? JSON.parse(savedRatesStr) : null;
  const [currency, setCurrency] = useState(savedCurrency || BASE_CURRENCY);
  const [rates, setRates] = useState<Record<string, number>>(savedRates || FALLBACK_RATES);
  const [loading, setLoading] = useState(true);

  async function detectCurrency() {
    try {
      const res = await fetch('https://ipapi.co/json/');
      if (res.ok) {
        const data = await res.json();
        if (data?.currency) {
          return data.currency.toUpperCase();
        }
      }
    } catch {
      // ignore network errors
    }

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
    const euroRegions = ['DE','FR','ES','IT','PT','NL','BE','AT','IE','FI','GR','CY','LU','LV','LT','MT','SI','SK','EE'];
    return euroRegions.includes(region) ? 'EUR' : (regionMap[region] || 'USD');
  }

  async function fetchRates(signal?: AbortSignal) {
    try {
      const symbols = SUPPORTED_CURRENCIES.join(',');
      const res = await fetch(`https://api.exchangerate.host/latest?base=${BASE_CURRENCY}&symbols=${symbols}`, { signal });
      if (!res.ok) throw new Error('bad response');
      const data = await res.json();
      return data?.rates as Record<string, number>;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    async function init() {
      const target = savedCurrency || await detectCurrency();
      let fetchedRates = await fetchRates(controller.signal);
      if (fetchedRates) {
        setRates(fetchedRates);
        try {
          localStorage.setItem('currencyRates', JSON.stringify(fetchedRates));
        } catch {}
      }
      let rateValue = fetchedRates?.[target];

      if (rateValue == null) {
        const fallback = FALLBACK_RATES[target];
        if (fallback) {
          toast({ title: 'Using offline rates', description: `Prices shown in ${target}` });
          setRates(prev => ({ ...prev, [target]: fallback }));
          rateValue = fallback;
        } else {
          toast({ title: 'Currency conversion unavailable', description: `Prices shown in ${BASE_CURRENCY}`, variant: 'destructive' });
          setCurrency(BASE_CURRENCY);
          setLoading(false);
          return;
        }
      }

      setCurrency(target);
      try {
        localStorage.setItem('currency', target);
      } catch {}
      setLoading(false);
    }

    init();

    return () => controller.abort();
  }, []);

  async function changeCurrency(newCurrency: string) {
    const controller = new AbortController();
    setCurrency(newCurrency);
    try {
      localStorage.setItem('currency', newCurrency);
    } catch {}

    setLoading(true);
    let rateValue = rates[newCurrency];
    if (rateValue == null) {
      const fetched = await fetchRates(controller.signal);
      if (fetched) {
        setRates(prev => ({ ...prev, ...fetched }));
        try {
          localStorage.setItem('currencyRates', JSON.stringify({ ...rates, ...fetched }));
        } catch {}
        rateValue = fetched[newCurrency];
      }
    }
    if (rateValue == null) {
      const fallback = FALLBACK_RATES[newCurrency];
      if (fallback) {
        toast({ title: 'Using offline rates', description: `Prices shown in ${newCurrency}` });
        rateValue = fallback;
      } else {
        toast({
          title: 'Currency conversion unavailable',
          description: `Prices shown in ${BASE_CURRENCY}`,
          variant: 'destructive',
        });
        setCurrency(BASE_CURRENCY);
        setLoading(false);
        return () => controller.abort();
      }
    }

    setRates(prev => ({ ...prev, [newCurrency]: rateValue }));
    try {
      localStorage.setItem('currency', newCurrency);
      localStorage.setItem('currencyRates', JSON.stringify({ ...rates, [newCurrency]: rateValue }));
    } catch {}
    setLoading(false);
    return () => controller.abort();
  }

  const convert = (value: number) => value * (rates[currency] ?? 1);
  const getSymbol = (c: string) =>
    new Intl.NumberFormat(undefined, {
      style: 'currency',
      currency: c,
      currencyDisplay: 'narrowSymbol',
    })
      .formatToParts(0)
      .find(part => part.type === 'currency')?.value || c;

  return { currency, convert, getSymbol, loading, changeCurrency };
}

