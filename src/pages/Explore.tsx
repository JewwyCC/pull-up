
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockEvents, mockHotspots } from '@/data/mockData';
import { toast } from 'sonner';
import { AlertCircle } from 'lucide-react';

// Components
import Header from '@/components/explore/Header';
import SearchBar from '@/components/explore/SearchBar';
import CategoryFilter from '@/components/explore/CategoryFilter';
import EventListView from '@/components/explore/EventListView';
import MapView from '@/components/explore/MapView';
import MyEventsDrawer from '@/components/explore/MyEventsDrawer';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('list');
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);
  const [isMyEventsOpen, setIsMyEventsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  
  // Filter events based on category and browsing lock
  const filteredEvents = activeCategory === 'all' 
    ? mockEvents 
    : mockEvents.filter(event => 
        event.category?.toLowerCase() === activeCategory.toLowerCase()
      );
  
  // Get events for the selected hotspot
  const hotspotEvents = selectedHotspot 
    ? filteredEvents.slice(0, Math.min(filteredEvents.length, 3)) 
    : [];

  // Load mapbox token and joined events from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('mapbox_token');
    if (storedToken) {
      setMapboxToken(storedToken);
    }
    
    const storedJoinedEvents = JSON.parse(localStorage.getItem('joinedEvents') || '[]');
    setJoinedEvents(storedJoinedEvents);
    
    // If user has joined events and hasn't dismissed the drawer, open it
    if (storedJoinedEvents.length > 0) {
      setIsMyEventsOpen(true);
    }
  }, []);

  // Handle joining events
  const handleJoinEvent = (eventId: string) => {
    if (!joinedEvents.includes(eventId)) {
      const updatedJoinedEvents = [...joinedEvents, eventId];
      setJoinedEvents(updatedJoinedEvents);
      localStorage.setItem('joinedEvents', JSON.stringify(updatedJoinedEvents));
      
      // Open my events drawer
      setIsMyEventsOpen(true);
    }
  };

  // Toggle lock for browsing
  const handleToggleLock = () => {
    setIsLocked(!isLocked);
    
    if (!isLocked) {
      toast.info("Browsing locked", {
        description: "You'll only see events you've signed up for until you unlock browsing",
      });
    } else {
      toast.success("Browsing unlocked", {
        description: "You can now discover new events",
      });
    }
  };

  // If browsing is locked and user has joined events, only show those events
  const visibleEvents = isLocked && joinedEvents.length > 0
    ? filteredEvents.filter(event => joinedEvents.includes(event.id))
    : filteredEvents;

  return (
    <div className="min-h-screen pt-6 pb-24 px-4 max-w-2xl mx-auto">
      <Header />
      
      {isLocked && joinedEvents.length > 0 && (
        <div className="mb-4 p-3 bg-accent/10 border border-accent rounded-lg flex items-center gap-2">
          <AlertCircle className="w-5 h-5 text-accent" />
          <p className="text-sm">Browsing is locked to your events. Unlock to discover more.</p>
        </div>
      )}
      
      <SearchBar 
        searchQuery={searchQuery} 
        setSearchQuery={setSearchQuery} 
      />
      
      <CategoryFilter 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory}
      />
      
      <Tabs 
        defaultValue="list" 
        className="mb-6"
        value={activeTab}
        onValueChange={setActiveTab}
      >
        <TabsList className="grid grid-cols-2 w-full mb-4 bg-muted">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list">
          <EventListView 
            filteredEvents={visibleEvents} 
            onJoinEvent={handleJoinEvent}
          />
        </TabsContent>
        
        <TabsContent value="map">
          <MapView
            selectedHotspot={selectedHotspot}
            setSelectedHotspot={setSelectedHotspot}
            hotspotEvents={hotspotEvents}
            mapboxToken={mapboxToken}
            showHeatMap={true}
          />
        </TabsContent>
      </Tabs>
      
      {/* My Events Drawer */}
      <MyEventsDrawer 
        isOpen={isMyEventsOpen}
        onToggle={() => setIsMyEventsOpen(!isMyEventsOpen)}
        joinedEvents={joinedEvents}
        isLocked={isLocked}
        onToggleLock={handleToggleLock}
      />
    </div>
  );
};

export default Explore;
