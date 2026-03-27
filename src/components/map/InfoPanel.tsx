import React from 'react';
import { X, MapPin, Users, Building2, TrendingUp, Info } from 'lucide-react';
import { motion } from 'framer-motion';
import { KebeleData, suitabilityColors } from '../../data/mockGisData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

interface InfoPanelProps {
  data: KebeleData;
  onClose: () => void;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ data, onClose }) => {
  const chartData = [
    { name: 'Built-up', value: data.landCover.builtUp, color: '#ef4444' },
    { name: 'Crop Land', value: data.landCover.cropLand, color: '#eab308' },
    { name: 'Veg', value: data.landCover.vegetation, color: '#22c55e' },
    { name: 'Water', value: data.landCover.water, color: '#3b82f6' },
    { name: 'Bare', value: data.landCover.bare, color: '#78350f' },
  ];

  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className="absolute top-4 right-4 bottom-4 w-80 bg-slate-900/95 backdrop-blur-lg border border-slate-800 rounded-2xl shadow-2xl z-20 flex flex-col"
    >
      <div className="p-4 border-b border-slate-800 flex justify-between items-start">
        <div>
          <h2 className="text-xl font-black text-white">{data.name}</h2>
        </div>
        <button onClick={onClose} className="p-1 text-slate-500 hover:text-white transition-colors">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-grow overflow-y-auto p-4 space-y-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Pop</div>
            <div className="text-sm font-bold text-white">{data.population.toLocaleString()}</div>
          </div>
          <div className="p-3 bg-slate-800/50 rounded-xl border border-slate-700">
            <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Suitability</div>
            <div className="text-xs font-bold" style={{ color: suitabilityColors[data.suitability] }}>{data.suitability}</div>
          </div>
        </div>

        <div className="space-y-2">
          <h3 className="text-[10px] font-bold text-slate-500 uppercase">Analysis</h3>
          <div className="space-y-3">
             <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-500" style={{ width: `${data.agriculturalPotential}%` }}></div>
             </div>
             <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
               <div className="h-full bg-cyan-500" style={{ width: `${data.urbanPotential}%` }}></div>
             </div>
          </div>
        </div>

        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={35} outerRadius={50} paddingAngle={2} dataKey="value">
                {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="p-4 bg-slate-950 border-t border-slate-800">
        <button className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg font-bold text-xs">
          Generate Full Report
        </button>
      </div>
    </motion.div>
  );
};

export default InfoPanel;