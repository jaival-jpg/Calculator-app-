export type CalculationHistoryItem = {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
  type: 'basic' | 'scientific';
};

export type Theme = 'dark' | 'light';

export type Page = 
  | 'basic'
  | 'scientific'
  | 'history'
  | 'age'
  | 'currency'
  | 'about';
