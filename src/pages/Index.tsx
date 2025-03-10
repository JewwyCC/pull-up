
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Activity, Clock, Sparkles, MapPin } from 'lucide-react';
import EventCard from '@/components/EventCard';
import { Event } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const mockEvents: Event[] = [
  {
    id: '1',
    title: 'Morning Coffee Meetup',
    location: 'Brew & Bean, Downtown',
    distance: '0.8 mi',
    category: 'Social',
    attendees: 12,
    duration: '1 hour',
    endTime: 'Ends at 9:30 AM',
    trending: true,
    image: 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&q=80'
  },
  {
    id: '2',
    title: 'Pickup Basketball Game',
    location: 'Central Park Courts',
    distance: '1.2 mi',
    category: 'Sports',
    attendees: 8,
    duration: '2 hours',
    endTime: 'Ends at 7:30 PM',
    image: 'https://images.unsplash.com/photo-1518639192441-8fce0a366e2e?auto=format&fit=crop&q=80'
  },
  {
    id: '3',
    title: 'Sunset Beach Yoga',
    location: 'Venice Beach',
    distance: '2.5 mi',
    category: 'Wellness',
    attendees: 15,
    duration: '1 hour',
    endTime: 'Ends at 8:00 PM',
    trending: true,
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80'
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

const Index = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen pt-6 pb-24 px-4 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <span className="text-xs font-medium text-primary">Los Angeles</span>
          <h1 className="text-2xl font-bold">Happening Now</h1>
        </div>
        <div className="relative">
          <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <span className="font-medium">LA</span>
          </div>
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-background"></span>
        </div>
      </div>

      <div className="mb-6">
        <Input
          type="search"
          placeholder="Search for events..."
          className="w-full bg-white shadow-sm border-input"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="mb-6 overflow-x-auto pb-2">
        <div className="flex gap-2 w-max">
          {categories.map((category) => (
            <Badge
              key={category.id}
              variant={activeCategory === category.id ? "default" : "outline"}
              className={cn(
                "px-4 py-1.5 cursor-pointer transition-all",
                activeCategory === category.id ? "bg-primary" : "bg-white hover:bg-secondary"
              )}
              onClick={() => setActiveCategory(category.id)}
            >
              {category.name}
            </Badge>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">Near You</h2>
          </div>
          <Link to="/explore" className="text-sm text-primary font-medium">View all</Link>
        </div>

        <div className="grid gap-4">
          {mockEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">Popular Now</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {mockEvents.slice(0, 2).map((event) => (
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
    </div>
  );
};

export default Index;
