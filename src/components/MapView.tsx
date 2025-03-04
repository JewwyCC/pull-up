
import React, { useState, useEffect } from 'react';
import { Map, MapPin, Navigation } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface Hotspot {
  id: string;
  name: string;
  latitude: number;
  longitude: number;
  eventCount: number;
}

interface MapViewProps {
  className?: string;
  hotspots: Hotspot[];
  onSelectHotspot?: (id: string) => void;
}

const MapView = ({ className, hotspots, onSelectHotspot }: MapViewProps) => {
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);

  useEffect(() => {
    // Try to get user's location when component mounts
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationError(null);
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationError("Couldn't access your location");
        }
      );
    } else {
      setLocationError("Geolocation is not supported by your browser");
    }
  }, []);

  const handleSelectHotspot = (id: string) => {
    setSelectedHotspot(id);
    if (onSelectHotspot) {
      onSelectHotspot(id);
    }
  };

  // Get random positions for the hotspots (in a real app, you'd use actual coordinates)
  const getRandomPosition = (id: string) => {
    // Use the id as a seed for pseudo-random but consistent positions
    const idSum = id.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return {
      top: `${(idSum % 65) + 15}%`,
      left: `${((idSum * 1.5) % 65) + 15}%`
    };
  };

  return (
    <div className={cn('relative overflow-hidden rounded-2xl border border-border shadow-lg', className)}>
      {/* Map container */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-950 to-blue-900">
        {/* Map grid lines for visual effect */}
        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 h-full">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`v-${i}`} className="border-r border-white h-full"></div>
            ))}
          </div>
          <div className="grid grid-rows-12 w-full absolute inset-0">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={`h-${i}`} className="border-b border-white w-full"></div>
            ))}
          </div>
        </div>

        {/* Hotspots */}
        {hotspots.map((hotspot) => {
          const position = getRandomPosition(hotspot.id);
          
          return (
            <button
              key={hotspot.id}
              className={cn(
                'absolute p-1 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300',
                selectedHotspot === hotspot.id ? 'z-20 scale-125' : 'z-10',
              )}
              style={{ 
                top: position.top, 
                left: position.left
              }}
              onClick={() => handleSelectHotspot(hotspot.id)}
            >
              <div className="relative">
                <MapPin 
                  className={cn(
                    'w-6 h-6 text-primary drop-shadow-glow',
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
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 bg-card rounded-lg shadow-lg p-2 min-w-[120px] text-center animate-fade-in z-50">
                  <p className="text-xs font-medium text-white">{hotspot.name}</p>
                  <p className="text-xs text-muted-foreground">{hotspot.eventCount} events</p>
                </div>
              )}
            </button>
          );
        })}

        {/* User's location */}
        {userLocation && (
          <div className="absolute z-30 transform -translate-x-1/2 -translate-y-1/2" 
               style={{ top: "50%", left: "50%" }}>
            <div className="relative">
              <div className="w-4 h-4 bg-accent rounded-full animate-ping absolute"></div>
              <Navigation className="w-6 h-6 text-white z-10 relative" />
            </div>
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="absolute bottom-4 right-4 z-20 flex flex-col gap-2">
        <Button size="sm" variant="secondary" className="rounded-full h-9 w-9 p-0 flex items-center justify-center">
          <span className="sr-only">Zoom in</span>
          <span className="text-xl font-bold">+</span>
        </Button>
        <Button size="sm" variant="secondary" className="rounded-full h-9 w-9 p-0 flex items-center justify-center">
          <span className="sr-only">Zoom out</span>
          <span className="text-xl font-bold">-</span>
        </Button>
      </div>

      {/* Location error message */}
      {locationError && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 bg-card/90 backdrop-blur-sm text-white px-4 py-2 rounded-full shadow-lg text-sm">
          {locationError}
        </div>
      )}

      {/* Placeholder message */}
      <div className="absolute bottom-4 left-4 text-xs text-white/70 bg-black/30 rounded-md px-2 py-1">
        <div className="flex items-center gap-1">
          <Map className="w-3 h-3" />
          <span>Simulated Map View - Try Mapbox for a real map</span>
        </div>
      </div>
    </div>
  );
};

export default MapView;
