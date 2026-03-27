import React, { useState } from 'react';
import { 
  Layers, 
  Map as MapIcon, 
  Info, 
  Maximize2, 
  MousePointer2, 
  Search,
  ChevronRight,
  BarChart3,
  X,
  Navigation,
  ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import MapContainer from '../components/map/MapContainer';
import { landCoverTypes } from '../data/mockGisData';

const MapExplorer: React.FC = () => {
  const [selectedKebele, setSelectedKebele] = useState<any>(null);
  const [activeLayers, setActiveLayers] = useState<string[]>(['Satellite', 'Kebele Boundaries']);

  const handleKebeleClick = (data: any) => {
    setSelectedKebele(data);
  };

  return (
    <div className="pt-20 h-screen flex flex-col overflow-hidden bg-neutral-950">
      <div className="flex-1 flex relative">
        {/* Left Sidebar - Layer Control */}
        <aside className="w-80 h-full border-r border-white/5 bg-neutral-950 p-6 hidden lg:flex flex-col gap-8 z-20 overflow-y-auto custom-scrollbar">
          <div>
            <h3 className="text-xs font-bold text-neutral-500 uppercase tracking-[0.2em] mb-6 flex items-center gap-2">
              <Layers className="w-4 h-4" />
              Layer Controls
            </h3>
            <div className="space-y-3">
              {['Satellite', 'OpenStreetMap', 'Kebele Boundaries', 'Land Cover', 'Soil Suitability', 'Inland Waters', 'Road Network'].map((layer) => (
                <button
                  key={layer}
                  onClick={() => {
                    setActiveLayers(prev => 
                      prev.includes(layer) ? prev.filter(l => l !== layer) : [...prev, layer]
                    );
                  }}
                  className={`w-full flex items-center justify-between p-3 rounded-2xl border transition-all ${
                    activeLayers.includes(layer) 
                      ? 'bg-cyan-500/10 border-cyan-500/30 text-cyan-400' 
                      : 'bg-white/5 border-white/5 text-neutral-400 hover:bg-white/10'
                  }`}
                >
                  <span className="text-xs font-bold">{layer}</span>
                  <div className={`w-4 h-4 rounded-full border ${activeLayers.includes(layer) ? 'bg-cyan-500 border-cyan-500' : 'border-neutral-700'}`} />
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
              {landCoverTypes.map((type) => (
                <div key={type.name} className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: type.color }} />
                  <span className="text-[11px] text-neutral-400 font-medium">{type.name}</span>
                </div>
              ))}
              <div className="pt-4 border-t border-white/5">
                <div className="text-[10px] text-neutral-500 uppercase font-bold mb-2">Suitability Grade</div>
                <div className="h-2 w-full bg-gradient-to-r from-red-500 via-yellow-400 to-emerald-500 rounded-full" />
                <div className="flex justify-between mt-1 text-[10px] text-neutral-500 font-bold uppercase tracking-widest">
                  <span>Low</span>
                  <span>High</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-auto">
             <div className="p-4 bg-cyan-500/5 border border-cyan-500/10 rounded-2xl">
                <h4 className="text-xs font-bold text-cyan-500 mb-2 flex items-center gap-2">
                  <Navigation className="w-3 h-3" />
                  Spatial Reference
                </h4>
                <p className="text-[10px] text-neutral-500 leading-relaxed">
                  Coordinate System: WGS 84 / UTM zone 37N<br/>
                  Datum: D_WGS_1984<br/>
                  Resolution: 10m Sentinel-2
                </p>
             </div>
          </div>
        </aside>

        {/* Map Area */}
        <div className="flex-1 relative overflow-hidden">
          <MapContainer mode="default" />

          {/* Search Controls */}
          <div className="absolute top-6 left-6 right-6 lg:left-8 flex items-center justify-between z-20 pointer-events-none">
            <div className="relative w-full max-w-md pointer-events-auto">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-500" />
              <input 
                type="text" 
                placeholder="Search kebele or feature..." 
                className="w-full pl-12 pr-4 py-3 bg-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-2xl focus:border-cyan-500/50 outline-none transition-all text-sm shadow-2xl"
              />
            </div>
            <div className="flex gap-2 pointer-events-auto">
              <button className="p-3 bg-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                <Maximize2 className="w-5 h-5 text-neutral-400" />
              </button>
              <button className="p-3 bg-neutral-950/90 backdrop-blur-xl border border-white/10 rounded-xl hover:bg-white/10 transition-all">
                <MousePointer2 className="w-5 h-5 text-neutral-400" />
              </button>
            </div>
          </div>

          {/* Selected Feature Info Panel Overlay */}
          {/* This is handled inside MapContainer but we can also manage it here for more UI control */}
        </div>
      </div>
    </div>
  );
};

export default MapExplorer;