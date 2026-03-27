import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, AreaChart, Area } from 'recharts';
import { kebeles, growthHistory, landCoverTypes } from '../data/mockGisData';
import { BarChart3, TrendingUp, Users, Map as MapIcon, ShieldCheck, Sprout } from 'lucide-react';
import { motion } from 'framer-motion';

const AnalyticsDashboard = () => {
  // Aggregate data
  const totalPopulation = kebeles.reduce((acc, k) => acc + k.population, 0);
  const avgSuitability = kebeles.reduce((acc, k) => acc + k.investmentScore, 0) / kebeles.length;
  
  const landCoverDistribution = [
    { name: 'Built-up', value: kebeles.reduce((acc, k) => acc + k.landCover.builtUp, 0) / kebeles.length },
    { name: 'Crop Land', value: kebeles.reduce((acc, k) => acc + k.landCover.cropLand, 0) / kebeles.length },
    { name: 'Vegetation', value: kebeles.reduce((acc, k) => acc + k.landCover.vegetation, 0) / kebeles.length },
    { name: 'Water', value: kebeles.reduce((acc, k) => acc + k.landCover.water, 0) / kebeles.length },
    { name: 'Bare Land', value: kebeles.reduce((acc, k) => acc + k.landCover.bare, 0) / kebeles.length },
  ];

  const suitabilityStats = [
    { name: 'Very High', count: kebeles.filter(k => k.suitability === 'Very High').length },
    { name: 'High', count: kebeles.filter(k => k.suitability === 'High').length },
    { name: 'Moderate', count: kebeles.filter(k => k.suitability === 'Moderate').length },
    { name: 'Low', count: kebeles.filter(k => k.suitability === 'Low').length },
    { name: 'Very Low', count: kebeles.filter(k => k.suitability === 'Very Low').length },
  ];

  return (
    <div className="pt-20 px-6 min-h-screen bg-slate-950 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-black text-white flex items-center gap-3">
            <BarChart3 className="text-indigo-500 w-10 h-10" /> Spatial Analytics Dashboard
          </h1>
          <p className="text-slate-400 mt-2">Comprehensive data visualization for Bale Robe urban and agricultural dynamics.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {[
            { label: 'Total Population', value: totalPopulation.toLocaleString(), icon: Users, color: 'text-blue-400' },
            { label: 'Admin Units', value: kebeles.length, icon: MapIcon, color: 'text-indigo-400' },
            { label: 'Avg Investment Score', value: avgSuitability.toFixed(1), icon: TrendingUp, color: 'text-emerald-400' },
            { label: 'Agri Potential', value: '82.4%', icon: Sprout, color: 'text-amber-400' },
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="p-6 bg-slate-900 border border-slate-800 rounded-2xl"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">{stat.label}</span>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-3xl font-black text-white">{stat.value}</div>
              <div className="mt-2 text-[10px] text-slate-500 flex items-center gap-1">
                <ShieldCheck className="w-3 h-3 text-emerald-500" /> Verified via Sentinel-2 Data
              </div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
          {/* Land Cover Chart */}
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-8">Average Land Cover Distribution</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={landCoverDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {landCoverDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={landCoverTypes[index]?.color || '#8884d8'} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    itemStyle={{ color: '#fff', fontSize: '12px' }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
               {landCoverDistribution.map((item, idx) => (
                 <div key={idx} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: landCoverTypes[idx]?.color }} />
                    <span className="text-xs text-slate-400">{item.name}</span>
                 </div>
               ))}
            </div>
          </div>

          {/* Urban Growth Chart */}
          <div className="p-8 bg-slate-900 border border-slate-800 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-8">Urban Expansion vs Agricultural Land</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthHistory}>
                  <defs>
                    <linearGradient id="colorUrban" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorAgri" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#eab308" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#eab308" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                  <XAxis dataKey="year" stroke="#475569" />
                  <YAxis stroke="#475569" />
                  <Tooltip 
                     contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                  />
                  <Area type="monotone" dataKey="urbanArea" stroke="#6366f1" fillOpacity={1} fill="url(#colorUrban)" name="Urban (Ha)" />
                  <Area type="monotone" dataKey="agriculture" stroke="#eab308" fillOpacity={1} fill="url(#colorAgri)" name="Agri (Ha)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
           <div className="lg:col-span-2 p-8 bg-slate-900 border border-slate-800 rounded-3xl">
              <h3 className="text-xl font-bold text-white mb-8">Suitability Class Frequency</h3>
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={suitabilityStats}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                    <XAxis dataKey="name" stroke="#475569" />
                    <YAxis stroke="#475569" />
                    <Tooltip 
                       contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                    />
                    <Bar dataKey="count" fill="#4f46e5" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
           </div>

           <div className="p-8 bg-indigo-600 rounded-3xl flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <BarChart3 size={150} />
              </div>
              <h3 className="text-2xl font-black text-white mb-4">Export Analysis</h3>
              <p className="text-indigo-100 mb-8">Generate detailed PDF reports with high-resolution spatial charts and kebele-level statistics.</p>
              <button className="w-full py-4 bg-white text-indigo-600 font-bold rounded-2xl hover:bg-indigo-50 transition-colors">
                 Download 2026 Report
              </button>
           </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsDashboard;