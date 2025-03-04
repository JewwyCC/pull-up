
import React from 'react';
import { Calendar, Clock, MapPin, Users } from 'lucide-react';
import { cn } from '@/lib/utils';
import PullupButton from './PullupButton';
import { Link } from 'react-router-dom';

export type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  time: string;
  date: string;
  attendees: number;
  image?: string;
  distance?: string;
  category?: string;
  trending?: boolean;
};

interface EventCardProps {
  event: Event;
  className?: string;
}

const EventCard = ({ event, className }: EventCardProps) => {
  return (
    <div 
      className={cn(
        'glass-card rounded-2xl overflow-hidden card-transition animate-scale-in',
        className
      )}
    >
      {event.image && (
        <Link to={`/event/${event.id}`} className="block relative h-40 w-full overflow-hidden">
          <img 
            src={event.image} 
            alt={event.title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          {event.trending && (
            <div className="absolute top-3 right-3">
              <span className="bg-accent text-accent-foreground text-xs px-3 py-1 rounded-full font-medium animate-pulse-subtle">
                Trending
              </span>
            </div>
          )}
          {event.category && (
            <div className="absolute top-3 left-3">
              <span className="bg-black/50 backdrop-blur-sm text-white text-xs px-3 py-1 rounded-full font-medium">
                {event.category}
              </span>
            </div>
          )}
        </Link>
      )}

      <div className="p-5">
        <Link to={`/event/${event.id}`} className="block">
          <h3 className="font-semibold text-lg mb-2 text-balance hover:text-primary transition-colors">{event.title}</h3>
        </Link>
        <p className="text-muted-foreground text-sm mb-4 line-clamp-2">{event.description}</p>
        
        <div className="flex flex-col gap-2 mb-4">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="w-4 h-4 mr-2 text-primary" />
            <span>{event.location}</span>
            {event.distance && (
              <span className="ml-auto text-xs bg-secondary px-2 py-0.5 rounded-full">
                {event.distance} away
              </span>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-4 h-4 mr-2 text-primary" />
              <span>{event.date}</span>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-4 h-4 mr-2 text-primary" />
              <span>{event.time}</span>
            </div>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground">
            <Users className="w-4 h-4 mr-2 text-primary" />
            <span>{event.attendees} attending</span>
          </div>
        </div>
        
        <PullupButton eventId={event.id} />
      </div>
    </div>
  );
};

export default EventCard;
