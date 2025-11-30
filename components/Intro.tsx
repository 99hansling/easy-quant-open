
import React from 'react';
import { Book, Target, Database } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

const Intro: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center space-y-4 mb-12">
        <h1 className="text-4xl font-bold text-slate-900">{t('intro_title')}</h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          {t('intro_desc')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 text-blue-600">
            <Target size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">{t('strategy_pillars')}</h3>
          <div className="text-slate-600 text-sm">
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>{t('asset_selection')}</li>
              <li>{t('timing')}</li>
              <li>{t('weighting')}</li>
            </ul>
          </div>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 text-purple-600">
            <Database size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">{t('data_driven')}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {t('data_driven_desc')}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 hover:shadow-md transition-shadow">
          <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 text-emerald-600">
            <Book size={24} />
          </div>
          <h3 className="text-lg font-bold text-slate-800 mb-2">{t('methodology')}</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            {t('methodology_desc')}
          </p>
        </div>
      </div>

      <div className="bg-slate-900 text-white rounded-xl p-8 mt-8 shadow-lg">
        <h2 className="text-2xl font-bold mb-4">{t('how_to_use')}</h2>
        <p className="text-slate-300 leading-relaxed mb-6">
          {t('how_to_use_desc')}
        </p>
        <div className="flex gap-3 flex-wrap">
          <div className="text-sm bg-slate-800 px-4 py-2 rounded-full border border-slate-700 hover:bg-slate-700 transition-colors cursor-default">{t('timing_title')}</div>
          <div className="text-sm bg-slate-800 px-4 py-2 rounded-full border border-slate-700 hover:bg-slate-700 transition-colors cursor-default">{t('portfolio_title')}</div>
          <div className="text-sm bg-slate-800 px-4 py-2 rounded-full border border-slate-700 hover:bg-slate-700 transition-colors cursor-default">{t('hft_title')}</div>
        </div>
      </div>
    </div>
  );
};

export default Intro;
