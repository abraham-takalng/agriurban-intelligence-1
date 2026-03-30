import React, { useState, useEffect } from 'react';
import MapContainer from '../components/map/MapContainer';
import { motion } from 'framer-motion';
import { BrainCircuit, TrendingUp, Info, AlertTriangle } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { growthHistory } from '../data/mockGisData';

const AIPrediction = () => {
  const [year, setYear] = useState(2025);
  const [isSimulating, setIsSimulating] = useState(false);

  useEffect(() => {
    let interval: any;
    if (isSimulating) {
      interval = setInterval(() => {
        setYear(prev => prev < 2035 ? prev + 1 : 2025);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isSimulating]);

  return (
    <div className="pt-20 px-6 min-h-screen bg-slate-950 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">
              <BrainCircuit className="w-4 h-4" /> Predictive Analytics Engine
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">Urban Growth Simulation</h1>
            <p className="text-slate-400 mt-2">Machine learning models predicting spatial expansion of Bale Robe.</p>
          </div>
          <button 
            onClick={() => setIsSimulating(!isSimulating)}
            className={`px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all ${isSimulating ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-indigo-600 hover:bg-indigo-500 text-white'}`}
          >
            {isSimulating ? 'Stop Simulation' : 'Run Growth Engine'}
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-[600px] relative">
            <div className="absolute top-4 right-4 z-20 bg-slate-900/90 backdrop-blur p-4 rounded-xl border border-slate-800 shadow-xl">
               <div className="text-xs font-bold text-slate-500 mb-1 uppercase">Simulation Year</div>
               <div className="text-3xl font-black text-indigo-400">{year}</div>
            </div>
            <MapContainer mode="prediction" predictionYear={year} />
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 w-3/4 z-20 bg-slate-900/90 backdrop-blur p-6 rounded-2xl border border-slate-800 shadow-2xl">
              <input 
                type="range" 
                min="2025" 
                max="2035" 
                value={year} 
                onChange={(e) => setYear(parseInt(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <div className="flex justify-between mt-2 text-[10px] font-bold text-slate-500">
                <span>2025</span>
                <span>2035</span>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6">
               <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                 <TrendingUp className="w-5 h-5 text-indigo-500" /> Growth Trends
               </h3>
               <div className="h-64 w-full">
                 <ResponsiveContainer width="100%" height="100%">
                   <AreaChart data={growthHistory}>
                     <defs>
                       <linearGradient id="colorUrban" x1="0" y1="0" x2="0" y2="1">
                         <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                         <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                       </linearGradient>
                     </defs>
                     <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                     <XAxis dataKey="year" stroke="#475569" fontSize={10} />
                     <YAxis stroke="#475569" fontSize={10} />
                     <Tooltip 
                        contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                        itemStyle={{ fontSize: '12px' }}
                     />
                     <Area type="monotone" dataKey="urbanArea" stroke="#6366f1" fillOpacity={1} fill="url(#colorUrban)" name="Urban Hectares" />
                   </AreaChart>
                 </ResponsiveContainer>
               </div>
            </div>

            <div className="p-4 bg-indigo-600/10 border border-indigo-500/30 rounded-2xl flex items-start gap-4">
               <AlertTriangle className="w-6 h-6 text-indigo-500 flex-shrink-0" />
               <div>
                  <h4 className="text-sm font-bold text-white">AI Policy Insight</h4>
                  <p className="text-xs text-slate-400 mt-1">Implement green-belt zoning in Handhuraa Roobee to mitigate urban sprawl effects.</p>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIPrediction;