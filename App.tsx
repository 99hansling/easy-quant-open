
import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Intro from './components/Intro';
import TimingModel from './components/TimingModel';
import PortfolioTheory from './components/PortfolioTheory';
import HighFreq from './components/HighFreq';
import AiTutor from './components/AiTutor';
import { ModuleType } from './types';
import { Menu } from 'lucide-react';
import { LanguageProvider } from './LanguageContext';

const AppContent: React.FC = () => {
  const [currentModule, setCurrentModule] = useState<ModuleType>(ModuleType.INTRO);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const renderModule = () => {
    switch (currentModule) {
      case ModuleType.INTRO:
        return <Intro />;
      case ModuleType.TIMING:
        return <TimingModel />;
      case ModuleType.PORTFOLIO:
        return <PortfolioTheory />;
      case ModuleType.ALGO:
        return <HighFreq />;
      case ModuleType.AI_CHAT:
        return <AiTutor />;
      default:
        return <Intro />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      <Sidebar 
        currentModule={currentModule} 
        setModule={(m) => {
          setCurrentModule(m);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
      />

      <div className="flex-1 flex flex-col h-full overflow-hidden w-full relative">
        <header className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between z-20">
          <span className="font-bold text-slate-800">QuantInvest Pro</span>
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="text-slate-600">
            <Menu />
          </button>
        </header>

        <main className="flex-1 overflow-y-auto">
          {renderModule()}
        </main>
      </div>
      
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
};

export default App;
