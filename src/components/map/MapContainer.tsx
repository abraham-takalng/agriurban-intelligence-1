import React, { useEffect, useRef, useState } from 'react';
import { 
  MapContainer as LeafletMapContainer, 
  TileLayer, 
  Marker, 
  Popup, 
  Polygon,
  useMap,
  LayersControl,
  Circle
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { kebeles, landCoverTypes, suitabilityColors } from '../../data/mockGisData';
import { Layers, Map as MapIcon, Database, MousePointer2, Info, ChevronRight, BarChart3, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Fix Leaflet icon issue
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

interface MapContainerProps {
  mode?: 'default' | 'prediction' | 'agri' | 'investment';
  predictionYear?: number;
}

// Center of Bale Robe
const center: L.LatLngExpression = [7.1278, 39.9911];

const MapContainer: React.FC<MapContainerProps> = ({ mode = 'default', predictionYear = 2025 }) => {
  const [selectedKebele, setSelectedKebele] = useState<any>(null);

  // Simulated Kebele Boundaries (Rough polygons around center)
  const generateKebelePolygons = () => {
    return kebeles.map((k, idx) => {
      const offset = 0.01;
      const baseLat = 7.12 + (idx % 4) * 0.01;
      const baseLng = 39.98 + (idx / 4) * 0.01;
      
      const polygon: L.LatLngExpression[] = [
        [baseLat, baseLng],
        [baseLat + 0.008, baseLng + 0.002],
        [baseLat + 0.006, baseLng + 0.01],
        [baseLat - 0.002, baseLng + 0.008],
      ];

      return {
        ...k,
        polygon,
        color: suitabilityColors[k.suitability as keyof typeof suitabilityColors] || '#4f46e5'
      };
    });
  };

  const kebeleFeatures = generateKebelePolygons();

  return (
    <div className="relative w-full h-full flex flex-col">
      <LeafletMapContainer 
        center={center} 
        zoom={13} 
        className="flex-grow rounded-2xl overflow-hidden border border-white/5"
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        {/* Kebele Boundaries */}
        {kebeleFeatures.map((kebele) => (
          <Polygon
            key={kebele.id}
            positions={kebele.polygon}
            pathOptions={{
              color: 'rgba(255,255,255,0.2)',
              fillColor: kebele.color,
              fillOpacity: 0.4,
              weight: 1
            }}
            eventHandlers={{
              click: () => setSelectedKebele(kebele),
              mouseover: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.7,
                  weight: 2,
                  color: 'white'
                });
              },
              mouseout: (e) => {
                const layer = e.target;
                layer.setStyle({
                  fillOpacity: 0.4,
                  weight: 1,
                  color: 'rgba(255,255,255,0.2)'
                });
              }
            }}
          >
            <Popup className="custom-popup">
              <div className="p-2">
                <h3 className="font-bold text-cyan-400 text-sm">{kebele.name}</h3>
                <p className="text-[10px] text-neutral-400 mt-1">Pop: {kebele.population.toLocaleString()}</p>
                <p className="text-[10px] text-neutral-400">Suitability: {kebele.suitability}</p>
              </div>
            </Popup>
          </Polygon>
        ))}

        {/* Highlight Markers for Major Centers */}
        {kebeles.slice(0, 5).map((k, i) => (
           <Circle 
            key={`center-${i}`} 
            center={[(kebeleFeatures[i].polygon[0] as any)[0], (kebeleFeatures[i].polygon[0] as any)[1]]} 
            radius={200}
            pathOptions={{ color: 'cyan', fillColor: 'cyan', fillOpacity: 0.1, weight: 1 }}
           />
        ))}

        <MapControls />
      </LeafletMapContainer>

      {/* Kebele Details Panel Overlay */}
      <AnimatePresence>
        {selectedKebele && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute right-6 top-6 bottom-6 w-80 md:w-96 bg-neutral-950/90 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] z-[1000] flex flex-col shadow-2xl overflow-hidden"
          >
            <div className="p-8 border-b border-white/5 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">{selectedKebele.name}</h2>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest font-bold mt-1">Administrative Sector</p>
              </div>
              <button 
                onClick={() => setSelectedKebele(null)} 
                className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/5 shadow-inner"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="flex-1 overflow-y-auto p-8 space-y-10 custom-scrollbar">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-5 rounded-3xl bg-white/5 border border-white/5 flex flex-col justify-center">
                  <div className="text-[10px] text-neutral-500 uppercase font-bold mb-1">Suitability</div>
                  <div className="text-sm font-black text-cyan-400">{selectedKebele.suitability}</div>
                </div>
                <div className="p-5 rounded-3xl bg-white/5 border border-white/5 flex flex-col justify-center">
                  <div className="text-[10px] text-neutral-500 uppercase font-bold mb-1">Population</div>
                  <div className="text-sm font-black text-white">{selectedKebele.population.toLocaleString()}</div>
                </div>
              </div>

              <div className="space-y-4">
                <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">Land Cover Profile</h4>
                <div className="space-y-4">
                  {Object.entries(selectedKebele.landCover).map(([key, value]: [string, any]) => (
                    <div key={key} className="space-y-1.5">
                      <div className="flex justify-between text-[11px] font-bold">
                        <span className="capitalize text-neutral-400">{key.replace(/([A-Z])/g, ' $1')}</span>
                        <span className="text-neutral-200">{value}%</span>
                      </div>
                      <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                        <motion.div 
                          initial={{ width: 0 }}
                          animate={{ width: `${value}%` }}
                          className={`h-full ${
                            key === 'builtUp' ? 'bg-red-500' :
                            key === 'cropLand' ? 'bg-yellow-500' :
                            key === 'vegetation' ? 'bg-emerald-500' :
                            key === 'water' ? 'bg-blue-500' : 'bg-neutral-500'
                          }`}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4 pt-4">
                <h4 className="text-[10px] font-bold text-neutral-500 uppercase tracking-[0.2em]">AI Potential Scores</h4>
                <div className="grid gap-3">
                  <ScoreWidget label="Agri-Potential" score={selectedKebele.agriculturalPotential} />
                  <ScoreWidget label="Urban Growth Index" score={selectedKebele.urbanPotential} />
                  <ScoreWidget label="Investment Attractiveness" score={selectedKebele.investmentScore} />
                </div>
              </div>

              <button className="w-full py-5 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-bold rounded-2xl hover:opacity-90 transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-3 active:scale-95">
                <BarChart3 className="w-5 h-5" />
                Generate Deep Analysis
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-4 right-4 z-[999] px-3 py-1 bg-neutral-950/80 backdrop-blur-md text-[10px] text-neutral-500 font-bold tracking-widest border border-white/5 rounded-full uppercase">
        Prototype Dev: Abraham Takalng | Bale Robe GIS
      </div>
    </div>
  );
};

const MapControls = () => {
  const map = useMap();
  return (
    <div className="absolute top-24 right-6 z-[1000] flex flex-col gap-2">
       <button 
        onClick={() => map.zoomIn()}
        className="w-10 h-10 bg-neutral-950/90 backdrop-blur-md border border-white/10 rounded-xl text-white flex items-center justify-center hover:bg-white/10 transition-all shadow-2xl"
       >
         +
       </button>
       <button 
        onClick={() => map.zoomOut()}
        className="w-10 h-10 bg-neutral-950/90 backdrop-blur-md border border-white/10 rounded-xl text-white flex items-center justify-center hover:bg-white/10 transition-all shadow-2xl"
       >
         -
       </button>
    </div>
  );
};

const ScoreWidget = ({ label, score }: { label: string, score: number }) => (
  <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center justify-between">
    <span className="text-xs font-bold text-neutral-400">{label}</span>
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-24 bg-neutral-800 rounded-full overflow-hidden">
        <div className="h-full bg-cyan-500" style={{ width: `${score}%` }} />
      </div>
      <span className="text-xs font-black text-white">{score}%</span>
    </div>
  </div>
);

export default MapContainer;