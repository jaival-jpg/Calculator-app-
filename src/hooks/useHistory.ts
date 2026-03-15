import { useState, useEffect } from 'react';
import { CalculationHistoryItem } from '../types';

export function useHistory() {
  const [history, setHistory] = useState<CalculationHistoryItem[]>(() => {
    try {
      const stored = localStorage.getItem('calc_history');
      return stored ? JSON.parse(stored) : [];
    } catch (e) {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('calc_history', JSON.stringify(history));
  }, [history]);

  const addHistory = (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => {
    const newItem: CalculationHistoryItem = {
      ...item,
      id: Math.random().toString(36).substring(2, 9),
      timestamp: Date.now(),
    };
    setHistory((prev) => [newItem, ...prev]);
  };

  const clearHistory = () => {
    setHistory([]);
  };

  return { history, addHistory, clearHistory };
}
