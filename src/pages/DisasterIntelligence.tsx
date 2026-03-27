import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  CloudRain, Zap, Layers, Thermometer, Wind, 
  Activity, Map as MapIcon, ChevronRight, AlertCircle,
  BarChart3, Settings2, Play, Pause, RotateCcw
} from 'lucide-react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, BarChart, Bar 
} from 'recharts';
import { toast } from 'sonner';

const modules = [
  { id: 'flood', name: 'Flood Risk', icon: CloudRain, color: 'text-blue-400', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bcb3983b-ae83-4059-93ff-97cb2bb10dc2/flood-risk-dashboard-cf4938b6-1773694660983.webp' },
  { id: 'drought', name: 'Drought Vulnerability', icon: Zap, color: 'text-amber-400', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bcb3983b-ae83-4059-93ff-97cb2bb10dc2/drought-vulnerability-map-b70f9d15-1773694660744.webp' },
  { id: 'landslide', name: 'Landslide Hazard', icon: Layers, color: 'text-emerald-400', image: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/bcb3983b-ae83-4059-93ff-97cb2bb10dc2/landslide-hazard-map-89a43c31-1773694655241.webp' },
  { id: 'heatwave', name: 'Heatwave Analysis', icon: Thermometer, color: 'text-orange-400', image: 'https://images.unsplash.com/photo-1563630423918-b58f07336ac9?auto=format&fit=crop&q=80&w=1200' },
  { id: 'erosion', name: 'Soil Erosion', icon: Wind, color: 'text-stone-400', image: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=1200' },
];

const mockRainfallData = [
  { time: '00:00', intensity: 2.5 },
  { time: '04:00', intensity: 5.2 },
  { time: '08:00', intensity: 12.8 },
  { time: '12:00', intensity: 45.3 },
  { time: '16:00', intensity: 28.1 },
  { time: '20:00', intensity: 15.6 },
];

const DisasterIntelligence = () => {
  const [activeModule, setActiveModule] = useState('flood');
  const [isSimulating, setIsSimulating] = useState(false);
  const [kebeleSearch, setKebeleSearch] = useState('');

  const currentModule = modules.find(m => m.id === activeModule)!;

  const toggleSimulation = () => {
    setIsSimulating(!isSimulating);
    if (!isSimulating) {
      toast.info(`Starting ${currentModule.name} simulation...`);
    }
  };

  return (
    <div className="pt-20 min-h-screen bg-slate-950 flex flex-col">
      {/* Top Controls */}
      <div className="bg-slate-900 border-b border-slate-800 p-4 sticky top-16 z-30">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 w-full md:w-auto">
            {modules.map((m) => (
              <button
                key={m.id}
                onClick={() => setActiveModule(m.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all whitespace-nowrap ${
                  activeModule === m.id 
                    ? 'bg-cyan-500/10 border-cyan-500/50 text-cyan-400' 
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <m.icon className="w-4 h-4" />
                <span className="text-sm font-medium">{m.name}</span>
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <input
                type="text"
                placeholder="Search Kebele..."
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-cyan-500"
                value={kebeleSearch}
                onChange={(e) => setKebeleSearch(e.target.value)}
              />
            </div>
            <button className="p-2 bg-slate-950 border border-slate-800 rounded-lg hover:border-cyan-500 transition-colors">
              <Settings2 className="w-5 h-5 text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 overflow-hidden">
        {/* Map Visualization */}
        <div className="lg:col-span-3 relative h-[400px] lg:h-auto bg-slate-900">
          <div className="absolute inset-0">
            <img 
              src={currentModule.image} 
              alt={currentModule.name}
              className="w-full h-full object-cover opacity-80"
            />
            {/* Simulation Overlay Effect */}
            <AnimatePresence>
              {isSimulating && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="absolute inset-0 bg-cyan-500/10 pointer-events-none mix-blend-overlay"
                />
              )}
            </AnimatePresence>
          </div>

          {/* Map UI Overlays */}
          <div className="absolute top-6 left-6 flex flex-col gap-4">
            <div className="bg-slate-950/90 backdrop-blur-md border border-slate-800 p-4 rounded-2xl w-64">
              <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Risk Legend</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs">Extreme Risk</span>
                  <div className="w-12 h-2 rounded bg-red-600" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">High Risk</span>
                  <div className="w-12 h-2 rounded bg-orange-500" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Moderate Risk</span>
                  <div className="w-12 h-2 rounded bg-amber-400" />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs">Low Risk</span>
                  <div className="w-12 h-2 rounded bg-emerald-500" />
                </div>
              </div>
            </div>

            <div className="bg-slate-950/90 backdrop-blur-md border border-slate-800 p-4 rounded-2xl">
              <div className="flex items-center gap-4">
                <button 
                  onClick={toggleSimulation}
                  className="w-10 h-10 rounded-full bg-cyan-500 flex items-center justify-center text-slate-950 hover:bg-cyan-400 transition-colors"
                >
                  {isSimulating ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current" />}
                </button>
                <div>
                  <p className="text-xs font-bold text-slate-400">SIMULATION</p>
                  <p className="text-sm font-bold">{isSimulating ? 'Running Model...' : 'Ready to Simulate'}</p>
                </div>
                <button 
                  onClick={() => setIsSimulating(false)}
                  className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:bg-slate-700"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-6 right-6">
            <div className="bg-slate-950/90 backdrop-blur-md border border-slate-800 p-4 rounded-2xl flex flex-wrap gap-8">
               <div className="flex items-center gap-3">
                  <Activity className="w-5 h-5 text-cyan-400" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Precipitation</p>
                    <p className="text-sm font-bold">12.4 mm/hr</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <Wind className="w-5 h-5 text-amber-400" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Soil Moisture</p>
                    <p className="text-sm font-bold">64.2%</p>
                  </div>
               </div>
               <div className="flex items-center gap-3">
                  <Layers className="w-5 h-5 text-emerald-400" />
                  <div>
                    <p className="text-[10px] text-slate-500 font-bold uppercase">Drainage Cap.</p>
                    <p className="text-sm font-bold">85%</p>
                  </div>
               </div>
            </div>
          </div>
        </div>

        {/* Sidebar Analytics */}
        <div className="bg-slate-950 border-l border-slate-800 p-6 overflow-y-auto max-h-[calc(100vh-140px)]">
          <div className="mb-8">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-cyan-400" />
              Risk Analysis
            </h3>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockRainfallData}>
                  <defs>
                    <linearGradient id="colorIntensity" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22d3ee" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="time" stroke="#64748b" fontSize={10} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b' }}
                    itemStyle={{ color: '#22d3ee' }}
                  />
                  <Area type="monotone" dataKey="intensity" stroke="#22d3ee" fillOpacity={1} fill="url(#colorIntensity)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
            <p className="text-xs text-center text-slate-500 mt-2">Rainfall Intensity (mm) Over 24h</p>
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-4">Drill-down: District 4</h4>
              <div className="space-y-3">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Elevation Risk</span>
                    <span className="text-xs text-red-400">High</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-red-500 h-full w-[85%]" />
                  </div>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm">Slope Stability</span>
                    <span className="text-xs text-amber-400">Moderate</span>
                  </div>
                  <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-amber-400 h-full w-[45%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-cyan-500/10 border border-cyan-500/20 p-4 rounded-2xl">
              <h4 className="flex items-center gap-2 text-cyan-400 font-bold text-sm mb-2">
                <AlertCircle className="w-4 h-4" />
                Notification System
              </h4>
              <p className="text-xs text-slate-400 mb-4">Automated real-time alerts active for identified high-risk zones.</p>
              <button className="w-full py-2 bg-cyan-500 text-slate-950 text-xs font-bold rounded-lg hover:bg-cyan-400 transition-colors">
                Configure Alert Triggers
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterIntelligence;