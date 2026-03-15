import { useState, useEffect } from 'react';
import { Button } from './Button';
import { ArrowDownUp, Loader2 } from 'lucide-react';

const CURRENCIES = [
  { code: 'USD', name: 'US Dollar', flag: '🇺🇸' },
  { code: 'EUR', name: 'Euro', flag: '🇪🇺' },
  { code: 'GBP', name: 'British Pound', flag: '🇬🇧' },
  { code: 'INR', name: 'Indian Rupee', flag: '🇮🇳' },
  { code: 'JPY', name: 'Japanese Yen', flag: '🇯🇵' },
  { code: 'AUD', name: 'Australian Dollar', flag: '🇦🇺' },
  { code: 'CAD', name: 'Canadian Dollar', flag: '🇨🇦' },
  { code: 'CHF', name: 'Swiss Franc', flag: '🇨🇭' },
  { code: 'CNY', name: 'Chinese Yuan', flag: '🇨🇳' },
  { code: 'NZD', name: 'New Zealand Dollar', flag: '🇳🇿' },
];

export function CurrencyConverter() {
  const [amount, setAmount] = useState('1');
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('INR');
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleConvert = async () => {
    if (!amount || isNaN(Number(amount))) {
      setError('Please enter a valid amount');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`https://open.er-api.com/v6/latest/${fromCurrency}`);
      const data = await response.json();
      
      if (data.result === 'success') {
        const rate = data.rates[toCurrency];
        const converted = (Number(amount) * rate).toFixed(2);
        setResult(converted);
      } else {
        setError('Failed to fetch exchange rates');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white dark:bg-black p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Currency Converter</h2>

      <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800">
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-500 dark:text-zinc-400 mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-3xl py-4 px-6 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all font-medium"
          />
        </div>

        <div className="relative flex flex-col gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">From</label>
            <div className="relative">
              <select
                value={fromCurrency}
                onChange={(e) => setFromCurrency(e.target.value)}
                className="w-full appearance-none bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-lg py-4 px-6 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>
          </div>

          <button
            onClick={swapCurrencies}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-orange-600 transition-colors z-10 border-4 border-white dark:border-zinc-900"
          >
            <ArrowDownUp size={20} />
          </button>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400">To</label>
            <div className="relative">
              <select
                value={toCurrency}
                onChange={(e) => setToCurrency(e.target.value)}
                className="w-full appearance-none bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-lg py-4 px-6 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all cursor-pointer"
              >
                {CURRENCIES.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.flag} {c.name} ({c.code})
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <Button variant="operator" onClick={handleConvert} disabled={loading} className="w-full py-4 text-xl">
          {loading ? <Loader2 className="animate-spin" /> : 'Convert'}
        </Button>
      </div>

      {result && (
        <div className="mt-8 bg-gradient-to-br from-orange-500 to-red-500 p-8 rounded-3xl text-white text-center shadow-lg shadow-orange-500/20">
          <h3 className="text-lg font-medium opacity-90 mb-2">Converted Amount</h3>
          <div className="flex items-end justify-center gap-2">
            <span className="text-5xl font-bold">{result}</span>
            <span className="text-2xl opacity-80 mb-1">{toCurrency}</span>
          </div>
          <div className="mt-4 text-sm opacity-80">
            1 {fromCurrency} = {(Number(result) / Number(amount)).toFixed(4)} {toCurrency}
          </div>
        </div>
      )}
    </div>
  );
}
