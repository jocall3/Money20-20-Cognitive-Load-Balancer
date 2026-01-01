
import React, { useState, useEffect, useCallback } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  BarChart, Bar, Cell 
} from 'recharts';
import Navigation from './components/Navigation';
import Gauge from './components/Gauge';
import FintechCard from './components/FintechCard';
import { getGeminiInsights } from './services/geminiService';
import { 
  mockFeatures, mockSystemHealthMetrics, mockTokenRailMetrics, 
  mockThrottlingPolicies, mockAgentDefinitions 
} from './constants';
import { 
  FeatureDefinition, SystemHealthMetric, TokenRailMetrics, 
  ThrottlingPolicy, AgentDefinition, AlertInstance, AlertSeverity
} from './types';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cognitiveLoad, setCognitiveLoad] = useState(0.42);
  const [systemHealth, setSystemHealth] = useState<SystemHealthMetric>(mockSystemHealthMetrics[mockSystemHealthMetrics.length - 1]);
  const [features, setFeatures] = useState<FeatureDefinition[]>(mockFeatures);
  const [policies, setPolicies] = useState<ThrottlingPolicy[]>(mockThrottlingPolicies);
  const [rails, setRails] = useState<TokenRailMetrics[]>(mockTokenRailMetrics);
  const [aiInsights, setAiInsights] = useState<string>("Initializing agentic analysis...");
  const [loadingInsights, setLoadingInsights] = useState(false);

  // Simulation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setCognitiveLoad(prev => {
        const delta = (Math.random() - 0.45) * 0.1;
        return Math.min(Math.max(prev + delta, 0.1), 0.98);
      });
      
      setSystemHealth(prev => ({
        ...prev,
        cpuUsage: Math.min(Math.max(prev.cpuUsage + (Math.random() - 0.5) * 5, 30), 95),
        timestamp: new Date().toISOString()
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const refreshInsights = useCallback(async () => {
    setLoadingInsights(true);
    const data = {
      cognitiveLoad,
      cpu: systemHealth.cpuUsage,
      activeFeatures: features.filter(f => f.isActive).length,
      throttlingActive: cognitiveLoad > 0.8
    };
    const insight = await getGeminiInsights(data);
    setAiInsights(insight);
    setLoadingInsights(false);
  }, [cognitiveLoad, systemHealth.cpuUsage, features]);

  useEffect(() => {
    refreshInsights();
    const insightInterval = setInterval(refreshInsights, 60000); // Hourly check or trigger on major events
    return () => clearInterval(insightInterval);
  }, [refreshInsights]);

  const renderDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Top row metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1 glass-card p-6 rounded-3xl flex flex-col items-center justify-center">
          <Gauge value={cognitiveLoad} label="User Cognitive Load" size={180} />
          <p className="mt-4 text-xs text-slate-400 text-center px-4 leading-relaxed italic">
            Adaptive load balancing currently {cognitiveLoad > 0.75 ? 'Throttling Complex Tasks' : 'In Passive Observation'}.
          </p>
        </div>

        <div className="lg:col-span-3 glass-card p-6 rounded-3xl flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">System Resource Pulse</h2>
              <p className="text-xs text-slate-500">Real-time CPU and Memory Utilization %</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-indigo-500" />
                <span className="text-xs text-slate-400">CPU</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500" />
                <span className="text-xs text-slate-400">Memory</span>
              </div>
            </div>
          </div>
          <div className="flex-1 min-h-[160px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockSystemHealthMetrics}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis hide />
                <YAxis domain={[0, 100]} hide />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '12px', color: '#fff' }}
                  itemStyle={{ fontSize: '12px' }}
                />
                <Line type="monotone" dataKey="cpuUsage" stroke="#6366f1" strokeWidth={3} dot={false} animationDuration={2000} />
                <Line type="monotone" dataKey="memoryUsage" stroke="#10b981" strokeWidth={3} dot={false} animationDuration={2500} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Middle row AI Insights & Fintech */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 glass-card p-6 rounded-3xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <span className="text-9xl">🤖</span>
          </div>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-extrabold text-white flex items-center gap-2">
                <span className="text-2xl">✨</span> Gemini AI Engine Insights
              </h2>
              <button 
                onClick={refreshInsights}
                disabled={loadingInsights}
                className="text-xs font-bold text-indigo-400 uppercase tracking-widest hover:text-indigo-300 disabled:opacity-50"
              >
                {loadingInsights ? 'Analyzing...' : 'Manual Refresh'}
              </button>
            </div>
            <div className="bg-slate-900/50 rounded-2xl p-5 border border-slate-700/50 min-h-[180px]">
              <div className="prose prose-invert prose-sm">
                <p className="text-slate-300 font-medium leading-relaxed whitespace-pre-line font-mono text-sm">
                  {aiInsights}
                </p>
              </div>
            </div>
            <div className="mt-4 flex gap-2">
              <span className="px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase">Confidence: 94%</span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase">Context: BUILD_PHASE_01</span>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1 space-y-6">
          <h2 className="text-lg font-bold text-slate-300 px-2">Fintech Rails Health</h2>
          {rails.map(rail => <FintechCard key={rail.railId} rail={rail} />)}
        </div>
      </div>

      {/* Bottom row Features & Agents Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <div className="glass-card p-6 rounded-3xl flex flex-col">
          <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-1">Active Features</span>
          <span className="text-4xl font-black text-white">{features.filter(f => f.isActive).length}</span>
          <div className="mt-auto pt-4 flex items-center gap-2 text-emerald-400 text-xs font-bold">
            <span>↑ 2 Since Deployment</span>
          </div>
        </div>
        <div className="glass-card p-6 rounded-3xl flex flex-col">
          <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-1">Active Policies</span>
          <span className="text-4xl font-black text-white">{policies.length}</span>
          <div className="mt-auto pt-4 flex items-center gap-2 text-indigo-400 text-xs font-bold">
            <span>Adaptive Control Enabled</span>
          </div>
        </div>
        <div className="glass-card p-6 rounded-3xl flex flex-col">
          <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-1">AI Agents In-Flight</span>
          <span className="text-4xl font-black text-white">{mockAgentDefinitions.length}</span>
          <div className="mt-auto pt-4 flex items-center gap-2 text-slate-400 text-xs font-bold">
            <span>Orchestration Healthy</span>
          </div>
        </div>
        <div className="glass-card p-6 rounded-3xl flex flex-col">
          <span className="text-slate-500 font-bold text-[10px] uppercase tracking-widest mb-1">API Throughput</span>
          <span className="text-4xl font-black text-white">{(systemHealth.apiCallRate / 1000).toFixed(1)}k</span>
          <div className="mt-auto pt-4 flex items-center gap-2 text-slate-500 text-xs font-bold font-mono uppercase">
            Ops/Second
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlaceholder = (title: string) => (
    <div className="glass-card p-10 rounded-3xl flex flex-col items-center justify-center text-center space-y-4">
      <div className="text-6xl">🚀</div>
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <p className="text-slate-400 max-w-md">
        This management view is highly proprietary and currently rendering its telemetry feeds. 
        In a production environment, complete CRUD interfaces for {title} would appear here.
      </p>
      <button className="bg-slate-800 hover:bg-slate-700 px-6 py-2 rounded-xl text-sm font-bold transition-colors">
        Access Admin Console
      </button>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0f172a] text-slate-200 pl-64">
      <Navigation activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <header className="sticky top-0 z-40 bg-[#0f172a]/80 backdrop-blur-md border-b border-slate-800/50 px-8 py-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-3 capitalize">
             {activeTab} Management
          </h1>
          <p className="text-xs text-slate-500 font-medium">Build Phase Architecture Control Plane (v2.5.0-alpha)</p>
        </div>
        <div className="flex items-center gap-4">
           <div className="flex flex-col text-right">
             <span className="text-xs font-bold text-slate-400">Chief Orchestrator</span>
             <span className="text-[10px] text-indigo-400 font-mono">0x4F...E21</span>
           </div>
           <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-indigo-500 overflow-hidden shadow-inner">
             <img src="https://picsum.photos/seed/admin/40/40" alt="Avatar" />
           </div>
        </div>
      </header>

      <main className="p-8 pb-20">
        {activeTab === 'dashboard' ? renderDashboard() : renderPlaceholder(activeTab)}
      </main>

      <footer className="fixed bottom-0 left-64 right-0 bg-[#0f172a]/95 backdrop-blur-sm border-t border-slate-800/50 px-8 py-3 flex items-center justify-between text-[10px] text-slate-500 font-bold uppercase tracking-widest z-40">
        <div className="flex items-center gap-6">
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Ledger Status: CONFIRMED</span>
          <span className="flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-500"></span> Identity Mesh: ACTIVE</span>
        </div>
        <div className="flex items-center gap-6">
          <span>Region: AWS-US-EAST-1</span>
          <span>Latency: 14ms</span>
          <span className="text-indigo-400">BUILD PHASE: PHASE_01_ORCHESTRATION</span>
        </div>
      </footer>
    </div>
  );
};

export default App;
