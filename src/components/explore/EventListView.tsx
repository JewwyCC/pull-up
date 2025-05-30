
import React from 'react';
import { Sparkles, Clock, Activity, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventCard from '@/components/EventCard';
import { Event } from '@/data/mockData';
import { Link } from 'react-router-dom';

interface EventListViewProps {
  filteredEvents: Event[];
  onJoinEvent?: (eventId: string) => void;
}

const EventListView = ({ filteredEvents, onJoinEvent }: EventListViewProps) => {
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">Happening Now</h2>
          </div>
        </div>
        
        <div className="grid gap-4">
          {filteredEvents.map(event => (
            <EventCard key={event.id} event={event} onJoinEvent={onJoinEvent} />
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" />
            <h2 className="font-semibold text-lg">Popular Areas</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {filteredEvents.slice(0, 2).map((event) => (
            <div key={`now-${event.id}`} className="glass-card rounded-xl overflow-hidden animate-scale-in">
              {event.image && (
                <div className="w-full h-24 overflow-hidden">
                  <img 
                    src={event.image} 
                    alt={event.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1567634065309-a53e0014a26e?auto=format&fit=crop&q=80';
                    }}
                  />
                </div>
              )}
              <div className="p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Activity className="w-4 h-4 text-accent" />
                  <span className="text-xs font-medium">{event.category}</span>
                </div>
                <h3 className="font-medium text-sm mb-2 line-clamp-2">{event.title}</h3>
                <div className="flex items-center text-xs text-muted-foreground mb-3">
                  <MapPin className="w-3 h-3 mr-1 flex-shrink-0" />
                  <span className="truncate">{event.location}</span>
                </div>
                <Link to={`/event/${event.id}`}>
                  <Button size="sm" variant="outline" className="w-full text-xs py-1 h-8">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventListView;
