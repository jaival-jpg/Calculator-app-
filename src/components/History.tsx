import { CalculationHistoryItem } from '../types';
import { Trash2 } from 'lucide-react';

type Props = {
  history: CalculationHistoryItem[];
  onClear: () => void;
};

export function History({ history, onClear }: Props) {
  return (
    <div className="flex flex-col h-full bg-white dark:bg-black p-4 sm:p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">History</h2>
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-100 text-red-600 hover:bg-red-200 dark:bg-red-500/10 dark:text-red-500 dark:hover:bg-red-500/20 transition-colors"
          >
            <Trash2 size={18} />
            Clear
          </button>
        )}
      </div>

      {history.length === 0 ? (
        <div className="flex-1 flex items-center justify-center text-zinc-500 dark:text-zinc-400">
          No history yet
        </div>
      ) : (
        <div className="flex-1 overflow-y-auto space-y-4 pr-2 scrollbar-hide">
          {history.map((item) => (
            <div
              key={item.id}
              className="bg-zinc-50 dark:bg-zinc-900 p-4 rounded-2xl shadow-sm border border-zinc-100 dark:border-zinc-800"
            >
              <div className="text-sm text-zinc-500 dark:text-zinc-400 mb-2 flex justify-between">
                <span>{new Date(item.timestamp).toLocaleString()}</span>
                <span className="capitalize">{item.type}</span>
              </div>
              <div className="text-xl text-zinc-600 dark:text-zinc-300 font-light break-all">
                {item.expression}
              </div>
              <div className="text-3xl font-medium text-zinc-900 dark:text-white mt-1 break-all">
                = {item.result}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
