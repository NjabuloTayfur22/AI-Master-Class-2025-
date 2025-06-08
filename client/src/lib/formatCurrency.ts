export function formatCurrency(amount: number, currency: string = 'ZAR', locale: string | undefined = undefined) {
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(amount);
}
export default formatCurrency;
