import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShieldCheck, Landmark, BarChart2, CheckCircle2, Building2, MapPin } from 'lucide-react';

const InvestmentOpportunity: React.FC = () => {
  const tiers = [
    { 
      id: "A", 
      label: "Prime Investment Land", 
      color: "cyan", 
      features: ["Immediate utility access", "High market demand", "0-500m to primary roads"],
      stats: { yield: "High", risk: "Low", liquidity: "Excellent" }
    },
    { 
      id: "B", 
      label: "High Potential Zone", 
      color: "emerald", 
      features: ["Planned infrastructure", "Growing residential density", "500m-1.5km to hubs"],
      stats: { yield: "Medium-High", risk: "Moderate", liquidity: "Good" }
    },
    { 
      id: "C", 
      label: "Emerging Market", 
      color: "amber", 
      features: ["Low acquisition cost", "Future growth corridor", "Rural-urban fringe"],
      stats: { yield: "Variable", risk: "Medium", liquidity: "Moderate" }
    },
  ];

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <div className="mb-16">
        <h1 className="text-5xl font-black mb-6">Investment <br /><span className="text-cyan-400">Intelligence</span></h1>
        <p className="text-neutral-400 max-w-2xl text-lg leading-relaxed">
           Our proprietary Spatial Investment Index (SII) calculates profitability for real estate and industrial development by layering 12+ geospatial datasets.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <motion.div 
            key={tier.id}
            whileHover={{ scale: 1.02 }}
            className={`p-10 rounded-[3rem] bg-neutral-900 border border-white/5 flex flex-col relative overflow-hidden`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-${tier.color}-500/10 blur-[60px]`} />
            
            <div className="flex items-center justify-between mb-8">
              <div className={`w-16 h-16 rounded-2xl bg-${tier.color}-500/10 border border-${tier.color}-500/20 flex items-center justify-center text-3xl font-black text-${tier.color}-400`}>
                {tier.id}
              </div>
              <div className="flex flex-col items-end">
                <span className="text-[10px] text-neutral-500 uppercase font-bold">Investment Grade</span>
                <span className={`text-sm font-bold text-${tier.color}-400`}>Premium Grade</span>
              </div>
            </div>

            <h3 className="text-2xl font-bold mb-6">{tier.label}</h3>
            
            <ul className="space-y-4 mb-10 flex-1">
              {tier.features.map((f, i) => (
                <li key={i} className="flex items-center gap-3 text-neutral-400 text-sm">
                  <CheckCircle2 className={`w-4 h-4 text-${tier.color}-500`} />
                  {f}
                </li>
              ))}
            </ul>

            <div className="p-6 bg-neutral-950 rounded-2xl border border-white/5 mb-8 grid grid-cols-2 gap-4">
              <div>
                <div className="text-[10px] text-neutral-600 uppercase mb-1 font-bold">Yield Potential</div>
                <div className="text-sm text-white font-bold">{tier.stats.yield}</div>
              </div>
              <div>
                <div className="text-[10px] text-neutral-600 uppercase mb-1 font-bold">Liquidity</div>
                <div className="text-sm text-white font-bold">{tier.stats.liquidity}</div>
              </div>
            </div>

            <button className={`w-full py-4 bg-${tier.color}-600 rounded-2xl text-white font-bold hover:opacity-90 transition-all`}>
              View Area Parcels
            </button>
          </motion.div>
        ))}
      </div>

      <div className="mt-20 p-12 bg-gradient-to-br from-neutral-900 to-neutral-950 border border-white/5 rounded-[3rem]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <Landmark className="w-8 h-8 text-cyan-400" />
                Public Infrastructure Alignment
              </h2>
              <p className="text-neutral-400 leading-relaxed mb-8">
                 The platform cross-references future Bale Robe city planning maps with current land suitability. Invest where the city is moving, not where it has been.
              </p>
              <div className="space-y-4">
                 <div className="flex items-center gap-4 text-neutral-300">
                    <Building2 className="w-5 h-5 text-cyan-500" />
                    Proposed Institutional Zones: Araddaa Miccaa
                 </div>
                 <div className="flex items-center gap-4 text-neutral-300">
                    <MapPin className="w-5 h-5 text-cyan-500" />
                    New Transport Corridor: Odaa Roobee - Hawushhoo
                 </div>
              </div>
           </div>
           <div className="bg-neutral-950 p-8 rounded-3xl border border-white/5">
              <div className="flex items-center gap-2 mb-8">
                 <TrendingUp className="w-5 h-5 text-cyan-500" />
                 <h4 className="font-bold">Market Momentum Index</h4>
              </div>
              <div className="space-y-8">
                 <div className="relative h-2 w-full bg-neutral-800 rounded-full overflow-hidden">
                    <div className="absolute inset-y-0 left-0 bg-cyan-500 w-[72%]" />
                 </div>
                 <div className="flex justify-between text-xs text-neutral-500">
                    <span>Low Demand</span>
                    <span className="text-cyan-400 font-bold">Current Phase: Expansion</span>
                    <span>Saturation</span>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default InvestmentOpportunity;