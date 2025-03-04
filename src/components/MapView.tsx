
import React, { useState } from 'react';
import { Map, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MapViewProps {
  className?: string;
  hotspots: {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
    eventCount: number;
  }[];
  onSelectHotspot?: (id: string) => void;
}

const MapView = ({ className, hotspots, onSelectHotspot }: MapViewProps) => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  const handleSelectHotspot = (id: string) => {
    setSelectedHotspot(id);
    if (onSelectHotspot) {
      onSelectHotspot(id);
    }
  };

  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-border h-[300px]', className)}>
      {/* This would be replaced with an actual map library in a real implementation */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center">
        <div className="text-center text-muted-foreground flex flex-col items-center gap-2">
          <Map className="w-10 h-10 mb-2 text-primary" />
          <p className="text-sm font-medium">Interactive Map</p>
          <p className="text-xs">Real implementation would use a map library</p>
        </div>
      </div>

      {/* Simulated hotspots */}
      {hotspots.map((hotspot) => (
        <button
          key={hotspot.id}
          className={cn(
            'absolute p-1 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300',
            selectedHotspot === hotspot.id ? 'z-20 scale-125' : 'z-10',
            // Randomly position hotspots in this demo version
            `top-[${Math.floor(Math.random() * 80) + 10}%] left-[${Math.floor(Math.random() * 80) + 10}%]`
          )}
          style={{ 
            top: `${Math.floor(Math.random() * 80) + 10}%`, 
            left: `${Math.floor(Math.random() * 80) + 10}%` 
          }}
          onClick={() => handleSelectHotspot(hotspot.id)}
        >
          <div className="relative">
            <MapPin 
              className={cn(
                'w-6 h-6 text-primary',
                selectedHotspot === hotspot.id ? 'animate-pulse' : 'animate-float'
              )} 
            />
            <div className={cn(
              'absolute -top-1 -right-1 w-5 h-5 rounded-full bg-accent text-white flex items-center justify-center text-xs font-medium',
              selectedHotspot === hotspot.id && 'ring-2 ring-white'
            )}>
              {hotspot.eventCount}
            </div>
          </div>
          
          {selectedHotspot === hotspot.id && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-white rounded-lg shadow-lg p-2 min-w-[120px] text-center animate-fade-in">
              <p className="text-xs font-medium">{hotspot.name}</p>
              <p className="text-xs text-muted-foreground">{hotspot.eventCount} events</p>
            </div>
          )}
        </button>
      ))}
    </div>
  );
};

export default MapView;
