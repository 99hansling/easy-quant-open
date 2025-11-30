import { DataPoint, PortfolioPoint, OrderBookLevel } from '../types';

export const generatePriceHistory = (days: number): DataPoint[] => {
  const data: DataPoint[] = [];
  let price = 100;
  let kalman = 100;
  const p = 10; // Kalman estimate covariance
  const q = 0.1; // Process noise covariance
  const r = 1; // Measurement noise covariance
  let kEstimate = 0;

  for (let i = 0; i < days; i++) {
    const change = (Math.random() - 0.48) * 5; // Slight upward drift
    price = price + change;
    
    // Simple Kalman Filter Simulation
    const prediction = kalman;
    const pPred = p + q;
    kEstimate = pPred / (pPred + r);
    kalman = prediction + kEstimate * (price - prediction);
    
    data.push({
      date: new Date(2023, 0, i + 1).toISOString().split('T')[0],
      price: Number(price.toFixed(2)),
      kalman: Number(kalman.toFixed(2)),
      volume: Math.floor(Math.random() * 10000) + 5000,
    });
  }

  // Calculate Moving Averages and Bollinger Bands
  for (let i = 0; i < days; i++) {
    if (i >= 19) {
      const slice20 = data.slice(i - 19, i + 1);
      const sum20 = slice20.reduce((acc, curr) => acc + curr.price, 0);
      data[i].ma20 = Number((sum20 / 20).toFixed(2));

      // Std Dev for Bollinger
      const mean = sum20 / 20;
      const squaredDiffs = slice20.map(d => Math.pow(d.price - mean, 2));
      const avgSquaredDiff = squaredDiffs.reduce((acc, curr) => acc + curr, 0) / 20;
      const stdDev = Math.sqrt(avgSquaredDiff);
      data[i].upperBand = Number((mean + 2 * stdDev).toFixed(2));
      data[i].lowerBand = Number((mean - 2 * stdDev).toFixed(2));
    }
    if (i >= 49) {
      const slice50 = data.slice(i - 49, i + 1);
      const sum50 = slice50.reduce((acc, curr) => acc + curr.price, 0);
      data[i].ma50 = Number((sum50 / 50).toFixed(2));
    }
  }

  return data;
};

export const generatePortfolioData = (count: number): PortfolioPoint[] => {
  const points: PortfolioPoint[] = [];
  for (let i = 0; i < count; i++) {
    // Simulate Efficient Frontier curve shape
    const risk = 5 + Math.random() * 20;
    // Return is roughly proportional to risk but with diminishing returns and noise
    const maxReturn = 4 + Math.log(risk - 4) * 8; 
    const ret = maxReturn - Math.random() * 5; 
    
    points.push({
      risk: Number(risk.toFixed(2)),
      return: Number(ret.toFixed(2)),
      sharpe: Number((ret / risk).toFixed(2))
    });
  }
  return points;
};

export const generateOrderBook = (midPrice: number): { bids: OrderBookLevel[], asks: OrderBookLevel[] } => {
  const bids: OrderBookLevel[] = [];
  const asks: OrderBookLevel[] = [];
  
  for (let i = 1; i <= 10; i++) {
    const bidPrice = midPrice - i * 0.05;
    const bidSize = Math.floor(Math.random() * 500) + 100;
    bids.push({ price: Number(bidPrice.toFixed(2)), size: bidSize, total: 0, type: 'bid' });

    const askPrice = midPrice + i * 0.05;
    const askSize = Math.floor(Math.random() * 500) + 100;
    asks.push({ price: Number(askPrice.toFixed(2)), size: askSize, total: 0, type: 'ask' });
  }
  return { bids, asks };
};