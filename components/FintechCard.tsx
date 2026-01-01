
import React from 'react';
import { TokenRailMetrics } from '../types';

interface FintechCardProps {
  rail: TokenRailMetrics;
}

const FintechCard: React.FC<FintechCardProps> = ({ rail }) => {
  const isOnline = rail.status === 'operational';
  
  return (
    <div className="glass-card p-5 rounded-2xl border-l-4" style={{ borderLeftColor: isOnline ? '#10b981' : '#f59e0b' }}>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-bold text-lg text-slate-100">{rail.railType}</h3>
          <span className="text-[10px] font-mono text-slate-500 uppercase tracking-wider">{rail.railId}</span>
        </div>
        <div className={`px-2 py-1 rounded text-[10px] font-bold uppercase ${isOnline ? 'bg-emerald-500/10 text-emerald-400' : 'bg-amber-500/10 text-amber-400'}`}>
          {rail.status}
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Throughput</p>
          <p className="text-xl font-mono font-medium text-white">{rail.tps}<span className="text-xs text-slate-400 ml-1">TPS</span></p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Latency</p>
          <p className="text-xl font-mono font-medium text-white">{rail.avgLatency}<span className="text-xs text-slate-400 ml-1">ms</span></p>
        </div>
        <div className="space-y-1">
          <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Error Rate</p>
          <p className={`text-xl font-mono font-medium ${rail.errorRate > 0.003 ? 'text-red-400' : 'text-slate-300'}`}>
            {(rail.errorRate * 100).toFixed(2)}<span className="text-xs text-slate-400 ml-1">%</span>
          </p>
        </div>
        <div className="space-y-1 text-right flex flex-col justify-end">
           <p className="text-lg font-bold text-indigo-400">${(rail.totalValueTransacted / 1000000).toFixed(1)}M</p>
           <p className="text-[9px] text-slate-500 uppercase tracking-tighter">Volume (24h)</p>
        </div>
      </div>
    </div>
  );
};

export default FintechCard;
