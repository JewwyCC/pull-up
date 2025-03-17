
import React from 'react';
import { MapPin } from 'lucide-react';
import MapboxMap from '@/components/MapboxMap';
import EventCard from '@/components/EventCard';
import { mockHotspots, Event, mockEvents } from '@/data/mockData';

interface MapViewProps {
  selectedHotspot: string | null;
  setSelectedHotspot: (id: string) => void;
  hotspotEvents: Event[];
  mapboxToken: string;
  showHeatMap?: boolean;
  onJoinEvent?: (eventId: string) => void;
  filteredEvents: Event[];
}

const MapView = ({ 
  selectedHotspot, 
  setSelectedHotspot, 
  hotspotEvents,
  mapboxToken,
  showHeatMap,
  onJoinEvent,
  filteredEvents
}: MapViewProps) => {
  // Get the selected hotspot data
  const selectedHotspotData = selectedHotspot 
    ? mockHotspots.find(h => h.id === selectedHotspot)
    : null;
    
  // Filter events for the selected hotspot using proximity calculation
  const hotspotEventsToShow = selectedHotspotData 
    ? filteredEvents.filter(event => {
        // Simple proximity filter - this would be more accurate with actual coordinates
        // but for mock data we'll use the hotspot name in location as a heuristic
        return event.location.includes(selectedHotspotData.name) || 
               // For UC Irvine events, also include "UCI" or "UC Irvine" in location
               (selectedHotspotData.name.includes("UC Irvine") && 
                (event.location.includes("UCI") || event.location.includes("UC Irvine") || 
                 event.location.includes("Irvine")));
      }).slice(0, 3) // Limit to 3 events
    : [];

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
      
      {selectedHotspot ? (
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">
              {selectedHotspotData?.name} Area
            </h2>
            <span className="text-sm text-muted-foreground">
              ({hotspotEventsToShow.length} events)
            </span>
          </div>
          
          {hotspotEventsToShow.length > 0 ? (
            <div className="grid gap-4">
              {hotspotEventsToShow.map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onJoinEvent={onJoinEvent}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground bg-muted/30 rounded-lg">
              No events found in this area
            </div>
          )}
        </div>
      ) : (
        // Show all events when no hotspot is selected
        <div className="mb-6 animate-fade-in">
          <div className="flex items-center gap-2 mb-4">
            <MapPin className="w-5 h-5 text-primary" />
            <h2 className="font-semibold">All Events</h2>
            <span className="text-sm text-muted-foreground">
              ({filteredEvents.length} events)
            </span>
          </div>
          
          {filteredEvents.length > 0 ? (
            <div className="grid gap-4">
              {filteredEvents.slice(0, 5).map(event => (
                <EventCard 
                  key={event.id} 
                  event={event} 
                  onJoinEvent={onJoinEvent}
                />
              ))}
            </div>
          ) : (
            <div className="p-4 text-center text-muted-foreground bg-muted/30 rounded-lg">
              No events found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MapView;
