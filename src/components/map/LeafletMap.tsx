import React, { useState } from 'react';
import { MapContainer, TileLayer, GeoJSON, ZoomControl, LayersControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { 
  KEBELE_BOUNDARIES, 
  LAND_COVER, 
  ROAD_NETWORK, 
  RIVERS, 
  LAND_SUITABILITY,
  KebeleData
} from '@/data/mockGisData';
import { Map as MapIcon, Layers, Info } from 'lucide-react';
import KebeleInfoModal from './KebeleInfoModal';
import L from 'leaflet';

const LeafletMap = () => {
  const [selectedKebele, setSelectedKebele] = useState<KebeleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onEachKebele = (feature: any, layer: any) => {
    layer.on({
      mouseover: (e: any) => {
        const l = e.target;
        l.setStyle({
          weight: 4,
          color: '#22d3ee',
          fillOpacity: 0.5,
        });
        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          l.bringToFront();
        }
      },
      mouseout: (e: any) => {
        const l = e.target;
        l.setStyle(kebeleStyle);
      },
      click: (e: any) => {
        L.DomEvent.stopPropagation(e);
        setSelectedKebele(feature.properties as KebeleData);
        setIsModalOpen(true);
      },
    });
  };

  const kebeleStyle = {
    fillColor: '#0ea5e9',
    weight: 2,
    opacity: 1,
    color: '#334155',
    fillOpacity: 0.15,
    dashArray: '3',
  };

  const landCoverStyle = (feature: any) => ({
    fillColor: feature.properties.color || '#94a3b8',
    weight: 1,
    opacity: 0.8,
    color: '#ffffff',
    fillOpacity: 0.6,
  });

  const roadStyle = (feature: any) => {
    const colors: Record<string, string> = {
      'Primary': '#f87171',
      'Secondary': '#fb923c',
      'Residential': '#fbbf24',
      'Tracks': '#94a3b8',
      'Paths': '#cbd5e1',
      'Service': '#94a3b8'
    };
    return {
      color: colors[feature.properties.type] || '#ffffff',
      weight: feature.properties.type === 'Primary' ? 4 : 2,
      opacity: 0.8
    };
  };

  const riverStyle = {
    color: '#38bdf8',
    weight: 3,
    opacity: 0.8
  };

  const suitabilityStyle = (feature: any) => ({
    fillColor: feature.properties.color,
    weight: 1,
    opacity: 0.8,
    color: '#ffffff',
    fillOpacity: 0.5,
  });

  return (
    <div className="relative h-[calc(100vh-64px)] w-full bg-slate-900">
      <MapContainer
        center={[7.1264, 40.0016]}
        zoom={13}
        zoomControl={false}
        className="h-full w-full z-0"
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="Satellite Hybrid">
            <TileLayer
              attribution='&copy; ESRI World Imagery'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          
          <LayersControl.BaseLayer name="Dark Mode">
            <TileLayer
              attribution='&copy; CARTO'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          </LayersControl.BaseLayer>

          <LayersControl.Overlay checked name="Kebele Boundaries">
            <GeoJSON
              data={KEBELE_BOUNDARIES as any}
              style={kebeleStyle}
              onEachFeature={onEachKebele}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Land Cover Classification">
            <GeoJSON
              data={LAND_COVER as any}
              style={landCoverStyle}
              onEachFeature={(feature, layer) => {
                layer.bindPopup(`Type: ${feature.properties.landType}<br/>Area: ${feature.properties.area} ha`);
              }}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Road Network">
            <GeoJSON
              data={ROAD_NETWORK as any}
              style={roadStyle}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Rivers & Streams">
            <GeoJSON
              data={RIVERS as any}
              style={riverStyle}
            />
          </LayersControl.Overlay>

          <LayersControl.Overlay name="Land Suitability">
            <GeoJSON
              data={LAND_SUITABILITY as any}
              style={suitabilityStyle}
            />
          </LayersControl.Overlay>
        </LayersControl>

        <ZoomControl position="bottomright" />
      </MapContainer>

      {/* Floating UI Elements */}
      <div className="absolute top-6 left-6 z-[1000] flex flex-col gap-4">
        <div className="bg-slate-950/90 backdrop-blur-xl border border-white/10 p-5 rounded-3xl shadow-2xl max-w-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30">
              <MapIcon className="w-5 h-5 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-sm font-black text-white uppercase tracking-widest">GIS Explorer</h2>
              <p className="text-[10px] text-indigo-400 font-bold uppercase tracking-tighter">Bale Robe Spatial Analysis</p>
            </div>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed mb-4">
            Interactive spatial intelligence platform. Toggle layers in the top-right menu. Click on polygons for detailed analytics.
          </p>
          <div className="flex flex-wrap gap-2">
            <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold text-slate-400 uppercase">
              Resolution: 10m
            </div>
            <div className="px-2 py-1 rounded-md bg-white/5 border border-white/10 text-[9px] font-bold text-slate-400 uppercase">
              Updated: 2024
            </div>
          </div>
        </div>

        <div className="bg-slate-950/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-xl flex flex-col gap-3">
           <div className="flex items-center gap-2 mb-1">
             <Layers className="w-3 h-3 text-slate-400" />
             <span className="text-[10px] font-bold text-slate-400 uppercase">Map Legend</span>
           </div>
           <div className="grid grid-cols-2 gap-x-4 gap-y-2">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-indigo-500" />
                <span className="text-[10px] text-slate-500 font-medium">Boundary</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] text-slate-500 font-medium">Forest</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span className="text-[10px] text-slate-500 font-medium">Cropland</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                <span className="text-[10px] text-slate-500 font-medium">Water</span>
              </div>
           </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-6 z-[1000]">
        <div className="bg-slate-950/90 backdrop-blur-xl border border-white/10 p-3 rounded-2xl flex items-center gap-4 shadow-2xl">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)] anim-pulse" />
            <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">Live Intel</span>
          </div>
          <div className="h-4 w-[1px] bg-white/10" />
          <div className="flex items-center gap-2 text-[10px] text-slate-400 font-bold">
             <Info className="w-3 h-3 text-cyan-400" />
             <span>SELECT POLYGON FOR DATA</span>
          </div>
        </div>
      </div>

      {/* Dynamic Kebele Modal */}
      <KebeleInfoModal 
        kebele={selectedKebele} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </div>
  );
};

export default LeafletMap;