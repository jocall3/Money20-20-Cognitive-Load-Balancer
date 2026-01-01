
import React from 'react';

interface NavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'features', label: 'Features', icon: '🛠️' },
    { id: 'policies', label: 'Policies', icon: '⚖️' },
    { id: 'agents', label: 'AI Agents', icon: '🤖' },
    { id: 'rails', label: 'Fintech Rails', icon: '💸' },
    { id: 'security', label: 'Security & ID', icon: '🛡️' },
  ];

  return (
    <nav className="fixed top-0 left-0 h-full w-64 glass-card border-r border-slate-800 z-50 flex flex-col p-4">
      <div className="flex items-center gap-3 mb-10 px-2">
        <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-xl shadow-lg shadow-indigo-500/20">
          M
        </div>
        <span className="font-extrabold text-lg tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
          MONEY 20/20
        </span>
      </div>
      
      <div className="space-y-1 flex-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === tab.id 
                ? 'bg-indigo-600/10 text-indigo-400 border border-indigo-600/20' 
                : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200'
            }`}
          >
            <span className="text-xl opacity-80 group-hover:scale-110 transition-transform">{tab.icon}</span>
            <span className="font-semibold text-sm">{tab.label}</span>
          </button>
        ))}
      </div>

      <div className="mt-auto pt-6 border-t border-slate-800 px-2 pb-4">
        <div className="bg-slate-800/50 rounded-xl p-3">
          <div className="text-[10px] uppercase font-bold text-slate-500 mb-1">System Health</div>
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-emerald-400">Normal Operations</span>
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
