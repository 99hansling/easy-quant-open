
import React, { useMemo } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { generatePortfolioData } from '../utils/dataGenerator';
import { useLanguage } from '../LanguageContext';
import { TrendingUp, BarChart3, PieChart } from 'lucide-react';

const PortfolioTheory: React.FC = () => {
  const data = useMemo(() => generatePortfolioData(500), []);
  const { t } = useLanguage();
  
  const efficientFrontier = useMemo(() => {
    // Crude approximation of the upper edge for visualization
    const sorted = [...data].sort((a, b) => a.risk - b.risk);
    const frontier = [];
    let maxRet = -Infinity;
    for(const p of sorted) {
      if(p.return > maxRet) {
        frontier.push(p);
        maxRet = p.return;
      }
    }
    return frontier;
  }, [data]);

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">{t('portfolio_title')}</h2>
        <p className="text-slate-600 mb-6 max-w-3xl">
          {t('portfolio_desc')}
        </p>

        <div className="h-[450px] w-full bg-slate-50 rounded-lg p-4 border border-slate-100">
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 20, right: 30, bottom: 20, left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
              <XAxis 
                type="number" 
                dataKey="risk" 
                name={t('risk_axis')} 
                unit="%" 
                domain={['auto', 'auto']}
                label={{ value: t('risk_axis'), position: 'insideBottom', offset: -10, fill: '#64748b' }} 
                tick={{fontSize: 12, fill: '#64748b'}}
                tickLine={false}
                axisLine={{stroke: '#cbd5e1'}}
              />
              <YAxis 
                type="number" 
                dataKey="return" 
                name={t('return_axis')}
                unit="%" 
                label={{ value: t('return_axis'), angle: -90, position: 'insideLeft', fill: '#64748b' }} 
                tick={{fontSize: 12, fill: '#64748b'}}
                tickLine={false}
                axisLine={{stroke: '#cbd5e1'}}
              />
              <Tooltip 
                cursor={{ strokeDasharray: '3 3' }} 
                contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
              />
              
              <Scatter name="Portfolios" data={data} fill="#94a3b8" opacity={0.5} r={3} />
              <Scatter name="Efficient Frontier" data={efficientFrontier} fill="#0ea5e9" line={{stroke: '#0ea5e9', strokeWidth: 2}} lineType="fitting" shape="circle" />
              
              {/* Capital Market Line Simulation */}
              <ReferenceLine 
                segment={[{ x: 0, y: 2 }, { x: 25, y: 12 }]} 
                stroke="#f59e0b" 
                strokeWidth={2} 
                strokeDasharray="5 5"
                label={{ value: 'CML', fill: '#f59e0b', fontSize: 12 }}
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
        <h3 className="text-lg font-semibold text-slate-800 mb-6 border-b border-slate-100 pb-2">{t('key_concepts')}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg"><TrendingUp size={20}/></div>
              <h4 className="font-bold text-slate-900">{t('eff_frontier')}</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('eff_frontier_desc')}
            </p>
          </div>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-amber-100 text-amber-600 rounded-lg"><BarChart3 size={20}/></div>
              <h4 className="font-bold text-slate-900">CAPM & CML</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('capm_desc')}
            </p>
          </div>
          <div className="p-5 bg-slate-50 rounded-xl border border-slate-100 hover:border-blue-200 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 bg-emerald-100 text-emerald-600 rounded-lg"><PieChart size={20}/></div>
              <h4 className="font-bold text-slate-900">Alpha & Beta</h4>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">
              {t('alpha_beta_desc')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PortfolioTheory;
