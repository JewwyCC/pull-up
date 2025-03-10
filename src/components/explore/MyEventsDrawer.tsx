
import React from 'react';
import { CalendarCheck, ChevronUp, Lock, LockOpen } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { mockEvents, Event } from '@/data/mockData';
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface MyEventsDrawerProps {
  isOpen: boolean;
  onToggle: () => void;
  joinedEvents: string[];
  isLocked: boolean;
  onToggleLock: () => void;
}

const MyEventsDrawer = ({ 
  isOpen, 
  onToggle, 
  joinedEvents, 
  isLocked, 
  onToggleLock 
}: MyEventsDrawerProps) => {
  // Filter events that the user has joined
  const myEvents = mockEvents.filter(event => joinedEvents.includes(event.id));
  
  return (
    <div className={cn(
      "fixed bottom-16 left-0 right-0 z-40 bg-card/95 backdrop-blur-md shadow-lg border-t border-border transition-transform duration-300 ease-in-out",
      isOpen ? "translate-y-0" : "translate-y-[calc(100%-3.5rem)]"
    )}>
      {/* Drawer header/handle */}
      <div 
        className="h-14 flex items-center justify-between px-4 cursor-pointer"
        onClick={onToggle}
      >
        <div className="flex items-center gap-2">
          <CalendarCheck className="w-5 h-5 text-primary" />
          <span className="font-medium">My Events ({myEvents.length})</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLock();
            }}
          >
            {isLocked ? (
              <Lock className="h-4 w-4 text-primary" />
            ) : (
              <LockOpen className="h-4 w-4 text-muted-foreground" />
            )}
          </Button>
          
          <ChevronUp className={cn(
            "w-5 h-5 transition-transform duration-300",
            !isOpen && "rotate-180"
          )} />
        </div>
      </div>
      
      {/* Drawer content */}
      <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
        {myEvents.length > 0 ? (
          <div className="grid gap-3">
            {myEvents.map(event => (
              <MyEventCard key={event.id} event={event} />
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-muted-foreground">
            <p>You haven't joined any events yet</p>
            <p className="text-sm mt-2">Discover events on the explore page and click "Pullup" to join</p>
          </div>
        )}
      </div>
    </div>
  );
};

const MyEventCard = ({ event }: { event: Event }) => {
  return (
    <Link to={`/event/${event.id}`} className="block">
      <div className="bg-card hover:bg-card/80 transition-colors border border-border rounded-lg p-3 flex gap-3">
        {event.image && (
          <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
            <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
          </div>
        )}
        
        <div className="flex-grow min-w-0">
          <h4 className="font-medium text-sm line-clamp-1">{event.title}</h4>
          
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <span>{event.endTime}</span>
          </div>
          
          <div className="flex items-center mt-2">
            <div className="flex -space-x-2">
              <Avatar className="w-6 h-6 border border-background">
                <AvatarFallback>U1</AvatarFallback>
              </Avatar>
              <Avatar className="w-6 h-6 border border-background">
                <AvatarFallback>U2</AvatarFallback>
              </Avatar>
            </div>
            <span className="text-xs text-muted-foreground ml-2">{event.attendees} attending</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <CalendarCheck className="w-5 h-5 text-primary" />
        </div>
      </div>
    </Link>
  );
};

export default MyEventsDrawer;
