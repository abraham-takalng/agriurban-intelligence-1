import React, { useState } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  GeoJSON, 
  useMap, 
  LayersControl
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { 
  KEBELE_BOUNDARIES, 
  LAND_COVER, 
  LAND_SUITABILITY, 
  ROAD_NETWORK, 
  RIVERS,
  suitabilityColors,
  KebeleData
} from '@/data/mockGisData';
import { getRiskColor } from '@/lib/constants';
import KebeleInfoModal from './KebeleInfoModal';

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
  mode?: 'agri' | 'prediction' | 'investment' | 'default';
  activeLayers?: string[];
  onFeatureClick?: (data: any) => void;
  predictionYear?: number;
  floodSimLevel?: number;
}

function ChangeView({ center, zoom }: { center: [number, number]; zoom: number }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const MapView: React.FC<MapProps> = ({ 
  selectedKebele: externalSelectedKebele, 
  riskType = 'suitability', 
  mode = 'default',
  activeLayers = ['Satellite', 'Kebele Boundaries'],
  onFeatureClick,
  predictionYear = 2025,
  floodSimLevel = 0
}) => {
  const [internalSelectedKebele, setInternalSelectedKebele] = useState<KebeleData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const activeKebele = externalSelectedKebele || internalSelectedKebele;
  const center: [number, number] = activeKebele ? activeKebele.coordinates : [7.1264, 40.0016];
  const zoom = activeKebele ? 15 : 13;

  // Layer Styles
  const kebeleStyle = (feature: any) => {
    const isSelected = activeKebele && activeKebele.id === feature.properties.id;
    return {
      fillColor: isSelected ? '#22d3ee' : '#0ea5e9',
      weight: isSelected ? 3 : 1,
      opacity: 1,
      color: isSelected ? '#22d3ee' : '#334155',
      fillOpacity: isSelected ? 0.3 : 0.1,
    };
  };

  const getAgriColor = (score: number) => {
    if (score > 85) return '#064e3b';
    if (score > 70) return '#059669';
    if (score > 50) return '#10b981';
    return '#a7f3d0';
  };

  const getUrbanColor = (score: number) => {
    if (score > 85) return '#1e3a8a';
    if (score > 70) return '#2563eb';
    if (score > 50) return '#60a5fa';
    return '#dbeafe';
  };

  const agriSuitabilityStyle = (feature: any) => ({
    fillColor: getAgriColor(feature.properties.agriSuitabilityScore),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.6,
  });

  const urbanGrowthStyle = (feature: any) => ({
    fillColor: getUrbanColor(feature.properties.urbanGrowthPotential),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.6,
  });

  const floodRiskStyle = (feature: any) => ({
    fillColor: getRiskColor(feature.properties.floodRiskLevel),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.6,
  });

  const droughtRiskStyle = (feature: any) => ({
    fillColor: getRiskColor(feature.properties.droughtRiskLevel),
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.6,
  });

  const landCoverStyle = (feature: any) => ({
    fillColor: feature.properties.color,
    weight: 0,
    opacity: 1,
    fillOpacity: 0.6,
  });

  const suitabilityStyle = (feature: any) => ({
    fillColor: feature.properties.color,
    weight: 1,
    opacity: 1,
    color: 'white',
    fillOpacity: 0.7,
  });

  const roadStyle = (feature: any) => {
    const colors: Record<string, string> = {
      'Primary': '#fca5a5',
      'Secondary': '#fdba74',
      'Residential': '#fde047',
      'Tracks': '#d4d4d8',
      'Paths': '#a1a1aa',
      'Service': '#cbd5e1'
    };
    return {
      color: colors[feature.properties.type] || '#ffffff',
      weight: feature.properties.type === 'Primary' ? 3 : 1.5,
      opacity: 0.8
    };
  };

  const riverStyle = {
    color: '#0ea5e9',
    weight: 3,
    opacity: 0.7
  };

  const handleOnEachFeature = (feature: any, layer: any) => {
    layer.on({
      click: (e: any) => {
        L.DomEvent.stopPropagation(e);
        const data = feature.properties as KebeleData;
        
        if (onFeatureClick) {
          onFeatureClick(data);
        } else {
          setInternalSelectedKebele(data);
          setIsModalOpen(true);
        }
      },
      mouseover: (e: any) => {
        const l = e.target;
        l.setStyle({
          weight: 2,
          color: '#22d3ee',
          fillOpacity: 0.4,
        });
      },
      mouseout: (e: any) => {
        const l = e.target;
        l.setStyle(kebeleStyle(feature));
      },
    });
  };

  return (
    <div className="w-full h-full relative rounded-xl overflow-hidden shadow-2xl border border-slate-800 bg-slate-950">
      <MapContainer 
        center={center} 
        zoom={zoom} 
        style={{ height: '100%', width: '100%', background: '#020617' }}
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked={activeLayers.includes('Satellite')} name="Satellite Imagery">
            <TileLayer
              attribution='&copy; ESRI'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer checked={activeLayers.includes('OpenStreetMap')} name="OpenStreetMap">
            <TileLayer
              attribution='&copy; OpenStreetMap'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
          </LayersControl.BaseLayer>

          {activeLayers.includes('Land Cover') && (
            <LayersControl.Overlay checked name="Land Cover">
              <GeoJSON data={LAND_COVER as any} style={landCoverStyle} />
            </LayersControl.Overlay>
          )}

          {activeLayers.includes('Agriculture Suitability') && (
            <LayersControl.Overlay checked name="Agriculture Suitability">
              <GeoJSON 
                data={KEBELE_BOUNDARIES as any} 
                style={agriSuitabilityStyle}
                onEachFeature={handleOnEachFeature}
              />
            </LayersControl.Overlay>
          )}

          {activeLayers.includes('Urban Growth Potential') && (
            <LayersControl.Overlay checked name="Urban Growth Potential">
              <GeoJSON 
                data={KEBELE_BOUNDARIES as any} 
                style={urbanGrowthStyle}
                onEachFeature={handleOnEachFeature}
              />
            </LayersControl.Overlay>
          )}

          {activeLayers.includes('Flood Risk') && (
            <LayersControl.Overlay checked name="Flood Risk">
              <GeoJSON 
                data={KEBELE_BOUNDARIES as any} 
                style={floodRiskStyle}
                onEachFeature={handleOnEachFeature}
              />
            </LayersControl.Overlay>
          )}

          {activeLayers.includes('Drought Risk') && (
            <LayersControl.Overlay checked name="Drought Risk">
              <GeoJSON 
                data={KEBELE_BOUNDARIES as any} 
                style={droughtRiskStyle}
                onEachFeature={handleOnEachFeature}
              />
            </LayersControl.Overlay>
          )}

          {activeLayers.includes('Soil Suitability') && (
            <LayersControl.Overlay checked name="Soil Suitability">
              <GeoJSON data={LAND_SUITABILITY as any} style={suitabilityStyle} />
            </LayersControl.Overlay>
          )}

          {activeLayers.includes('Road Network') && (
            <LayersControl.Overlay checked name="Road Network">
              <GeoJSON data={ROAD_NETWORK as any} style={roadStyle} />
            </LayersControl.Overlay>
          )}

          {activeLayers.includes('Inland Waters') && (
            <LayersControl.Overlay checked name="Rivers & Streams">
              <GeoJSON data={RIVERS as any} style={riverStyle} />
            </LayersControl.Overlay>
          )}

          {activeLayers.includes('Kebele Boundaries') && (
            <LayersControl.Overlay checked name="Kebele Boundaries">
              <GeoJSON 
                data={KEBELE_BOUNDARIES as any} 
                style={kebeleStyle}
                onEachFeature={handleOnEachFeature}
              />
            </LayersControl.Overlay>
          )}
        </LayersControl>

        <ChangeView center={center} zoom={zoom} />
      </MapContainer>
      
      <div className="absolute bottom-8 right-8 z-[1000] flex flex-col gap-2">
        <div className="bg-slate-950/90 backdrop-blur-xl border border-white/10 p-4 rounded-2xl shadow-2xl min-w-[150px]">
           <h4 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-3">Legend</h4>
           <div className="space-y-2">
             {activeLayers.includes('Flood Risk') || activeLayers.includes('Drought Risk') ? (
               ['Extreme', 'High', 'Moderate', 'Low'].map(level => (
                 <div key={level} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getRiskColor(level as any) }} />
                   <span className="text-[10px] font-bold text-slate-400">{level} Risk</span>
                 </div>
               ))
             ) : activeLayers.includes('Agriculture Suitability') ? (
                [90, 75, 55, 30].map(score => (
                  <div key={score} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getAgriColor(score) }} />
                    <span className="text-[10px] font-bold text-slate-400">{score > 85 ? 'Optimal' : score > 70 ? 'Good' : 'Moderate'}</span>
                  </div>
                ))
             ) : (
               Object.entries(suitabilityColors).map(([rating, color]) => (
                 <div key={rating} className="flex items-center gap-2">
                   <div className="w-3 h-3 rounded-full" style={{ backgroundColor: color }} />
                   <span className="text-[10px] font-bold text-slate-400">{rating}</span>
                 </div>
               ))
             )}
           </div>
        </div>
      </div>

      {/* Dynamic Kebele Modal */}
      <KebeleInfoModal 
        kebele={activeKebele} 
        isOpen={isModalOpen} 
        onClose={() => {
          setIsModalOpen(false);
          setInternalSelectedKebele(null);
        }} 
      />
    </div>
  );
};

export default MapView;