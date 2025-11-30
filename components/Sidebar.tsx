
import React from 'react';
import { ModuleType } from '../types';
import { BookOpen, TrendingUp, PieChart, Zap, MessageSquare, Languages } from 'lucide-react';
import { useLanguage } from '../LanguageContext';

interface SidebarProps {
  currentModule: ModuleType;
  setModule: (m: ModuleType) => void;
  isOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ currentModule, setModule, isOpen }) => {
  const { t, language, setLanguage } = useLanguage();

  const menuItems = [
    { id: ModuleType.INTRO, label: t('nav_overview'), icon: BookOpen },
    { id: ModuleType.TIMING, label: t('nav_timing'), icon: TrendingUp },
    { id: ModuleType.PORTFOLIO, label: t('nav_portfolio'), icon: PieChart },
    { id: ModuleType.ALGO, label: t('nav_algo'), icon: Zap },
    { id: ModuleType.AI_CHAT, label: t('nav_tutor'), icon: MessageSquare },
  ];

  return (
    <div className={`
      fixed inset-y-0 left-0 z-30 w-64 bg-slate-900 text-white transform transition-transform duration-300 ease-in-out
      ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 flex flex-col
    `}>
      <div className="p-6 border-b border-slate-800">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              {t('app_title')}
            </h1>
            <p className="text-xs text-slate-400 mt-1">{t('subtitle')}</p>
          </div>
          <button 
            onClick={() => setLanguage(language === 'en' ? 'zh' : 'en')}
            className="p-1 rounded hover:bg-slate-800 text-slate-400 hover:text-white transition-colors"
            title={language === 'en' ? "Switch to Chinese" : "切换为英文"}
          >
            <Languages size={18} />
            <span className="sr-only">Switch Language</span>
          </button>
        </div>
      </div>

      <nav className="p-4 space-y-2 flex-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              onClick={() => setModule(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                currentModule === item.id 
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/50' 
                  : 'text-slate-400 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon size={20} />
              <span className="font-medium text-sm">{item.label}</span>
            </button>
          );
        })}
      </nav>

      <div className="p-6 border-t border-slate-800">
        <div className="text-xs text-slate-500">
          <p>Powered by React & GenAI</p>
          <p className="mt-1">© 2024 QuantInvest</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
