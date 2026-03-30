import React from 'react';
import LeafletMap from '@/components/map/LeafletMap';

const MapExplorer = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-slate-950">
      {/* The Navbar takes 64px (h-16), so we ensure the map container fills the rest */}
      <main className="flex-1 relative pt-16">
        <LeafletMap />
        
        {/* Optional: Global Map Status Bar (Mobile-friendly) */}
        <div className="absolute top-20 right-6 z-20 pointer-events-none hidden md:block">
          <div className="bg-slate-900/40 backdrop-blur-sm border border-white/5 px-3 py-1.5 rounded-full flex items-center gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-[10px] font-bold text-slate-400 tracking-widest uppercase">Real-time GIS Sync</span>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MapExplorer;