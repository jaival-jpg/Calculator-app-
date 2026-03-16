import { useState } from 'react';
import { Button } from './Button';
import { AdBanner } from './AdBanner';
import { safeEvaluate } from '../utils/math';
import { CalculationHistoryItem } from '../types';

type Props = {
  onSaveHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
};

export function ScientificCalculator({ onSaveHistory }: Props) {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (val: string) => {
    if (result && !['+', '−', '×', '÷', '^'].includes(val)) {
      setExpression(val);
      setResult('');
    } else if (result && ['+', '−', '×', '÷', '^'].includes(val)) {
      setExpression(result + val);
      setResult('');
    } else {
      setExpression((prev) => prev + val);
    }
  };

  const handleClear = () => {
    setExpression('');
    setResult('');
  };

  const handleDelete = () => {
    setExpression((prev) => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    if (!expression) return;
    const res = safeEvaluate(expression);
    setResult(res);
    if (res !== 'Error') {
      onSaveHistory({ expression, result: res, type: 'scientific' });
    }
  };

  type CalcButton = {
    label: string;
    variant: 'default' | 'operator' | 'action' | 'scientific';
    onClick: () => void;
    className?: string;
  };

  const buttons: CalcButton[] = [
    { label: 'π', variant: 'scientific', onClick: () => handleInput('π') },
    { label: 'e', variant: 'scientific', onClick: () => handleInput('e') },
    { label: 'x²', variant: 'scientific', onClick: () => handleInput('^2') },
    { label: 'DEL', variant: 'action', onClick: handleDelete, className: '!bg-red-500 !text-white dark:!bg-red-600 dark:!text-white' },
    { label: 'AC', variant: 'action', onClick: handleClear, className: '!bg-white !text-black dark:!bg-white dark:!text-black' },

    { label: 'x⁻¹', variant: 'scientific', onClick: () => handleInput('^-1') },
    { label: '√', variant: 'scientific', onClick: () => handleInput('sqrt(') },
    { label: '^', variant: 'scientific', onClick: () => handleInput('^') },
    { label: 'log', variant: 'scientific', onClick: () => handleInput('log10(') },
    { label: 'ln', variant: 'scientific', onClick: () => handleInput('log(') },

    { label: 'sin', variant: 'scientific', onClick: () => handleInput('sin(') },
    { label: 'cos', variant: 'scientific', onClick: () => handleInput('cos(') },
    { label: 'tan', variant: 'scientific', onClick: () => handleInput('tan(') },
    { label: '!', variant: 'scientific', onClick: () => handleInput('!') },
    { label: 'Ans', variant: 'scientific', onClick: () => handleInput(result || '0') },

    { label: '7', variant: 'default', onClick: () => handleInput('7') },
    { label: '8', variant: 'default', onClick: () => handleInput('8') },
    { label: '9', variant: 'default', onClick: () => handleInput('9') },
    { label: '(', variant: 'scientific', onClick: () => handleInput('(') },
    { label: ')', variant: 'scientific', onClick: () => handleInput(')') },

    { label: '4', variant: 'default', onClick: () => handleInput('4') },
    { label: '5', variant: 'default', onClick: () => handleInput('5') },
    { label: '6', variant: 'default', onClick: () => handleInput('6') },
    { label: '×', variant: 'operator', onClick: () => handleInput('×') },
    { label: '÷', variant: 'operator', onClick: () => handleInput('÷') },

    { label: '1', variant: 'default', onClick: () => handleInput('1') },
    { label: '2', variant: 'default', onClick: () => handleInput('2') },
    { label: '3', variant: 'default', onClick: () => handleInput('3') },
    { label: '+', variant: 'operator', onClick: () => handleInput('+') },
    { label: '−', variant: 'operator', onClick: () => handleInput('−') },

    { label: '0', variant: 'default', onClick: () => handleInput('0') },
    { label: '.', variant: 'default', onClick: () => handleInput('.') },
    { label: '±', variant: 'default', onClick: () => {
      if (expression.startsWith('-')) setExpression(expression.slice(1));
      else setExpression('-' + expression);
    }},
    { label: 'EXP', variant: 'scientific', onClick: () => handleInput('E') },
    { label: '=', variant: 'operator', onClick: handleCalculate },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black">
      <div className="flex-1 flex flex-col justify-end p-6 items-end space-y-2">
        <div className="text-zinc-500 dark:text-zinc-400 text-2xl h-8 tracking-wider font-light overflow-x-auto whitespace-nowrap w-full text-right scrollbar-hide">
          {expression}
        </div>
        <div className="text-5xl sm:text-6xl font-medium text-zinc-900 dark:text-white h-16 tracking-tight overflow-x-auto whitespace-nowrap w-full text-right scrollbar-hide">
          {result || expression || '0'}
        </div>
      </div>
      
      <div className="p-3 sm:p-4 grid grid-cols-5 gap-2 sm:gap-3 bg-zinc-100 dark:bg-zinc-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
        {buttons.map((btn, i) => (
          <Button
            key={i}
            variant={btn.variant}
            onClick={btn.onClick}
            className={`h-12 sm:h-14 text-base sm:text-lg ${btn.className || ''}`}
          >
            {btn.label}
          </Button>
        ))}
        <div className="col-span-5 flex justify-center mt-2">
          <AdBanner />
        </div>
      </div>
    </div>
  );
}
