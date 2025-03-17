
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockEvents, mockHotspots } from '@/data/mockData';
import { toast } from 'sonner';
import { AlertCircle, ArrowUpDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

// Components
import Header from '@/components/explore/Header';
import SearchBar from '@/components/explore/SearchBar';
import CategoryFilter from '@/components/explore/CategoryFilter';
import EventListView from '@/components/explore/EventListView';
import MapView from '@/components/explore/MapView';
import MyEventsDrawer from '@/components/explore/MyEventsDrawer';

// Ranking types
type RankingOption = 'recommended' | 'distance' | 'popularity' | 'time';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('list');
  const [mapboxToken, setMapboxToken] = useState<string>('');
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);
  const [isMyEventsOpen, setIsMyEventsOpen] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [rankingOption, setRankingOption] = useState<RankingOption>('recommended');
  
  // Filter events based on search query and category
  const filteredBySearchAndCategory = mockEvents.filter(event => {
    const matchesCategory = activeCategory === 'all' || 
      (event.category?.toLowerCase() === activeCategory.toLowerCase());
      
    const matchesSearch = !searchQuery || 
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.location.toLowerCase().includes(searchQuery.toLowerCase());
      
    return matchesCategory && matchesSearch;
  });
  
  // Get events for the selected hotspot
  const hotspotEvents = selectedHotspot ? [] : [];

  // Load mapbox token, joined events, and browsing lock state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('mapbox_token');
    if (storedToken) {
      setMapboxToken(storedToken);
    }
    
    const storedJoinedEvents = JSON.parse(localStorage.getItem('joinedEvents') || '[]');
    setJoinedEvents(storedJoinedEvents);
    
    // Check if browsing is locked
    const isBrowsingLocked = localStorage.getItem('browsing_locked') === 'true';
    setIsLocked(isBrowsingLocked);
    
    // If user has joined events and hasn't dismissed the drawer, open it
    if (storedJoinedEvents.length > 0) {
      setIsMyEventsOpen(true);
    }
  }, []);

  // Check if event time overlaps with already joined events
  const checkEventOverlap = (eventId: string) => {
    const newEvent = mockEvents.find(e => e.id === eventId);
    if (!newEvent) return false;
    
    // Convert event times to comparable values (for demo purposes)
    // In a real app, you would use proper datetime objects
    const newEventEndTime = newEvent.endTime.replace('Ends at ', '');
    
    // Check if any joined event overlaps with the new event
    for (const joinedEventId of joinedEvents) {
      const joinedEvent = mockEvents.find(e => e.id === joinedEventId);
      if (!joinedEvent) continue;
      
      const joinedEventEndTime = joinedEvent.endTime.replace('Ends at ', '');
      
      // Simple overlap check - in a real app this would be more sophisticated
      // Using the endTime for demo purposes
      if (newEventEndTime === joinedEventEndTime) {
        return true; // Events overlap
      }
    }
    
    return false; // No overlap
  };

  // Handle joining events with overlap check
  const handleJoinEvent = (eventId: string) => {
    // Check for time overlap
    if (checkEventOverlap(eventId)) {
      toast.error("Cannot join this event", {
        description: "You already have another event scheduled for this time",
      });
      return;
    }
    
    if (!joinedEvents.includes(eventId)) {
      const updatedJoinedEvents = [...joinedEvents, eventId];
      setJoinedEvents(updatedJoinedEvents);
      localStorage.setItem('joinedEvents', JSON.stringify(updatedJoinedEvents));
      
      // Lock browsing automatically
      setIsLocked(true);
      localStorage.setItem('browsing_locked', 'true');
      
      // Open my events drawer
      setIsMyEventsOpen(true);
    }
  };

  // Toggle lock for browsing
  const handleToggleLock = () => {
    const newLockedState = !isLocked;
    setIsLocked(newLockedState);
    localStorage.setItem('browsing_locked', newLockedState.toString());
    
    if (newLockedState) {
      toast.info("Browsing locked", {
        description: "You'll only see events you've signed up for until you unlock browsing",
      });
    } else {
      toast.success("Browsing unlocked", {
        description: "You can now discover new events",
      });
    }
  };

  // Rank events based on selected option
  const rankEvents = (events: typeof mockEvents) => {
    let rankedEvents = [...events];
    
    switch (rankingOption) {
      case 'recommended':
        // Sort by trending first, then by attendees
        rankedEvents.sort((a, b) => {
          if (a.trending && !b.trending) return -1;
          if (!a.trending && b.trending) return 1;
          return b.attendees - a.attendees;
        });
        break;
      case 'distance':
        // Sort by distance (ascending)
        rankedEvents.sort((a, b) => {
          const distanceA = a.distance ? parseFloat(a.distance.replace(' mi', '')) : Infinity;
          const distanceB = b.distance ? parseFloat(b.distance.replace(' mi', '')) : Infinity;
          return distanceA - distanceB;
        });
        break;
      case 'popularity':
        // Sort by attendees (descending)
        rankedEvents.sort((a, b) => b.attendees - a.attendees);
        break;
      case 'time':
        // Sort by end time (chronologically)
        rankedEvents.sort((a, b) => {
          const timeA = a.endTime.replace('Ends at ', '');
          const timeB = b.endTime.replace('Ends at ', '');
          return timeA.localeCompare(timeB);
        });
        break;
    }
    
    return rankedEvents;
  };

  // If browsing is locked and user has joined events, only show those events
  const eventsAfterLockFilter = isLocked && joinedEvents.length > 0
    ? filteredBySearchAndCategory.filter(event => joinedEvents.includes(event.id))
    : filteredBySearchAndCategory;
    
  // Apply ranking to the filtered events
  const visibleEvents = rankEvents(eventsAfterLockFilter);

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
      
      <div className="flex items-center justify-between mb-4">
        <CategoryFilter 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory}
        />
        
        <div className="flex items-center gap-2">
          <ArrowUpDown className="w-4 h-4 text-muted-foreground" />
          <Select value={rankingOption} onValueChange={(value) => setRankingOption(value as RankingOption)}>
            <SelectTrigger className="w-[140px] h-9">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="distance">Distance</SelectItem>
              <SelectItem value="popularity">Popularity</SelectItem>
              <SelectItem value="time">Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
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
            filteredEvents={visibleEvents}
            mapboxToken={mapboxToken}
            showHeatMap={true}
            onJoinEvent={handleJoinEvent}
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
