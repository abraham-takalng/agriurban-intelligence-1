import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { KEBELE_BOUNDARIES } from '@/data/mockGisData';
import { Map as MapIcon, Maximize2 } from 'lucide-react';
import { motion } from 'framer-motion';

const LeafletMap = () => {
  const [selectedKebele, setSelectedKebele] = useState<any>(null);

  const onEachKebele = (kebele: any, layer: any) => {
    layer.on({
      mouseover: (e: any) => {
        const l = e.target;
        l.setStyle({
          weight: 3,
          color: '#22d3ee',
          fillOpacity: 0.6,
        });
      },
      mouseout: (e: any) => {
        const l = e.target;
        l.setStyle({
          weight: 1,
          color: '#64748b',
          fillOpacity: 0.2,
        });
      },
      click: (e: any) => {
        setSelectedKebele(kebele.properties);
      },
    });
  };

  const kebeleStyle = {
    fillColor: '#0ea5e9',
    weight: 1,
    opacity: 1,
    color: '#64748b',
    fillOpacity: 0.2,
  };

  return (
    <div className="relative h-[calc(100vh-64px)] w-full bg-slate-900">
      <MapContainer
        center={[9.0227, 38.7460]} // Addis Ababa coordinates
        zoom={12}
        zoomControl={false}
        className="h-full w-full z-0"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
        />
        
        <GeoJSON
          data={KEBELE_BOUNDARIES as any}
          style={kebeleStyle}
          onEachFeature={onEachKebele}
        />

        <ZoomControl position="bottomright" />
      </MapContainer>

      {/* Floating UI Panels */}
      <div className="absolute top-6 left-6 z-10 flex flex-col gap-4">
        <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 p-4 rounded-2xl shadow-2xl max-w-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center">
              <MapIcon className="w-4 h-4 text-cyan-400" />
            </div>
            <h2 className="text-sm font-bold text-white uppercase tracking-wider">Map Explorer</h2>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            Interactive GIS interface. Click on a Kebele boundary to view detailed agricultural and disaster risk data.
          </p>
        </div>

        {selectedKebele && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="bg-slate-950/90 backdrop-blur-md border border-slate-800 p-6 rounded-3xl shadow-2xl w-80"
          >
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-cyan-400">{selectedKebele.name}</h3>
              <button 
                onClick={() => setSelectedKebele(null)}
                className="p-1 hover:bg-slate-800 rounded-lg text-slate-500"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">POPULATION</p>
                  <p className="text-sm font-bold">{selectedKebele.population.toLocaleString()}</p>
                </div>
                <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                  <p className="text-[10px] text-slate-500 font-bold mb-1 uppercase">SUITABILITY</p>
                  <p className="text-sm font-bold text-emerald-400">{selectedKebele.suitabilityScore}%</p>
                </div>
              </div>
              
              <div className="p-3 bg-slate-900 rounded-xl border border-slate-800">
                <p className="text-[10px] text-slate-500 font-bold mb-2 uppercase">Risk Profile</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span>Flood Risk</span>
                    <span className="text-red-400 font-bold">High</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded-full">
                    <div className="h-full bg-red-500 rounded-full" style={{ width: '85%' }} />
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span>Drought</span>
                    <span className="text-amber-400 font-bold">Moderate</span>
                  </div>
                  <div className="w-full h-1 bg-slate-800 rounded-full">
                    <div className="h-full bg-amber-400 rounded-full" style={{ width: '45%' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      <div className="absolute bottom-6 left-6 z-10">
        <div className="bg-slate-950/80 backdrop-blur-md border border-slate-800 p-3 rounded-xl flex gap-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <span className="text-[10px] font-bold text-slate-400">HIGH RISK</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span className="text-[10px] font-bold text-slate-400">MODERATE</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span className="text-[10px] font-bold text-slate-400">LOW RISK</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeafletMap;