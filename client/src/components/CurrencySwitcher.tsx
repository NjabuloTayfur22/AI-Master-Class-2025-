import { useCurrencyContext } from "@/context/CurrencyContext";

export default function CurrencySwitcher() {
  const currencyCtx = useCurrencyContext();
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
      <option value="INR">INR</option>
      <option value="AUD">AUD</option>
      <option value="CAD">CAD</option>
      <option value="JPY">JPY</option>
   </select>
  );
}
