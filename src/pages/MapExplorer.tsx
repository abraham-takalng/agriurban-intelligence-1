import React from 'react';
import LeafletMap from '@/components/map/LeafletMap';

const MapExplorer = () => {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex-1 relative pt-16">
        <LeafletMap />
      </div>
    </div>
  );
};

export default MapExplorer;