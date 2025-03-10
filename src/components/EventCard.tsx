
import React from 'react';
import { Clock, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import PullupButton from './PullupButton';
import { Link } from 'react-router-dom';
import { Event } from '@/data/mockData';

interface EventCardProps {
  event: Event;
  className?: string;
  onJoinEvent?: (eventId: string) => void;
}

const EventCard = ({ event, className, onJoinEvent }: EventCardProps) => {
  return (
    <div 
      className={cn(
        'glass-card rounded-2xl overflow-hidden card-transition animate-scale-in',
        className
      )}
    >
      {event.image && (
        <div className="w-full h-40 overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback image if loading fails
              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1567634065309-a53e0014a26e?auto=format&fit=crop&q=80';
            }}
          />
        </div>
      )}
      
      <div className="p-4">
        <Link to={`/event/${event.id}`} className="block">
          <h3 className="font-semibold text-lg mb-2 text-balance hover:text-primary transition-colors">{event.title}</h3>
        </Link>
        
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <span className="flex-1">{event.location}</span>
            {event.distance && (
              <span className="ml-auto text-xs bg-secondary px-2 py-0.5 rounded-full">
                {event.distance} away
              </span>
            )}
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Clock className="w-4 h-4 mr-2 text-primary" />
            <span>{event.endTime}</span>
            <span className="mx-1">•</span>
            <span>{event.duration}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2 text-primary" />
            <span>{event.attendees} attending</span>
          </div>
        </div>
        
        <PullupButton eventId={event.id} onJoinEvent={onJoinEvent} />
      </div>
    </div>
  );
};

export default EventCard;
