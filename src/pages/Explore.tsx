
import React, { useState } from 'react';
import { Search, Filter, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import MapView from '@/components/MapView';
import EventCard, { Event } from '@/components/EventCard';

// Mock data
const mockHotspots = [
  { id: '1', name: 'Downtown', latitude: 34.052235, longitude: -118.243683, eventCount: 12 },
  { id: '2', name: 'Santa Monica', latitude: 34.024212, longitude: -118.496475, eventCount: 8 },
  { id: '3', name: 'Silver Lake', latitude: 34.083527, longitude: -118.270455, eventCount: 5 },
  { id: '4', name: 'Venice', latitude: 33.985047, longitude: -118.469018, eventCount: 9 },
];

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Morning Coffee Meetup',
    description: 'Start your day with great coffee and even better conversations. Casual networking for professionals.',
    location: 'Brew & Bean, Downtown',
    time: '8:00 AM',
    date: 'Today',
    attendees: 12,
    distance: '0.8 mi',
    category: 'Social',
    trending: true,
    image: 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    title: 'Pickup Basketball Game',
    description: 'Join us for a friendly 3v3 basketball game at the park. All skill levels welcome!',
    location: 'Central Park Courts',
    time: '5:30 PM',
    date: 'Today',
    attendees: 8,
    distance: '1.2 mi',
    category: 'Sports',
    image: 'https://images.unsplash.com/photo-1546519638-68e109acd27d?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    title: 'Sunset Beach Yoga',
    description: 'Relax and recharge with a guided yoga session as the sun sets over the ocean.',
    location: 'Venice Beach',
    time: '7:00 PM',
    date: 'Today',
    attendees: 15,
    distance: '2.5 mi',
    category: 'Wellness',
    trending: true,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80'
  },
  {
    id: '4',
    title: 'Tech Startup Networking',
    description: 'Connect with local entrepreneurs and tech enthusiasts. Share ideas and find potential collaborators.',
    location: 'Innovation Hub, Silicon Beach',
    time: '6:00 PM',
    date: 'Tomorrow',
    attendees: 28,
    distance: '3.1 mi',
    category: 'Tech',
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80'
  }
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);

  const handleSelectHotspot = (id: string) => {
    setSelectedHotspot(id);
  };

  return (
    <div className="min-h-screen pt-6 pb-24 px-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Explore</h1>
      
      <div className="mb-6 flex gap-2">
        <Input
          type="search"
          placeholder="Search for events..."
          className="flex-grow bg-white shadow-sm border-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          prefix={<Search className="w-4 h-4 text-muted-foreground" />}
        />
        <Button variant="outline" size="icon" className="bg-white">
          <Filter className="w-4 h-4" />
        </Button>
      </div>
      
      <Tabs defaultValue="map" className="mb-6">
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="map">Map View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="map" className="animate-fade-in">
          <div className="mb-6">
            <MapView 
              hotspots={mockHotspots} 
              onSelectHotspot={handleSelectHotspot}
              className="w-full h-[400px]"
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
                {mockEvents
                  .slice(0, 2)
                  .map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
              </div>
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="list" className="animate-fade-in">
          <div className="grid gap-4">
            {mockEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Explore;
