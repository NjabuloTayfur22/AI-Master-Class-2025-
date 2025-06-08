import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useCurrency() {
  const { toast } = useToast();

  const savedCurrency = typeof localStorage !== 'undefined' ? localStorage.getItem('currency') : null;
  const savedRate = typeof localStorage !== 'undefined' ? localStorage.getItem('currencyRate') : null;
  const [currency, setCurrency] = useState(savedCurrency || 'ZAR');
  const [rate, setRate] = useState(savedRate ? parseFloat(savedRate) : 1);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchRate() {
      try {
        // Attempt to determine the user's currency via IP geolocation
        const geoRes = await fetch('https://ipapi.co/json/', {
          signal: controller.signal,
        });

        let detectedCurrency = 'ZAR';

        if (geoRes.ok) {
          const geoData = await geoRes.json();
          if (geoData && geoData.currency) {
            detectedCurrency = geoData.currency.toUpperCase();
          }
        } else {
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
          if (euroRegions.includes(region)) {
            detectedCurrency = 'EUR';
          } else {
            detectedCurrency = regionMap[region] || 'USD';
          }
        }

        const res = await fetch(
          `https://api.exchangerate.host/latest?base=ZAR&symbols=${detectedCurrency}`,
          {
            signal: controller.signal,
          }
        );

        if (!res.ok) throw new Error('Failed to fetch rates');

        const data = await res.json();
        if (data.rates && data.rates[detectedCurrency]) {
          setCurrency(detectedCurrency);
          setRate(data.rates[detectedCurrency]);
          try {
            localStorage.setItem('currency', detectedCurrency);
            localStorage.setItem('currencyRate', String(data.rates[detectedCurrency]));
          } catch {
            /* ignore */
          }
        }
      } catch (err) {
        // Fallback to ZAR pricing
        toast({
          title: 'Currency conversion unavailable',
          description: 'Prices shown in ZAR',
          variant: 'destructive',
        });
        setCurrency('ZAR');
        setRate(1);
        try {
          localStorage.setItem('currency', 'ZAR');
          localStorage.setItem('currencyRate', '1');
        } catch {
          /* ignore */
        }
      } finally {
        setLoading(false);
      }
    }

    fetchRate();

    return () => controller.abort();
  }, [toast]);

  async function changeCurrency(newCurrency: string) {
    const controller = new AbortController();
    setLoading(true);
    try {
      const res = await fetch(`https://api.exchangerate.host/latest?base=ZAR&symbols=${newCurrency}`, {
        signal: controller.signal,
      });

      if (!res.ok) throw new Error('Failed to fetch rates');

      const data = await res.json();
      if (data.rates && data.rates[newCurrency]) {
        setCurrency(newCurrency);
        setRate(data.rates[newCurrency]);
        try {
          localStorage.setItem('currency', newCurrency);
          localStorage.setItem('currencyRate', String(data.rates[newCurrency]));
        } catch {
          /* ignore */
        }
      }
    } catch (err) {
      toast({
        title: 'Currency conversion unavailable',
        description: 'Prices shown in ZAR',
        variant: 'destructive',
      });
      setCurrency('ZAR');
      setRate(1);
      try {
        localStorage.setItem('currency', 'ZAR');
        localStorage.setItem('currencyRate', '1');
      } catch {
        /* ignore */
      }
    } finally {
      setLoading(false);
    }
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

