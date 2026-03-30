import React from 'react';
import { X, MapPin, Users, Building2, TrendingUp, Info, AlertTriangle, Droplets, Sprout, Zap, ShieldCheck, Lightbulb } from 'lucide-react';
import { motion } from 'framer-motion';
import { KebeleData, suitabilityColors } from '../../data/mockGisData';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { getRiskColor } from '../../lib/constants';

interface InfoPanelProps {
  kebele: KebeleData | null;
}

const InfoPanel: React.FC<InfoPanelProps> = ({ kebele }) => {
  if (!kebele) {
    return (
      <div className="p-12 flex flex-col items-center justify-center text-center h-full space-y-4">
        <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center text-slate-500">
          <MapPin size={32} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">No Kebele Selected</h3>
          <p className="text-slate-500 mt-2">Select a region on the map to view detailed spatial analytics and disaster risk profiles.</p>
        </div>
      </div>
    );
  }

  const chartData = [
    { name: 'Built-up', value: kebele.landCover.builtUp, color: '#ef4444' },
    { name: 'Crop Land', value: kebele.landCover.cropLand, color: '#eab308' },
    { name: 'Veg', value: kebele.landCover.vegetation, color: '#22c55e' },
    { name: 'Water', value: kebele.landCover.water, color: '#3b82f6' },
    { name: 'Bare', value: kebele.landCover.bare, color: '#78350f' },
  ];

  const MetricItem = ({ label, score, icon: Icon, color }: { label: string, score: number, icon: any, color: string }) => (
    <div className="space-y-2">
      <div className="flex justify-between items-center text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <Icon size={14} className={color} />
          <span>{label}</span>
        </div>
        <span className={`font-bold ${color}`}>{Math.round(score)}%</span>
      </div>
      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          className={`h-full ${color.replace('text-', 'bg-')}`}
        />
      </div>
    </div>
  );

  return (
    <div className="p-6 space-y-8 h-full overflow-y-auto custom-scrollbar">
      <div>
        <h2 className="text-3xl font-black text-white mb-1">{kebele.name}</h2>
        <p className="text-slate-500 flex items-center gap-2 text-xs uppercase tracking-widest font-bold">
          <MapPin size={12} className="text-emerald-500" /> Bale Robe, Ethiopia
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
          <div className="text-[10px] text-slate-500 font-bold uppercase mb-1 flex items-center gap-2">
            <Users size={12} /> Population
          </div>
          <div className="text-xl font-black text-white">{kebele.population.toLocaleString()}</div>
        </div>
        <div className="p-4 bg-slate-800/50 rounded-2xl border border-slate-700">
          <div className="text-[10px] text-slate-500 font-bold uppercase mb-1 flex items-center gap-2">
            <Building2 size={12} /> Main Crop
          </div>
          <div className="text-sm font-black text-white truncate">{kebele.mainCrop}</div>
        </div>
      </div>

      <div className="space-y-4 p-5 bg-slate-900/50 rounded-2xl border border-slate-800">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <TrendingUp size={14} className="text-cyan-500" /> Advanced GIS Metrics
        </h3>
        <div className="space-y-4">
          <MetricItem label="Agri Suitability" score={kebele.agriSuitabilityScore} icon={Sprout} color="text-emerald-400" />
          <MetricItem label="Urban Potential" score={kebele.urbanGrowthPotential} icon={Building2} color="text-blue-400" />
          <MetricItem label="Land Suitability" score={kebele.suitabilityScore} icon={ShieldCheck} color="text-cyan-400" />
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <AlertTriangle size={14} className="text-orange-500" /> Hazard Risk Profile
        </h3>
        <div className="grid grid-cols-1 gap-3">
          {[
            { label: 'Flood Risk', value: kebele.floodRiskLevel, icon: Droplets },
            { label: 'Drought Risk', value: kebele.droughtRiskLevel, icon: Zap },
          ].map((risk, i) => (
            <div key={i} className="flex items-center justify-between p-3 bg-slate-950/50 rounded-xl border border-slate-800">
              <div className="flex items-center gap-2">
                <risk.icon size={14} className="text-slate-500" />
                <span className="text-sm text-slate-400">{risk.label}</span>
              </div>
              <span className="text-[10px] font-bold px-2 py-1 rounded-lg border uppercase" style={{ backgroundColor: `${getRiskColor(risk.value)}20`, color: getRiskColor(risk.value), borderColor: `${getRiskColor(risk.value)}40` }}>
                {risk.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
          <Lightbulb size={14} className="text-yellow-500" /> Strategic Actions
        </h3>
        <div className="space-y-2">
          {kebele.recommendations.map((rec, i) => (
            <div key={i} className="text-xs text-slate-400 leading-relaxed bg-white/5 p-3 rounded-xl border border-white/5">
              • {rec}
            </div>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
           Land Cover Distribution
        </h3>
        <div className="h-40 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={chartData} cx="50%" cy="50%" innerRadius={40} outerRadius={55} paddingAngle={4} dataKey="value">
                {chartData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-x-6 gap-y-2">
          {chartData.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: item.color }} />
                <span className="text-[11px] text-slate-500">{item.name}</span>
              </div>
              <span className="text-[11px] font-bold text-slate-300">{item.value}%</span>
            </div>
          ))}
        </div>
      </div>

      <button className="w-full py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-black transition-all shadow-lg shadow-emerald-900/20 active:scale-[0.98]">
        GENERATE GIS DOSSIER
      </button>
    </div>
  );
};

export default InfoPanel;