import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

// Base pricing currency
const BASE_CURRENCY = 'ZAR';

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
  const savedRateStr = typeof localStorage !== 'undefined' ? localStorage.getItem('currencyRate') : null;
  const parsedRate = savedRateStr ? parseFloat(savedRateStr) : NaN;
  const [currency, setCurrency] = useState(savedCurrency || BASE_CURRENCY);
  const [rate, setRate] = useState(!isNaN(parsedRate) ? parsedRate : 1);
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

  async function fetchRate(target: string, signal?: AbortSignal) {
    try {
      const res = await fetch(`https://api.exchangerate.host/latest?base=${BASE_CURRENCY}&symbols=${target}`,{ signal });
      if (!res.ok) throw new Error('bad response');
      const data = await res.json();
      const value = data?.rates?.[target];
      return typeof value === 'number' ? value : null;
    } catch {
      return null;
    }
  }

  useEffect(() => {
    const controller = new AbortController();

    async function init() {
      const target = savedCurrency || await detectCurrency();
      let rateValue = await fetchRate(target, controller.signal);

      if (rateValue == null) {
        const fallback = FALLBACK_RATES[target];
        if (fallback) {
          toast({ title: 'Using offline rates', description: `Prices shown in ${target}` });
          rateValue = fallback;
        } else {
          toast({ title: 'Currency conversion unavailable', description: `Prices shown in ${BASE_CURRENCY}`, variant: 'destructive' });
          setCurrency(BASE_CURRENCY);
          setRate(1);
          setLoading(false);
          try {
            localStorage.setItem('currency', BASE_CURRENCY);
            localStorage.setItem('currencyRate', '1');
          } catch {}
          return;
        }
      }

      setCurrency(target);
      setRate(rateValue);
      try {
        localStorage.setItem('currency', target);
        localStorage.setItem('currencyRate', String(rateValue));
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
    let rateValue = await fetchRate(newCurrency, controller.signal);

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
        rateValue = 1;
      }
    }

    setRate(rateValue);
    try {
      localStorage.setItem('currency', newCurrency);
      localStorage.setItem('currencyRate', String(rateValue));
    } catch {}
    setLoading(false);
    return () => controller.abort();
  }

  const convert = (value: number) => value * rate;
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

