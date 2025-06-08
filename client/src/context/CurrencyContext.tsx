import { createContext, useContext, ReactNode } from 'react';
import { useCurrency } from '@/hooks/useCurrency';

const CurrencyContext = createContext<ReturnType<typeof useCurrency> | null>(null);

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const value = useCurrency();
  return <CurrencyContext.Provider value={value}>{children}</CurrencyContext.Provider>;
}

export function useCurrencyContext() {
  return useContext(CurrencyContext);
}

