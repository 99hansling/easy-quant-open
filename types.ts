
export enum ModuleType {
  INTRO = 'INTRO',
  TIMING = 'TIMING',
  PORTFOLIO = 'PORTFOLIO',
  ALGO = 'ALGO',
  AI_CHAT = 'AI_CHAT'
}

export type Language = 'en' | 'zh';

export interface DataPoint {
  date: string;
  price: number;
  ma20?: number;
  ma50?: number;
  upperBand?: number;
  lowerBand?: number;
  kalman?: number;
  volume?: number;
}

export interface PortfolioPoint {
  risk: number;
  return: number;
  sharpe: number;
}

export interface OrderBookLevel {
  price: number;
  size: number;
  total: number;
  type: 'bid' | 'ask';
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}
