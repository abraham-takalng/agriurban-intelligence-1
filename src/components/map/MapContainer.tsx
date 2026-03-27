import React, { useState } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMap, Marker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { kebeles, KebeleData } from '../../data/mockGisData';
import { getRiskColor } from '../../lib/constants';

// Fix for default marker icons in Leaflet + React
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

let DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

export interface MapProps {
  selectedKebele?: KebeleData | null;
  riskType?: 'flood' | 'drought' | 'landslide' | 'heatwave' | 'suitability';
  floodSimLevel?: number; // 0 to 10
  mode?: 'agri' | 'prediction' | 'investment' | 'default';
  predictionYear?: number;
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const MapView: React.FC<MapProps> = ({ 
  selectedKebele, 
  riskType = 'suitability', 
  floodSimLevel = 0,
  mode = 'default',
  predictionYear = 2025
}) => {
  const center: [number, number] = selectedKebele ? selectedKebele.coordinates : [9.01, 38.74];
  const zoom = selectedKebele ? 15 : 12;

  // Simulate boundaries with small rectangles for demo
  const getBounds = (coords: [number, number]) => {
    const size = 0.01;
    return [
      [coords[0] - size, coords[1] - size],
      [coords[0] + size, coords[1] - size],
      [coords[0] + size, coords[1] + size],
      [coords[0] - size, coords[1] + size],
    ] as [number, number][];
  };

  const getKebeleColor = (kebele: KebeleData) => {
    if (mode === 'agri') {
        return `rgba(34, 197, 94, ${kebele.agriculturalPotential / 100})`;
    }
    if (mode === 'investment') {
        return `rgba(99, 102, 241, ${kebele.investmentScore / 100})`;
    }
    if (mode === 'prediction') {
        // Mock prediction visualization
        const growth = (predictionYear - 2025) * 0.02;
        return `rgba(79, 70, 229, ${Math.min(0.9, 0.4 + growth)})`;
    }

    switch (riskType) {
      case 'flood': return getRiskColor(kebele.floodRisk);
      case 'drought': return getRiskColor(kebele.droughtVulnerability);
      case 'landslide': return getRiskColor(kebele.landslideHazard);
      case 'heatwave': return getRiskColor(kebele.heatwaveExposure);
      default: return `rgba(16, 185, 129, ${kebele.suitabilityScore / 100})`; // Suitability
    }
  };

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden shadow-2xl border border-slate-800">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%' }}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {kebeles.map((kebele) => (
          <Polygon
            key={kebele.id}
            positions={getBounds(kebele.coordinates)}
            pathOptions={{
              fillColor: getKebeleColor(kebele),
              fillOpacity: mode === 'prediction' ? 0.8 : 0.6,
              color: 'white',
              weight: 2,
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-bold text-lg">{kebele.name}</h3>
                <div className="grid grid-cols-2 gap-2 mt-2 text-sm">
                  <span className="text-gray-500">Population:</span>
                  <span className="font-medium">{kebele.population.toLocaleString()}</span>
                  <span className="text-gray-500">Suitability:</span>
                  <span className="font-medium">{kebele.suitabilityScore}%</span>
                  {mode === 'default' && (
                    <>
                      <span className="text-gray-500">Flood Risk:</span>
                      <span className="font-medium" style={{ color: getRiskColor(kebele.floodRisk) }}>{kebele.floodRisk}</span>
                    </>
                  )}
                </div>
              </div>
            </Popup>
          </Polygon>
        ))}

        {riskType === 'flood' && floodSimLevel > 0 && (
          kebeles.map(k => k.floodRisk === 'Extreme' || k.floodRisk === 'High' ? (
             <Polygon
              key={`sim-${k.id}`}
              positions={getBounds(k.coordinates)}
              pathOptions={{
                fillColor: '#3b82f6', // blue-500
                fillOpacity: floodSimLevel / 15,
                weight: 0,
              }}
            />
          ) : null)
        )}

        <ChangeView center={center} zoom={zoom} />
      </MapContainer>
      
      {/* Map Legend */}
      <div className="absolute bottom-4 left-4 bg-white/90 dark:bg-slate-900/90 p-4 rounded-lg shadow-lg z-[1000] border border-slate-200 dark:border-slate-800">
        <h4 className="text-xs font-bold uppercase tracking-wider mb-2 text-slate-500">Legend</h4>
        <div className="space-y-1">
          {mode === 'default' ? (
            [
              { label: 'Extreme', color: 'bg-red-500' },
              { label: 'High', color: 'bg-orange-500' },
              { label: 'Moderate', color: 'bg-yellow-500' },
              { label: 'Low', color: 'bg-green-500' },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                <span className="text-xs text-slate-700 dark:text-slate-300">{item.label}</span>
              </div>
            ))
          ) : (
             <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-emerald-500"></div>
                <span className="text-xs text-slate-700 dark:text-slate-300">Analysis Index</span>
             </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MapView;