
import React from 'react';
import { MapPin } from 'lucide-react';
import MapboxMap from '@/components/MapboxMap';
import EventCard from '@/components/EventCard';
import { mockHotspots, Event } from '@/data/mockData';

interface MapViewProps {
  selectedHotspot: string | null;
  setSelectedHotspot: (id: string) => void;
  hotspotEvents: Event[];
  mapboxToken: string;
  showHeatMap?: boolean;
}

const MapView = ({ 
  selectedHotspot, 
  setSelectedHotspot, 
  hotspotEvents,
  mapboxToken,
  showHeatMap
}: MapViewProps) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <MapboxMap 
          hotspots={mockHotspots} 
          onSelectHotspot={setSelectedHotspot}
          className="w-full h-[400px] rounded-lg overflow-hidden"
          showHeatMap={showHeatMap}
        />
      </div>
      
      {selectedHotspot && (
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">
              {mockHotspots.find(h => h.id === selectedHotspot)?.name} Area
            </h2>
            <span className="text-sm text-muted-foreground">
              ({mockHotspots.find(h => h.id === selectedHotspot)?.eventCount} events)
            </span>
          </div>
          
          <div className="grid gap-4">
            {hotspotEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;
