
import React from 'react';
import { Clock, MapPin, Users, UserCheck } from 'lucide-react';
import { cn } from '@/lib/utils';
import PullupButton from './PullupButton';
import { Link } from 'react-router-dom';
import { Event } from '@/data/mockData';
import { Badge } from '@/components/ui/badge';

interface EventCardProps {
  event: Event;
  className?: string;
  onJoinEvent?: (eventId: string) => void;
}

const EventCard = ({ event, className, onJoinEvent }: EventCardProps) => {
  // Mock data to show friends participation - in a real app, this would come from props or context
  const mockFriendsParticipating = ['Alex Johnson', 'Taylor Reed'].filter(() => Math.random() > 0.5);
  const mockGroupsParticipating = ['Basketball Enthusiasts', 'Tech Talks UCIrvine'].filter(() => Math.random() > 0.6);
  
  const hasFriendsOrGroups = mockFriendsParticipating.length > 0 || mockGroupsParticipating.length > 0;

  return (
    <div 
      className={cn(
        'glass-card rounded-2xl overflow-hidden card-transition animate-scale-in',
        hasFriendsOrGroups && 'border-2 border-primary/30',
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
          
          {/* Friends & Groups participating section */}
          {hasFriendsOrGroups && (
            <div className="mt-1 flex flex-col gap-1">
              {mockFriendsParticipating.length > 0 && (
                <div className="flex items-center text-sm text-primary">
                  <UserCheck className="w-4 h-4 mr-2" />
                  <span className="font-medium">
                    {mockFriendsParticipating.join(', ')} {mockFriendsParticipating.length === 1 ? 'is' : 'are'} there now!
                  </span>
                </div>
              )}
              
              {mockGroupsParticipating.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-0.5">
                  {mockGroupsParticipating.map((group, index) => (
                    <Badge key={index} variant="secondary" className="text-xs py-0.5">
                      {group}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
        
        <PullupButton eventId={event.id} onJoinEvent={onJoinEvent} />
      </div>
    </div>
  );
};

export default EventCard;
