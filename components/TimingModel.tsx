
import React, { useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ComposedChart, Area } from 'recharts';
import { generatePriceHistory } from '../utils/dataGenerator';
import { Eye, EyeOff, Info } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const TimingModel: React.FC = () => {
  const [data] = useState(() => generatePriceHistory(150));
  const [showMA, setShowMA] = useState(true);
  const [showBollinger, setShowBollinger] = useState(false);
  const [showKalman, setShowKalman] = useState(false);
  const { t } = useLanguage();

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('timing_title')}</h2>
          <p className="text-slate-600 max-w-3xl">
            {t('timing_desc')}
          </p>
        </div>

        <div className="flex flex-wrap gap-3 mb-6">
          <button
            onClick={() => setShowMA(!showMA)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
              showMA ? 'bg-blue-50 text-blue-700 border-blue-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {showMA ? <Eye size={16} /> : <EyeOff size={16} />}
            {t('btn_ma')}
          </button>
          <button
            onClick={() => setShowBollinger(!showBollinger)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
              showBollinger ? 'bg-purple-50 text-purple-700 border-purple-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {showBollinger ? <Eye size={16} /> : <EyeOff size={16} />}
            {t('btn_bb')}
          </button>
          <button
            onClick={() => setShowKalman(!showKalman)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
              showKalman ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
            }`}
          >
            {showKalman ? <Eye size={16} /> : <EyeOff size={16} />}
            {t('btn_kf')}
          </button>
        </div>

        <div className="h-[450px] w-full bg-slate-50 rounded-lg p-4 border border-slate-100">
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={data} margin={{ top: 10, right: 30, left: 10, bottom: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis dataKey="date" tick={{fontSize: 12, fill: '#64748b'}} minTickGap={30} tickLine={false} axisLine={false} dy={10} />
              <YAxis domain={['auto', 'auto']} tick={{fontSize: 12, fill: '#64748b'}} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ paddingTop: '20px' }}/>
              
              {showBollinger && (
                <>
                  <Area type="monotone" dataKey="upperBand" stroke="none" fill="#d8b4fe" fillOpacity={0.2} />
                  <Area type="monotone" dataKey="lowerBand" stroke="none" fill="#fff" fillOpacity={1} />
                  <Line type="monotone" dataKey="upperBand" stroke="#a855f7" strokeWidth={1} dot={false} strokeDasharray="5 5" name="Upper Band" />
                  <Line type="monotone" dataKey="lowerBand" stroke="#a855f7" strokeWidth={1} dot={false} strokeDasharray="5 5" name="Lower Band" />
                </>
              )}

              <Line type="monotone" dataKey="price" stroke="#1e293b" strokeWidth={2} dot={false} name="Price" />
              
              {showMA && (
                <>
                  <Line type="monotone" dataKey="ma20" stroke="#3b82f6" strokeWidth={2} dot={false} name="MA (20)" />
                  <Line type="monotone" dataKey="ma50" stroke="#f59e0b" strokeWidth={2} dot={false} name="MA (50)" />
                </>
              )}

              {showKalman && (
                <Line type="monotone" dataKey="kalman" stroke="#10b981" strokeWidth={3} dot={false} name="Kalman Est." />
              )}
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
              <Info size={20} />
            </div>
            <h3 className="font-semibold text-slate-800">{t('theory_context')}</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t('theory_desc')}
          </p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
              <Info size={20} />
            </div>
            <h3 className="font-semibold text-slate-800">Bollinger Bands</h3>
          </div>
          <p className="text-sm text-slate-600 leading-relaxed">
            {t('bb_desc')}
          </p>
        </div>
      </div>
    </div>
  );
};

export default TimingModel;
