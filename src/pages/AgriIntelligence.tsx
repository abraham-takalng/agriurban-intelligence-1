import React from 'react';
import { Sprout, Droplets, Sun, Filter } from 'lucide-react';
import { motion } from 'framer-motion';
import MapContainer from '../components/map/MapContainer';
import { kebeles } from '../data/mockGisData';

const AgriIntelligence = () => {
  return (
    <div className="pt-20 px-6 min-h-screen bg-slate-950 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-green-400 text-xs font-bold uppercase tracking-widest mb-2">
              <Sprout className="w-4 h-4" /> Agricultural Intelligence
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">Farming Opportunity Mapping</h1>
          </div>
          <button className="px-4 py-2 bg-green-600 hover:bg-green-500 text-white rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-green-600/20">
            Generate Agri Report
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-1 space-y-6">
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                <h3 className="text-sm font-bold text-white mb-6 uppercase tracking-wider">Opportunity Index</h3>
                <div className="space-y-6">
                   {kebeles.slice(0, 5).map((k, i) => (
                     <div key={i} className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">{k.name}</span>
                          <span className="text-green-400 font-bold">{k.agriculturalPotential}%</span>
                        </div>
                        <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                          <motion.div initial={{ width: 0 }} animate={{ width: `${k.agriculturalPotential}%` }} className="h-full bg-green-500" />
                        </div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                <div className="space-y-4">
                   <div className="flex items-center gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <Droplets className="w-5 h-5 text-blue-500" />
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Precipitation</div>
                        <div className="text-lg font-bold text-white">850 mm/yr</div>
                      </div>
                   </div>
                   <div className="flex items-center gap-4 p-3 bg-slate-950 rounded-xl border border-slate-800">
                      <Sun className="w-5 h-5 text-orange-500" />
                      <div>
                        <div className="text-[10px] text-slate-500 font-bold uppercase">Solar</div>
                        <div className="text-lg font-bold text-white">21.5 MJ/m²</div>
                      </div>
                   </div>
                </div>
             </div>
          </div>

          <div className="lg:col-span-3 h-[700px] relative">
             <MapContainer mode="agri" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgriIntelligence;