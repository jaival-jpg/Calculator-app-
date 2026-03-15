import { useState, useEffect } from 'react';
import { Button } from './Button';
import { safeEvaluate } from '../utils/math';
import { CalculationHistoryItem } from '../types';

type Props = {
  onSaveHistory: (item: Omit<CalculationHistoryItem, 'id' | 'timestamp'>) => void;
};

export function BasicCalculator({ onSaveHistory }: Props) {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');

  const handleInput = (val: string) => {
    if (result && !['+', '−', '×', '÷'].includes(val)) {
      setExpression(val);
      setResult('');
    } else if (result && ['+', '−', '×', '÷'].includes(val)) {
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
      onSaveHistory({ expression, result: res, type: 'basic' });
    }
  };

  const handleToggleSign = () => {
    if (expression) {
      if (expression.startsWith('-')) {
        setExpression(expression.slice(1));
      } else {
        setExpression('-' + expression);
      }
    }
  };

  type CalcButton = {
    label: string;
    variant: 'default' | 'operator' | 'action' | 'scientific';
    onClick: () => void;
    className?: string;
  };

  const buttons: CalcButton[] = [
    { label: 'C', variant: 'action', onClick: handleClear },
    { label: '±', variant: 'action', onClick: handleToggleSign },
    { label: '%', variant: 'action', onClick: () => handleInput('%') },
    { label: '÷', variant: 'operator', onClick: () => handleInput('÷') },
    { label: '7', variant: 'default', onClick: () => handleInput('7') },
    { label: '8', variant: 'default', onClick: () => handleInput('8') },
    { label: '9', variant: 'default', onClick: () => handleInput('9') },
    { label: '×', variant: 'operator', onClick: () => handleInput('×') },
    { label: '4', variant: 'default', onClick: () => handleInput('4') },
    { label: '5', variant: 'default', onClick: () => handleInput('5') },
    { label: '6', variant: 'default', onClick: () => handleInput('6') },
    { label: '−', variant: 'operator', onClick: () => handleInput('−') },
    { label: '1', variant: 'default', onClick: () => handleInput('1') },
    { label: '2', variant: 'default', onClick: () => handleInput('2') },
    { label: '3', variant: 'default', onClick: () => handleInput('3') },
    { label: '+', variant: 'operator', onClick: () => handleInput('+') },
    { label: '0', variant: 'default', onClick: () => handleInput('0'), className: 'col-span-2' },
    { label: '.', variant: 'default', onClick: () => handleInput('.') },
    { label: '=', variant: 'operator', onClick: handleCalculate },
  ];

  return (
    <div className="flex flex-col h-full bg-white dark:bg-black">
      <div className="flex-1 flex flex-col justify-end p-6 items-end space-y-2">
        <div className="text-zinc-500 dark:text-zinc-400 text-2xl h-8 tracking-wider font-light overflow-x-auto whitespace-nowrap w-full text-right scrollbar-hide">
          {expression}
        </div>
        <div className="text-6xl font-medium text-zinc-900 dark:text-white h-16 tracking-tight overflow-x-auto whitespace-nowrap w-full text-right scrollbar-hide">
          {result || expression || '0'}
        </div>
      </div>
      
      <div className="p-4 grid grid-cols-4 gap-4 bg-zinc-100 dark:bg-zinc-900 rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.05)] dark:shadow-[0_-10px_40px_rgba(0,0,0,0.2)]">
        {buttons.map((btn, i) => (
          <Button
            key={i}
            variant={btn.variant}
            onClick={btn.onClick}
            className={`h-16 sm:h-20 ${btn.className || ''}`}
          >
            {btn.label}
          </Button>
        ))}
      </div>
    </div>
  );
}
