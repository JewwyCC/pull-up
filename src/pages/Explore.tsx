
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { mockEvents, mockHotspots } from '@/data/mockData';

// Components
import Header from '@/components/explore/Header';
import SearchBar from '@/components/explore/SearchBar';
import CategoryFilter from '@/components/explore/CategoryFilter';
import EventListView from '@/components/explore/EventListView';
import MapView from '@/components/explore/MapView';

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('list');
  const [mapboxToken, setMapboxToken] = useState<string>('');

  const filteredEvents = activeCategory === 'all' 
    ? mockEvents 
    : mockEvents.filter(event => 
        event.category?.toLowerCase() === activeCategory.toLowerCase()
      );
  
  const hotspotEvents = selectedHotspot 
    ? filteredEvents.slice(0, Math.min(filteredEvents.length, 3)) 
    : [];

  useEffect(() => {
    const storedToken = localStorage.getItem('mapbox_token');
    if (storedToken) {
      setMapboxToken(storedToken);
    }
  }, []);

  return (
    <div className="min-h-screen pt-6 pb-24 px-4 max-w-2xl mx-auto">
      <Header />
      
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
          <EventListView filteredEvents={filteredEvents} />
        </TabsContent>
        
        <TabsContent value="map">
          <MapView
            selectedHotspot={selectedHotspot}
            setSelectedHotspot={setSelectedHotspot}
            hotspotEvents={hotspotEvents}
            mapboxToken={mapboxToken}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Explore;
