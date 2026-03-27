import React, { useState } from 'react';
import { 
  ShieldAlert, 
  Droplet, 
  Wind, 
  Flame, 
  Waves, 
  Mountain,
  ChevronRight,
  Bell,
  BarChart3,
  Play,
  Pause,
  RotateCcw,
  Layers,
  Search,
  Zap,
  PhoneCall,
  Download,
  X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { kebeles } from '../data/mockGisData';
import MapContainer from '../components/map/MapContainer';

const DisasterIntelligence: React.FC = () => {
  const [activeModule, setActiveModule] = useState<'flood' | 'drought' | 'landslide' | 'heatwave' | 'erosion'>('flood');
  const [selectedKebele, setSelectedKebele] = useState<string | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationProgress, setSimulationProgress] = useState(0);

  const modules = [
    { id: 'flood', name: 'Flood Risk', icon: Waves, color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20' },
    { id: 'drought', name: 'Drought Vulnerability', icon: Droplet, color: 'text-amber-500', bg: 'bg-amber-500/10', border: 'border-amber-500/20' },
    { id: 'landslide', name: 'Landslide Hazard', icon: Mountain, color: 'text-orange-500', bg: 'bg-orange-500/10', border: 'border-orange-500/20' },
    { id: 'heatwave', name: 'Heatwave Analysis', icon: Flame, color: 'text-red-500', bg: 'bg-red-500/10', border: 'border-red-500/20' },
    { id: 'erosion', name: 'Soil Erosion', icon: Wind, color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20' },
  ];

  const handleSimulate = () => {
    setIsSimulating(!isSimulating);
    if (!isSimulating) {
      const interval = setInterval(() => {
        setSimulationProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsSimulating(false);
            return 100;
          }
          return prev + 1;
        });
      }, 50);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-neutral-950 flex flex-col">
      {/* Module Selector */}
      <div className="bg-neutral-900/50 backdrop-blur-xl border-b border-white/5 px-6 py-4">
        <div className="max-w-7xl mx-auto flex overflow-x-auto gap-4 pb-2 custom-scrollbar">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module.id as any)}
              className={`flex items-center gap-3 px-5 py-3 rounded-2xl border transition-all whitespace-nowrap ${
                activeModule === module.id 
                  ? `${module.bg} ${module.border} ${module.color}` 
                  : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'
              }`}
            >
              <module.icon className="w-5 h-5" />
              <span className="font-bold text-sm">{module.name}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Left Sidebar: Analysis Controls */}
        <aside className="w-full lg:w-96 bg-neutral-950 border-r border-white/5 p-6 overflow-y-auto custom-scrollbar flex flex-col gap-8">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-cyan-400" />
                Module Parameters
              </h2>
              <span className="px-2 py-1 bg-red-500/10 text-red-500 text-[10px] font-bold rounded flex items-center gap-1 animate-pulse">
                <Zap className="w-3 h-3" /> LIVE DATA
              </span>
            </div>

            {activeModule === 'flood' && (
              <div className="space-y-6">
                <ParameterItem label="Rainfall Intensity" value="85mm/hr" sub="High Intensity Storm" />
                <ParameterItem label="Drainage Efficiency" value="62%" sub="Partial Clogging Detected" />
                <ParameterItem label="River Level" value="4.2m" sub="Warning: 0.8m to Spill" />
                
                <div className="pt-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-neutral-400 uppercase tracking-widest">Simulation Controls</span>
                    <button onClick={() => setSimulationProgress(0)} className="text-neutral-500 hover:text-white"><RotateCcw size={14}/></button>
                  </div>
                  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
                    <div className="flex gap-3 mb-4">
                      <button 
                        onClick={handleSimulate}
                        className="flex-1 py-2 bg-blue-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 hover:bg-blue-500 transition-all"
                      >
                        {isSimulating ? <Pause size={14}/> : <Play size={14}/>}
                        {isSimulating ? 'Pause' : 'Start Simulation'}
                      </button>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-[10px] text-neutral-500">
                        <span>Progress</span>
                        <span>{simulationProgress}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-neutral-800 rounded-full overflow-hidden">
                        <motion.div 
                          className="h-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
                          animate={{ width: `${simulationProgress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeModule === 'drought' && (
              <div className="space-y-6">
                <ParameterItem label="NDVI Index" value="0.34" sub="Sparse Vegetation" />
                <ParameterItem label="Soil Moisture" value="12%" sub="Critical Threshold" />
                <ParameterItem label="Historical Avg" value="-18%" sub="Deficit Recorded" />
                <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-2xl">
                   <p className="text-xs text-amber-500 font-medium mb-2">Vulnerability Status: HIGH</p>
                   <p className="text-[10px] text-amber-400/70">Satellite data indicates sustained vegetation stress over the last 60 days. Drought risk is elevating.</p>
                </div>
              </div>
            )}

            {activeModule === 'landslide' && (
              <div className="space-y-6">
                <ParameterItem label="Max Slope" value="34\u00b0" sub="Steep Terrain" />
                <ParameterItem label="Soil Type" value="Vertisols" sub="Unstable when saturated" />
                <ParameterItem label="Risk Zones" value="12 Points" sub="Detected in Northern Kebeles" />
              </div>
            )}
            
            {/* Common Kebele Drill-down */}
            <div className="mt-10">
              <h3 className="text-xs font-semibold text-neutral-500 uppercase tracking-widest mb-4">Kebele Drill-down</h3>
              <div className="space-y-2">
                {kebeles.slice(0, 5).map(k => (
                  <button 
                    key={k.id}
                    onClick={() => setSelectedKebele(k.name)}
                    className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between ${
                      selectedKebele === k.name ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'
                    }`}
                  >
                    <span className="text-sm">{k.name}</span>
                    <ChevronRight size={14} />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-auto p-4 bg-red-500/10 border border-red-500/20 rounded-2xl">
            <div className="flex items-center gap-3 mb-2">
              <Bell className="w-4 h-4 text-red-500" />
              <span className="text-sm font-bold text-red-500 uppercase tracking-tighter">Hazard Alert System</span>
            </div>
            <p className="text-xs text-neutral-400 mb-4">Receive real-time email/SMS alerts for your specific zone.</p>
            <button className="w-full py-2 bg-red-500 text-white rounded-lg text-[11px] font-bold hover:bg-red-600 transition-colors uppercase tracking-widest">
              Setup Notifications
            </button>
          </div>
        </aside>

        {/* Map View */}
        <div className="flex-1 relative bg-neutral-900">
          <MapContainer mode="default" />
          
          {/* Dashboard Overlay Widgets */}
          <div className="absolute top-6 left-6 z-20 pointer-events-none">
             <div className="bg-neutral-950/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 w-64 pointer-events-auto">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Risk Classification</h3>
                  <Layers className="w-3 h-3 text-cyan-500" />
                </div>
                <div className="space-y-2">
                   <RiskLegend color="bg-red-600" label="Extreme" value="4% area" />
                   <RiskLegend color="bg-orange-500" label="High" value="12% area" />
                   <RiskLegend color="bg-yellow-400" label="Moderate" value="35% area" />
                   <RiskLegend color="bg-emerald-500" label="Low" value="49% area" />
                </div>
             </div>
          </div>

          <div className="absolute bottom-6 left-6 z-20 pointer-events-auto">
             <div className="flex gap-3">
                <button className="px-4 py-2 bg-neutral-950/80 backdrop-blur-md border border-white/10 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-white/5 transition-all">
                  <Download size={14} />
                  Export Hazard Map
                </button>
                <button className="px-4 py-2 bg-neutral-950/80 backdrop-blur-md border border-white/10 rounded-xl text-xs font-bold flex items-center gap-2 hover:bg-white/5 transition-all">
                  <PhoneCall size={14} />
                  Emergency Contacts
                </button>
             </div>
          </div>

          {/* Kebele Mini Report Modal */}
          <AnimatePresence>
            {selectedKebele && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full max-w-md p-6"
              >
                <div className="bg-neutral-950/95 backdrop-blur-2xl border border-white/10 rounded-[2rem] shadow-2xl p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">{selectedKebele}</h2>
                    <button onClick={() => setSelectedKebele(null)} className="p-2 hover:bg-white/10 rounded-full">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-white/5 rounded-2xl">
                        <p className="text-[10px] text-neutral-500 uppercase font-bold mb-1">Risk Level</p>
                        <p className="text-lg font-black text-orange-500">HIGH</p>
                      </div>
                      <div className="p-4 bg-white/5 rounded-2xl">
                        <p className="text-[10px] text-neutral-500 uppercase font-bold mb-1">Pop. At Risk</p>
                        <p className="text-lg font-black text-white">3,420</p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">Mitigation Status</h4>
                      <div className="flex items-center gap-3 p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
                        <ShieldAlert className="w-5 h-5 shrink-0" />
                        <p className="text-xs leading-relaxed">Infrastructure reinforcement recommended along the main drainage corridor.</p>
                      </div>
                    </div>

                    <button className="w-full py-4 bg-cyan-600 text-white font-bold rounded-2xl hover:bg-cyan-500 transition-all">
                      View Detailed PDF Report
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

const ParameterItem = ({ label, value, sub }: { label: string, value: string, sub: string }) => (
  <div className="p-4 bg-white/5 border border-white/5 rounded-2xl">
    <div className="flex justify-between items-center mb-1">
      <span className="text-xs text-neutral-400">{label}</span>
      <span className="text-sm font-bold text-white">{value}</span>
    </div>
    <div className="text-[10px] text-neutral-500 italic">{sub}</div>
  </div>
);

const RiskLegend = ({ color, label, value }: { color: string, label: string, value: string }) => (
  <div className="flex items-center justify-between text-xs">
    <div className="flex items-center gap-2">
      <div className={`w-3 h-3 rounded-full ${color}`} />
      <span className="text-neutral-300">{label}</span>
    </div>
    <span className="text-neutral-500 font-medium">{value}</span>
  </div>
);

export default DisasterIntelligence;