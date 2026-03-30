import React from 'react';
import { motion } from 'framer-motion';
import { Sprout, Droplet, Sun, Wind, Map, ArrowRight, Zap, Target } from 'lucide-react';

const AgricultureIntelligence: React.FC = () => {
  const opportunities = [
    { title: "Precision Cereal Hub", kebele: "Odaa Roobee", score: 92, crops: "Wheat, Barley", factors: "Loamy Soil, Proximity to Water" },
    { title: "High-Altitude Horticulture", kebele: "Kibxaatee", score: 88, crops: "Potatoes, Highland Veg", factors: "Optimal Elevation, Rich Organic Matter" },
    { title: "Dairy Potential Zone", kebele: "Walta'i Caffee", score: 85, crops: "Pasture, Fodder", factors: "Existing Infrastructure, Flat Terrain" },
  ];

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-24">
        <motion.div
           initial={{ opacity: 0, x: -30 }}
           animate={{ opacity: 1, x: 0 }}
        >
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-6 border border-emerald-500/20">
            <Sprout className="w-8 h-8 text-emerald-400" />
          </div>
          <h1 className="text-5xl font-black mb-6 tracking-tight">Agri-Opportunity <br /><span className="text-emerald-500">Mapping</span></h1>
          <p className="text-lg text-neutral-400 mb-8 leading-relaxed">
            Revolutionizing food security in Bale Robe through AI-driven site selection. Our platform identifies optimal zones for different crop types based on multi-criteria spatial analysis.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <FeatureMini icon={Droplet} label="Water Proximity" />
            <FeatureMini icon={Sun} label="Solar Exposure" />
            <FeatureMini icon={Wind} label="Soil Composition" />
            <FeatureMini icon={Map} label="Logistics Reach" />
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <div className="absolute -inset-10 bg-emerald-500/10 blur-3xl rounded-full" />
          <div className="relative rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl aspect-square lg:aspect-video">
            <img 
              src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/bcb3983b-ae83-4059-93ff-97cb2bb10dc2/ai-agri-intelligence-background-155ce777-1773006203239.webp" 
              className="w-full h-full object-cover" 
              alt="Agriculture Intelligence" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-transparent" />
            <div className="absolute bottom-10 left-10 p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 max-w-xs">
              <div className="text-xs text-emerald-400 font-bold uppercase mb-2">Live Insight</div>
              <p className="text-sm text-neutral-200">Southern Bale Robe shows a 24% higher suitability for mechanized cereal farming compared to the northern periphery.</p>
            </div>
          </div>
        </motion.div>
      </div>

      <h2 className="text-2xl font-bold mb-10 flex items-center gap-3">
        <Target className="w-6 h-6 text-emerald-500" />
        High-Potential Opportunity Zones
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {opportunities.map((opt, idx) => (
          <motion.div 
            key={idx}
            whileHover={{ y: -10 }}
            className="p-8 bg-neutral-900 border border-white/5 rounded-[2.5rem] group hover:border-emerald-500/30 transition-all"
          >
            <div className="flex justify-between items-start mb-6">
              <div className="px-3 py-1 bg-emerald-500/10 text-emerald-400 text-[10px] font-bold rounded-full border border-emerald-500/20 uppercase tracking-widest">
                Class {String.fromCharCode(65 + idx)}
              </div>
              <div className="text-2xl font-black text-white">{opt.score}%</div>
            </div>
            <h3 className="text-xl font-bold mb-2">{opt.title}</h3>
            <p className="text-sm text-neutral-500 mb-6">{opt.kebele}</p>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between items-center text-xs">
                <span className="text-neutral-500 uppercase tracking-tighter font-bold">Recommended Crops</span>
                <span className="text-neutral-200">{opt.crops}</span>
              </div>
              <div className="text-xs leading-relaxed text-neutral-400 bg-neutral-950 p-4 rounded-xl border border-white/5">
                <span className="text-emerald-500 font-bold block mb-1">Success Factors:</span>
                {opt.factors}
              </div>
            </div>

            <button className="w-full group-hover:bg-emerald-600 py-3 rounded-xl border border-white/10 group-hover:border-emerald-500 font-bold text-sm transition-all flex items-center justify-center gap-2">
              Deep Dive Analysis
              <ArrowRight className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const FeatureMini = ({ icon: Icon, label }: any) => (
  <div className="flex items-center gap-3 p-4 rounded-2xl bg-white/5 border border-white/5">
    <Icon className="w-5 h-5 text-emerald-400" />
    <span className="text-sm font-medium text-neutral-300">{label}</span>
  </div>
);

export default AgricultureIntelligence;