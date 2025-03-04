import React, { useState } from 'react';
import { Search, Filter, MapPin, Clock, Sparkles, Activity, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';
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

const categories = [
  { id: 'all', name: 'All' },
  { id: 'social', name: 'Social' },
  { id: 'sports', name: 'Sports' },
  { id: 'wellness', name: 'Wellness' },
  { id: 'tech', name: 'Tech' },
  { id: 'arts', name: 'Arts' }
];

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedHotspot, setSelectedHotspot] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState('all');

  const handleSelectHotspot = (id: string) => {
    setSelectedHotspot(id);
  };

  // Filter events based on category
  const filteredEvents = activeCategory === 'all' 
    ? mockEvents 
    : mockEvents.filter(event => 
        event.category?.toLowerCase() === activeCategory.toLowerCase()
      );

  return (
    <div className="min-h-screen pt-6 pb-24 px-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pullup Nearby</h1>
        
        <Link to="/create-event">
          <Button size="sm" className="rounded-lg">
            <Plus className="w-4 h-4 mr-1" />
            Create
          </Button>
        </Link>
      </div>
      
      <div className="mb-6 flex gap-2">
        <Input
          type="search"
          placeholder="Search for events..."
          className="flex-grow bg-card shadow-sm border-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          prefix={<Search className="w-4 h-4 text-muted-foreground" />}
        />
        <Button variant="outline" size="icon" className="bg-card">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex gap-2 w-max">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={cn(
                "px-4 py-1.5 cursor-pointer transition-all",
                activeCategory === category.id ? "bg-primary" : "bg-card hover:bg-secondary"
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>
      
      <Tabs defaultValue="list" className="mb-6">
        <TabsList className="grid grid-cols-2 w-full mb-4 bg-muted">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="map">Map View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="animate-fade-in">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-lg">For You</h2>
              </div>
            </div>
            
            <div className="grid gap-4">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-primary" />
                <h2 className="font-semibold text-lg">Happening Now</h2>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {filteredEvents.slice(0, 2).map((event) => (
                <div key={`now-${event.id}`} className="glass-card rounded-xl p-4 animate-scale-in">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="w-4 h-4 text-accent" />
                    <span className="text-xs font-medium">{event.category}</span>
                  </div>
                  <h3 className="font-medium text-sm mb-2 line-clamp-2">{event.title}</h3>
                  <div className="flex items-center text-xs text-muted-foreground mb-3">
                    <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                    <span className="truncate">{event.location}</span>
                  </div>
                  <Button size="sm" variant="outline" className="w-full text-xs py-1 h-8">
                    View Details
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="map" className="animate-fade-in">
          <div className="mb-6">
            <MapView 
              hotspots={mockHotspots} 
              onSelectHotspot={handleSelectHotspot}
              className="w-full h-[400px] rounded-lg overflow-hidden"
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
                {filteredEvents
                  .slice(0, 2)
                  .map(event => (
                    <EventCard key={event.id} event={event} />
                  ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Explore;
