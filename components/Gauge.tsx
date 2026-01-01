
import React from 'react';

interface GaugeProps {
  value: number; // 0 to 1
  label: string;
  size?: number;
}

const Gauge: React.FC<GaugeProps> = ({ value, label, size = 160 }) => {
  const radius = size * 0.4;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value * circumference);
  
  const getColor = (v: number) => {
    if (v > 0.85) return '#ef4444'; // red
    if (v > 0.7) return '#f97316'; // orange
    if (v > 0.5) return '#eab308'; // yellow
    return '#10b981'; // green
  };

  const color = getColor(value);

  return (
    <div className="relative flex flex-col items-center justify-center" style={{ width: size, height: size }}>
      <svg className="transform -rotate-90" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke="#1e293b"
          strokeWidth="12"
          fill="transparent"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeWidth="12"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="transparent"
          className="transition-all duration-1000 ease-out"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-3xl font-black text-white" style={{ color: color }}>
          {(value * 100).toFixed(0)}%
        </span>
        <span className="text-[10px] uppercase font-bold text-slate-500 mt-1 tracking-widest">{label}</span>
      </div>
      
      {/* Decorative glow */}
      <div 
        className="absolute inset-0 rounded-full opacity-10 blur-xl transition-colors duration-1000"
        style={{ backgroundColor: color }}
      />
    </div>
  );
};

export default Gauge;
