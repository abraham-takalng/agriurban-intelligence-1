import React from 'react';
import { TrendingUp, DollarSign, ShieldCheck } from 'lucide-react';
import { motion } from 'framer-motion';
import MapContainer from '../components/map/MapContainer';
import { kebeles, investmentIndices } from '../data/mockGisData';
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';

const Investment = () => {
  return (
    <div className="pt-20 px-6 min-h-screen bg-slate-950 pb-12">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-2">
              <TrendingUp className="w-4 h-4" /> Spatial Investment Intelligence
            </div>
            <h1 className="text-4xl font-black text-white tracking-tight">Land Value & Investment Index</h1>
          </div>
          <button className="px-6 py-3 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-bold flex items-center gap-2">
             <DollarSign className="w-4 h-4" /> Analyze Portfolio
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 h-[600px] relative">
            <MapContainer mode="investment" />
          </div>

          <div className="lg:col-span-4 space-y-6">
             <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl">
                <h3 className="text-sm font-bold text-white mb-6 uppercase">Potential Zones</h3>
                <div className="h-48 w-full mb-6">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={investmentIndices}>
                      <XAxis dataKey="name" hide />
                      <Tooltip 
                         contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                      />
                      <Bar dataKey="score">
                        {investmentIndices.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-3">
                   {kebeles.sort((a, b) => b.investmentScore - a.investmentScore).slice(0, 3).map((k, i) => (
                     <div key={i} className="flex items-center justify-between p-3 bg-slate-950 rounded-xl border border-slate-800">
                        <div className="text-sm font-bold text-white">{k.name}</div>
                        <div className="text-sm font-bold text-indigo-400">{k.investmentScore}</div>
                     </div>
                   ))}
                </div>
             </div>

             <div className="p-6 bg-indigo-600 rounded-2xl">
                <h3 className="text-xl font-bold text-white mb-2">Secure Insights</h3>
                <p className="text-indigo-100 text-sm mb-6">AI identifies under-valued land parcels with high infrastructure proximity scores.</p>
                <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-sm">
                   Access Premium Reports
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Investment;