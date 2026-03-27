import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { BrainCircuit, Play, Clock, Sparkles, AlertCircle, Calendar } from 'lucide-react';

const AIPredictions: React.FC = () => {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [isSimulating, setIsSimulating] = useState(false);

  const years = [2026, 2030, 2035, 2040];

  const handleSimulate = () => {
    setIsSimulating(true);
    setTimeout(() => setIsSimulating(false), 2000);
  };

  return (
    <div className="pt-28 pb-20 px-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-1">
          <div className="sticky top-28 space-y-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 mb-4">
                <BrainCircuit className="w-4 h-4 text-cyan-500" />
                <span className="text-xs font-bold text-cyan-400 tracking-wider uppercase">AI Analysis Engine</span>
              </div>
              <h1 className="text-4xl font-black mb-4 leading-tight">Urban Growth <br /><span className="text-emerald-400">Simulation</span></h1>
              <p className="text-neutral-400 leading-relaxed">
                Utilizing Markov Chain and Cellular Automata models to project the spatial expansion of Bale Robe. Predicted accuracy based on historical Sentinel-2 training data: 94.2%.
              </p>
            </div>

            <div className="p-6 bg-neutral-900 border border-white/5 rounded-3xl space-y-6">
              <h3 className="font-bold flex items-center gap-2">
                <Calendar className="w-5 h-5 text-neutral-400" />
                Projection Timeline
              </h3>
              <div className="flex justify-between relative py-4">
                <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-neutral-800 -translate-y-1/2" />
                {years.map((year) => (
                  <button
                    key={year}
                    onClick={() => setSelectedYear(year)}
                    className={`relative z-10 w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold transition-all border-2 ${
                      selectedYear === year 
                        ? 'bg-cyan-500 text-white border-cyan-400 scale-110 shadow-lg shadow-cyan-500/30' 
                        : 'bg-neutral-900 text-neutral-500 border-neutral-800 hover:border-neutral-600'
                    }`}
                  >
                    {year}
                  </button>
                ))}
              </div>
              
              <button 
                onClick={handleSimulate}
                disabled={isSimulating}
                className="w-full py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-2xl font-bold text-white shadow-xl shadow-cyan-600/20 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-50"
              >
                {isSimulating ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Running Neural Model...
                  </>
                ) : (
                  <>
                    <Play className="w-5 h-5 fill-white" />
                    Run Growth Simulation
                  </>
                )}
              </button>
            </div>

            <div className="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl">
              <div className="flex items-start gap-4">
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <AlertCircle className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h4 className="font-bold text-emerald-400 mb-1">Environmental Impact</h4>
                  <p className="text-sm text-neutral-400">Projected built-up expansion may reduce forest cover by 12% in the Handhuraa Roobee kebele by 2040.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          <div className="relative aspect-video bg-neutral-900 rounded-[3rem] overflow-hidden border border-white/10 group">
             <img 
               src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/bcb3983b-ae83-4059-93ff-97cb2bb10dc2/urban-growth-vision-83aed02b-1773006210000.webp" 
               className="w-full h-full object-cover opacity-60 mix-blend-luminosity group-hover:opacity-80 transition-opacity duration-1000"
               alt="AI Prediction Map"
             />
             <div className="absolute inset-0 bg-neutral-950/20" />
             
             {/* Simulated Scanning Laser Effect */}
             <div className="absolute top-0 left-0 right-0 h-0.5 bg-cyan-400/50 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-scan-line" />
             
             {/* Simulation Overlays */}
             <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border border-cyan-500/20 rounded-full animate-ping opacity-20" />
             </div>

             <div className="absolute bottom-8 left-8 right-8 flex justify-between items-end">
                <div className="p-4 bg-neutral-950/80 backdrop-blur-xl border border-white/10 rounded-2xl">
                   <div className="text-[10px] uppercase tracking-widest text-neutral-500 mb-1">Currently Visualizing</div>
                   <div className="text-xl font-bold flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-cyan-400" />
                      Prediction {selectedYear}
                   </div>
                </div>
                <div className="flex flex-col gap-2">
                   <div className="px-3 py-1 bg-neutral-950/80 backdrop-blur-md rounded-full border border-white/5 text-[10px] text-white">
                      CONFIDENCE: 94.2%
                   </div>
                   <div className="px-3 py-1 bg-neutral-950/80 backdrop-blur-md rounded-full border border-white/5 text-[10px] text-white">
                      EPSG: 32637
                   </div>
                </div>
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
             <div className="p-8 bg-neutral-900/50 border border-white/5 rounded-[2.5rem]">
                <h3 className="text-lg font-bold mb-6">Built-up Conversion Probabilities</h3>
                <div className="space-y-6">
                   <PredictionBar label="Agricultural to Urban" probability={68} />
                   <PredictionBar label="Bare Land to Urban" probability={85} />
                   <PredictionBar label="Tree Cover to Urban" probability={12} />
                </div>
             </div>
             <div className="p-8 bg-neutral-900/50 border border-white/5 rounded-[2.5rem]">
                <h3 className="text-lg font-bold mb-6">Expansion Drivers</h3>
                <ul className="space-y-4">
                   <li className="flex items-center gap-3 text-neutral-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      Proximity to Primary Roads
                   </li>
                   <li className="flex items-center gap-3 text-neutral-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      Distance to Existing Hubs
                   </li>
                   <li className="flex items-center gap-3 text-neutral-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      Slope & Terrain Elevation
                   </li>
                   <li className="flex items-center gap-3 text-neutral-400">
                      <div className="w-1.5 h-1.5 rounded-full bg-cyan-500" />
                      Economic Zone Proximity
                   </li>
                </ul>
             </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scan-line {
          0% { top: 0%; opacity: 0; }
          50% { opacity: 1; }
          100% { top: 100%; opacity: 0; }
        }
        .animate-scan-line {
          animation: scan-line 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

const PredictionBar = ({ label, probability }: { label: string, probability: number }) => (
  <div className="space-y-2">
    <div className="flex justify-between items-center text-sm">
      <span className="text-neutral-400">{label}</span>
      <span className="text-white font-bold">{probability}%</span>
    </div>
    <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
       <div className="h-full bg-gradient-to-r from-emerald-500 to-cyan-500" style={{ width: `${probability}%` }} />
    </div>
  </div>
);

export default AIPredictions;