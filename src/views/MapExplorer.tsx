import React, { useState } from 'react';
import { 
  Layers, 
  Map as MapIcon, 
  Maximize2, 
  MousePointer2, 
  Search,
  ChevronRight,
  BarChart3,
  X,
  Navigation,
  ExternalLink,
  Users,
  Sprout,
  ShieldCheck,
  Zap,
  Droplets,
  Building2,
  TrendingUp,
  AlertTriangle,
  Lightbulb
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MapContainer from '../components/map/MapContainer';
import { landCoverTypes } from '../data/mockGisData';
import { getRiskColor } from '../lib/constants';

const MapExplorer: React.FC = () => {
  const [selectedKebele, setSelectedKebele] = useState<any>(null);
  const [activeLayers, setActiveLayers] = useState<string[]>(['Satellite', 'Kebele Boundaries', 'Road Network', 'Inland Waters']);

  const handleKebeleClick = (data: any) => {
    setSelectedKebele(data);
  };

  const toggleLayer = (layer: string) => {
    setActiveLayers(prev => 
      prev.includes(layer) ? prev.filter(l => l !== layer) : [...prev, layer]
    );
  };

  const ScoreBadge = ({ label, score, icon: Icon, colorClass }: { label: string, score: number, icon: any, colorClass: string }) => (
    <div className="p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <Icon className={`w-4 h-4 ${colorClass}`} />
        <span className={`text-xs font-black ${colorClass}`}>{Math.round(score)}%</span>
      </div>
      <p className="text-[10px] text-neutral-500 font-bold uppercase tracking-wider">{label}</p>
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden mt-1">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${score}%` }}
          className={`h-full ${colorClass.replace('text-', 'bg-')}`}
        />
      </div>
    </div>
  );

  const RiskBadge = ({ label, level, icon: Icon }: { label: string, level: string, icon: any }) => {
    const color = getRiskColor(level);
    return (
      <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
        <div className="flex items-center gap-2">
          <Icon className="w-4 h-4 text-neutral-400" />
          <span className="text-xs text-neutral-400 font-medium">{label}</span>
        </div>
        <span 
          className="text-[10px] font-black px-2 py-0.5 rounded-lg border uppercase tracking-widest"
          style={{ 
            backgroundColor: `${color}20`, 
            color: color, 
            borderColor: `${color}40` 
          }}
        >
          {level}
        </span>
      </div>
    );
  };

  return (
    <div className="pt-20 h-screen flex flex-col overflow-hidden bg-neutral-950 text-white font-sans">
      <div className="flex-1 flex relative">
        {/* Left Sidebar - Layer Control */}
        <aside className="w-80 h-full border-r border-white/5 bg-neutral-950 p-6 hidden lg:flex flex-col gap-8 z-20 overflow-y-auto custom-scrollbar">
          <div>
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Base & Standard Layers
            </h3>
            <div className="space-y-2">
              {['Satellite', 'OpenStreetMap', 'Kebele Boundaries', 'Land Cover', 'Soil Suitability', 'Inland Waters', 'Road Network'].map((layer) => (
                <button
                  key={layer}
                  onClick={() => toggleLayer(layer)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                    activeLayers.includes(layer) 
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                      : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider">{layer}</span>
                  <div className={`w-2 h-2 rounded-full transition-colors ${activeLayers.includes(layer) ? 'bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.5)]' : 'bg-neutral-800'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-500" />
              Advanced GIS Analysis
            </h3>
            <div className="space-y-2">
              {[
                { name: 'Agriculture Suitability', color: 'text-emerald-400' },
                { name: 'Urban Growth Potential', color: 'text-blue-400' },
                { name: 'Flood Risk', color: 'text-red-400' },
                { name: 'Drought Risk', color: 'text-orange-400' }
              ].map((layer) => (
                <button
                  key={layer.name}
                  onClick={() => toggleLayer(layer.name)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border transition-all ${
                    activeLayers.includes(layer.name) 
                      ? 'bg-white/10 border-white/20 text-white' 
                      : 'bg-white/5 border-white/5 text-neutral-500 hover:bg-white/10'
                  }`}
                >
                  <span className="text-[11px] font-bold uppercase tracking-wider">{layer.name}</span>
                  <div className={`w-2 h-2 rounded-full transition-colors ${activeLayers.includes(layer.name) ? 'bg-white shadow-[0_0_8px_rgba(255,255,255,0.5)]' : 'bg-neutral-800'}`} />
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <MapIcon className="w-4 h-4" />
              Visual Legend
            </h3>
            <div className="space-y-4">
              {activeLayers.includes('Land Cover') && (
                <div className="space-y-2 mb-4">
                   <div className="text-[10px] text-neutral-500 uppercase font-bold mb-2">Land Cover</div>
                   {landCoverTypes.map((type) => (
                    <div key={type.type} className="flex items-center gap-3">
                      <div className="w-3 h-3 rounded-full shadow-sm" style={{ backgroundColor: type.color }} />
                      <span className="text-[11px] text-neutral-400 font-medium">{type.type}</span>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="pt-4 border-t border-white/5">
                <div className="text-[10px] text-neutral-500 uppercase font-bold mb-2">Suitability Grade</div>
                <div className="h-1.5 w-full bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-500 rounded-full" />
                <div className="flex justify-between mt-1 text-[9px] text-neutral-500 font-bold uppercase tracking-widest">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto">
             <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl">
                <h4 className="text-[10px] font-bold text-cyan-500 mb-2 flex items-center gap-2 uppercase tracking-widest">
                  <Navigation className="w-3 h-3" />
                  Spatial Reference
                </h4>
                <p className="text-[9px] text-neutral-500 leading-relaxed uppercase tracking-wider">
                  System: WGS 84 • Zone 37N<br/>
                  Location: Bale Robe, Ethiopia
                </p>
             </div>
          </div>
        </aside>

        {/* Map Area */}
        <div className="flex-1 relative overflow-hidden">
          <MapContainer 
            mode="default" 
            activeLayers={activeLayers} 
            onFeatureClick={handleKebeleClick}
            selectedKebele={selectedKebele}
          />

          {/* Search Controls */}
          <div className="absolute top-6 left-6 right-6 lg:left-8 flex items-center justify-between z-20 pointer-events-none">
            <div className="relative w-full max-w-md pointer-events-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Search Kebele (e.g. Handhuraa Roobee)..." 
                className="w-full pl-12 pr-4 py-3.5 bg-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-2xl focus:border-cyan-500/50 outline-none transition-all text-sm shadow-2xl"
              />
            </div>
          </div>

          {/* Selected Feature Info Panel Overlay */}
          <AnimatePresence>
            {selectedKebele && (
              <motion.div
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 100 }}
                className="absolute top-6 right-6 bottom-6 w-[420px] z-20"
              >
                <div className="h-full bg-neutral-950/95 backdrop-blur-3xl border border-white/10 rounded-[32px] shadow-2xl flex flex-col overflow-hidden">
                  <div className="p-8 border-b border-white/10 relative">
                    <button 
                      onClick={() => setSelectedKebele(null)}
                      className="absolute top-8 right-8 p-2 bg-white/5 hover:bg-white/10 rounded-xl transition-all"
                    >
                      <X className="w-5 h-5 text-neutral-400" />
                    </button>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-400 text-[9px] font-black rounded uppercase tracking-widest">Selected Region</span>
                        <span className="text-neutral-600 text-[10px]">•</span>
                        <span className="text-neutral-500 text-[10px] uppercase font-bold">Bale, Ethiopia</span>
                      </div>
                      <h2 className="text-3xl font-black text-white">{selectedKebele.name}</h2>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                    {/* Primary GIS Scores */}
                    <div className="grid grid-cols-2 gap-4">
                      <ScoreBadge 
                        label="Agri Suitability" 
                        score={selectedKebele.agriSuitabilityScore} 
                        icon={Sprout} 
                        colorClass="text-emerald-400" 
                      />
                      <ScoreBadge 
                        label="Growth Potential" 
                        score={selectedKebele.urbanGrowthPotential} 
                        icon={TrendingUp} 
                        colorClass="text-blue-400" 
                      />
                      <div className="col-span-2">
                        <ScoreBadge 
                          label="General Land Suitability" 
                          score={selectedKebele.suitabilityScore} 
                          icon={ShieldCheck} 
                          colorClass="text-cyan-400" 
                        />
                      </div>
                    </div>

                    {/* Risk Analysis Section */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] flex items-center gap-2">
                        <AlertTriangle className="w-3.5 h-3.5 text-orange-500" />
                        Risk Exposure Levels
                      </h4>
                      <div className="grid grid-cols-1 gap-3">
                        <RiskBadge label="Flood Risk" level={selectedKebele.floodRiskLevel} icon={Droplets} />
                        <RiskBadge label="Drought Risk" level={selectedKebele.droughtRiskLevel} icon={Zap} />
                      </div>
                    </div>

                    {/* Recommendations Section */}
                    <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-neutral-500 uppercase tracking-[0.2em] flex items-center gap-2">
                        <Lightbulb className="w-3.5 h-3.5 text-yellow-500" />
                        Actionable Recommendations
                      </h4>
                      <div className="space-y-3">
                        {selectedKebele.recommendations?.map((rec: string, i: number) => (
                          <div key={i} className="p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl flex gap-3">
                            <div className="mt-1 w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                            <p className="text-xs text-neutral-400 leading-relaxed font-medium">
                              {rec}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Demographics & Metadata */}
                    <div className="pt-6 border-t border-white/5 space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Users className="w-4 h-4 text-neutral-500" />
                          <span className="text-[11px] text-neutral-500 font-bold uppercase">Population</span>
                        </div>
                        <span className="text-sm font-bold">{selectedKebele.population.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <Building2 className="w-4 h-4 text-neutral-500" />
                          <span className="text-[11px] text-neutral-500 font-bold uppercase">Main Crop</span>
                        </div>
                        <span className="text-sm font-bold text-neutral-300">{selectedKebele.mainCrop}</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-8 border-t border-white/10 bg-white/[0.02]">
                    <button className="w-full py-4 bg-white text-neutral-950 font-black rounded-2xl transition-all flex items-center justify-center gap-3 hover:bg-neutral-200 active:scale-[0.98]">
                      <ExternalLink className="w-5 h-5" />
                      DOWNLOAD GIS DOSSIER
                    </button>
                    <p className="text-[9px] text-center text-neutral-600 mt-4 font-bold uppercase tracking-widest">
                      PDF • GeoJSON • Shapefile Included
                    </p>
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

export default MapExplorer;