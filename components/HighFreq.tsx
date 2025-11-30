
import React, { useState, useEffect } from 'react';
import { generateOrderBook } from '../utils/dataGenerator';
import { OrderBookLevel } from '../types';
import { ArrowDown, ArrowUp, Activity, BarChart2, Briefcase, Zap } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const OrderBookRow: React.FC<{ level: OrderBookLevel; maxVol: number }> = ({ level, maxVol }) => {
  const width = Math.min((level.size / maxVol) * 100, 100);
  
  return (
    <div className="relative flex items-center justify-between py-1 px-3 text-xs md:text-sm font-mono hover:bg-slate-100 transition-colors cursor-pointer group">
      <div 
        className={`absolute top-0 bottom-0 opacity-10 transition-all group-hover:opacity-20 ${level.type === 'bid' ? 'right-0 bg-green-500' : 'left-0 bg-red-500'}`}
        style={{ width: `${width}%` }}
      />
      <span className={`font-medium ${level.type === 'bid' ? 'text-green-700' : 'text-slate-300'}`}>
        {level.type === 'bid' ? level.size : '-'}
      </span>
      <span className={`font-bold z-10 ${level.type === 'bid' ? 'text-green-600' : 'text-red-600'}`}>
        {level.price.toFixed(2)}
      </span>
      <span className={`font-medium ${level.type === 'ask' ? 'text-red-700' : 'text-slate-300'}`}>
        {level.type === 'ask' ? level.size : '-'}
      </span>
    </div>
  );
};

const HighFreq: React.FC = () => {
  const [midPrice, setMidPrice] = useState(100.00);
  const [book, setBook] = useState(generateOrderBook(100.00));
  const { t } = useLanguage();

  // Simulate live market data
  useEffect(() => {
    const interval = setInterval(() => {
      const noise = (Math.random() - 0.5) * 0.15;
      const newMid = midPrice + noise;
      setMidPrice(newMid);
      setBook(generateOrderBook(newMid));
    }, 800); // Slightly faster update for HFT feel
    return () => clearInterval(interval);
  }, [midPrice]);

  const maxVol = Math.max(
    ...book.bids.map(b => b.size),
    ...book.asks.map(a => a.size)
  );

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">{t('hft_title')}</h2>
            <p className="text-slate-600 text-sm mt-1">{t('hft_desc')}</p>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-green-50 text-green-700 border border-green-200 rounded-full text-xs font-bold uppercase tracking-wider animate-pulse">
            <Activity size={14} />
            {t('live_feed')}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Order Book Visualizer */}
          <div className="border border-slate-200 rounded-xl overflow-hidden shadow-sm bg-white">
            <div className="bg-slate-50 border-b border-slate-200 p-3 flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wide">
              <span>{t('bid_size')}</span>
              <span>Price</span>
              <span>{t('ask_size')}</span>
            </div>
            
            <div className="flex flex-col h-[400px]">
              <div className="flex-1 flex flex-col justify-end overflow-hidden">
                {book.asks.slice().reverse().map((level, i) => (
                  <OrderBookRow key={`ask-${i}`} level={level} maxVol={maxVol} />
                ))}
              </div>
              
              <div className="bg-slate-50 py-3 text-center font-mono text-lg font-bold text-slate-800 border-y border-slate-200 flex justify-center items-center gap-3 my-1">
                {midPrice.toFixed(3)}
                {midPrice > 100 ? <ArrowUp size={18} className="text-green-500"/> : <ArrowDown size={18} className="text-red-500"/>}
              </div>
              
              <div className="flex-1 overflow-hidden">
                {book.bids.map((level, i) => (
                  <OrderBookRow key={`bid-${i}`} level={level} maxVol={maxVol} />
                ))}
              </div>
            </div>
          </div>

          {/* Strategy Explainer */}
          <div className="space-y-5">
            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <div className="p-1.5 bg-blue-100 text-blue-600 rounded"><BarChart2 size={18}/></div>
                {t('vwap_title')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('vwap_desc')}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <div className="p-1.5 bg-amber-100 text-amber-600 rounded"><Briefcase size={18}/></div>
                {t('mm_title')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('mm_desc')}
              </p>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
              <h3 className="font-bold text-slate-900 mb-2 flex items-center gap-2">
                <div className="p-1.5 bg-purple-100 text-purple-600 rounded"><Zap size={18}/></div>
                {t('as_model')}
              </h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                {t('as_desc')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HighFreq;
