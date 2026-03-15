import { useState } from 'react';
import { Button } from './Button';

export function AgeCalculator() {
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [result, setResult] = useState<{ years: number; months: number; days: number } | null>(null);
  const [error, setError] = useState('');

  const handleCalculate = () => {
    setError('');
    const d = parseInt(day);
    const m = parseInt(month);
    const y = parseInt(year);

    if (!d || !m || !y || d < 1 || d > 31 || m < 1 || m > 12 || y < 1900 || y > new Date().getFullYear()) {
      setError('Please enter a valid date');
      return;
    }

    const birthDate = new Date(y, m - 1, d);
    const today = new Date();

    if (birthDate > today) {
      setError('Date of birth cannot be in the future');
      return;
    }

    let years = today.getFullYear() - birthDate.getFullYear();
    let months = today.getMonth() - birthDate.getMonth();
    let days = today.getDate() - birthDate.getDate();

    if (days < 0) {
      months--;
      const lastMonth = new Date(today.getFullYear(), today.getMonth(), 0);
      days += lastMonth.getDate();
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    setResult({ years, months, days });
  };

  const handleReset = () => {
    setDay('');
    setMonth('');
    setYear('');
    setResult(null);
    setError('');
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto bg-white dark:bg-black p-4 sm:p-6">
      <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Age Calculator</h2>

      <div className="bg-zinc-50 dark:bg-zinc-900 p-6 rounded-3xl shadow-sm border border-zinc-100 dark:border-zinc-800">
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Day</label>
            <input
              type="number"
              value={day}
              onChange={(e) => setDay(e.target.value)}
              placeholder="DD"
              className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-center text-2xl py-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Month</label>
            <input
              type="number"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              placeholder="MM"
              className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-center text-2xl py-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium text-zinc-500 dark:text-zinc-400 text-center">Year</label>
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="YYYY"
              className="w-full bg-zinc-100 dark:bg-zinc-800 text-zinc-900 dark:text-white text-center text-2xl py-4 rounded-2xl outline-none focus:ring-2 focus:ring-orange-500 transition-all"
            />
          </div>
        </div>

        {error && <div className="text-red-500 text-center mb-4">{error}</div>}

        <div className="flex gap-4">
          <Button variant="action" onClick={handleReset} className="flex-1 py-4 text-lg">
            Reset
          </Button>
          <Button variant="operator" onClick={handleCalculate} className="flex-1 py-4 text-lg">
            Calculate
          </Button>
        </div>
      </div>

      {result && (
        <div className="mt-8 bg-gradient-to-br from-orange-500 to-red-500 p-8 rounded-3xl text-white text-center shadow-lg shadow-orange-500/20">
          <h3 className="text-lg font-medium opacity-90 mb-6">Age Result</h3>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold mb-1">{result.years}</span>
              <span className="text-sm opacity-80">Years</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold mb-1">{result.months}</span>
              <span className="text-sm opacity-80">Months</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-4xl font-bold mb-1">{result.days}</span>
              <span className="text-sm opacity-80">Days</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
