import { useCurrency } from "@/hooks/useCurrency";

export default function CurrencySwitcher() {
  const currencyCtx = useCurrency();
  const currency = currencyCtx?.currency || 'ZAR';
  const changeCurrency = currencyCtx?.changeCurrency;

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    if (changeCurrency) {
      changeCurrency(e.target.value);
    }
  };

  return (
    <select
      value={currency}
      onChange={handleChange}
      className="bg-black/40 border-yellow-400 text-yellow-300 text-sm px-2 py-1 rounded focus:outline-none focus:ring-2 focus:ring-yellow-400"
    >
      <option value="ZAR">ZAR</option>
      <option value="USD">USD</option>
      <option value="EUR">EUR</option>
      <option value="GBP">GBP</option>
    </select>
  );
}
