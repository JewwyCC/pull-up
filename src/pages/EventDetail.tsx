
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, Users, ArrowLeft, 
  Share, MessageCircle, CalendarCheck, AlertCircle, 
  Star, TrendingUp, Activity 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import PullupButton from '@/components/PullupButton';
import { Event, mockEvents } from '@/data/mockData';

// Mock organizer data to ensure all events have organizers and participants
const mockOrganizerData = {
  'default': {
    id: 'user1',
    name: 'Alex Chen',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80'
  },
  'tech': {
    id: 'user11',
    name: 'Quinn Lopez',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80'
  },
  'sports': {
    id: 'user5',
    name: 'Jamie Wilson',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80'
  },
  'wellness': {
    id: 'user8',
    name: 'Sam Taylor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80'
  },
  'social': {
    id: 'user2',
    name: 'Taylor Kim',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80'
  },
  'arts': {
    id: 'user7',
    name: 'Riley Johnson',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80'
  }
};

const mockParticipants = [
  { id: 'user2', name: 'Taylor Kim', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
  { id: 'user3', name: 'Jordan Lee', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
  { id: 'user4', name: 'Morgan Davis', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
  { id: 'user6', name: 'Casey Smith', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
  { id: 'user9', name: 'Avery Martin', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
  { id: 'user10', name: 'Jordan Parker', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
  { id: 'user12', name: 'Skyler Reyes', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
  { id: 'user13', name: 'Taylor Green', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
];

// Function to generate a description for an event if it doesn't have one
const generateDescription = (event: Event) => {
  const descriptions = {
    'Social': 'Join this social gathering to meet new people and make connections in a relaxed atmosphere. Perfect for networking and making new friends in the area.',
    'Sports': 'Get active with this sports event that welcomes all skill levels. Come for the exercise and stay for the camaraderie and team spirit.',
    'Wellness': 'Take time for yourself with this wellness-focused event. Rejuvenate your mind and body in a supportive environment.',
    'Tech': 'Connect with tech enthusiasts and industry professionals. Share ideas, learn new skills, and explore the latest innovations.',
    'Arts': 'Immerse yourself in creativity at this arts event. Express yourself and appreciate the work of others in a collaborative space.'
  };
  
  return descriptions[event.category as keyof typeof descriptions] || 
    'Join us for this exciting local event. Connect with your community and make the most of your day!';
};

const EventDetail = () => {
  const { eventId } = useParams();
  const [showAllParticipants, setShowAllParticipants] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);
  const [similarEvents, setSimilarEvents] = useState<Event[]>([]);
  
  // Load joined events from localStorage
  useEffect(() => {
    const storedJoinedEvents = JSON.parse(localStorage.getItem('joinedEvents') || '[]');
    setJoinedEvents(storedJoinedEvents);
  }, []);
  
  // Find the event from mockEvents using eventId
  const event = eventId ? mockEvents.find(e => e.id === eventId) : null;
  
  // Find similar events (same category, different event)
  useEffect(() => {
    if (event) {
      const similar = mockEvents
        .filter(e => e.id !== event.id && e.category === event.category)
        .slice(0, 3);
      setSimilarEvents(similar);
    }
  }, [event]);
  
  if (!event) {
    return (
      <div className="min-h-screen pt-6 pb-24 px-4 flex flex-col items-center justify-center">
        <AlertCircle className="w-16 h-16 text-muted-foreground mb-4" />
        <h1 className="text-xl font-semibold mb-2">Event Not Found</h1>
        <p className="text-muted-foreground mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <Link to="/explore">
          <Button>Back to Explore</Button>
        </Link>
      </div>
    );
  }
  
  // Get organizer based on category or use default
  const organizer = event.category && mockOrganizerData[event.category.toLowerCase()] 
    ? mockOrganizerData[event.category.toLowerCase()]
    : mockOrganizerData.default;
  
  // Generate random participants subset for this event
  const getEventParticipants = () => {
    const shuffled = [...mockParticipants].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 5) + 2); // 2-7 participants
  };
  
  const participants = getEventParticipants();
  
  // Generate a description if the event doesn't have one
  const description = generateDescription(event);
  
  const handleShare = () => {
    // In a real app, this would use the Web Share API or copy link
    toast.success("Event link copied to clipboard", {
      description: "Now you can share it with your friends!",
      duration: 3000
    });
  };
  
  const handleJoinEvent = (eventId: string) => {
    // Check for time overlap with existing events
    const newEvent = mockEvents.find(e => e.id === eventId);
    if (!newEvent) return;
    
    // Basic time overlap check
    const newEventEndTime = newEvent.endTime.replace('Ends at ', '');
    const hasOverlap = joinedEvents.some(joinedId => {
      const joinedEvent = mockEvents.find(e => e.id === joinedId);
      if (!joinedEvent) return false;
      const joinedEventEndTime = joinedEvent.endTime.replace('Ends at ', '');
      return newEventEndTime === joinedEventEndTime;
    });
    
    if (hasOverlap) {
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
      localStorage.setItem('browsing_locked', 'true');
    }
  };
  
  const MAX_VISIBLE_PARTICIPANTS = 5;
  const visibleParticipants = showAllParticipants 
    ? participants 
    : participants.slice(0, MAX_VISIBLE_PARTICIPANTS);
    
  return (
    <div className="min-h-screen pb-24 bg-background">
      <div className="relative h-64 md:h-80 w-full bg-black">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover opacity-80"
          onError={(e) => {
            // Fallback image if loading fails
            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1567634065309-a53e0014a26e?auto=format&fit=crop&q=80';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent"></div>
        
        <Link 
          to="/explore" 
          className="absolute top-4 left-4 p-2 rounded-full bg-background/80 backdrop-blur-sm"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        
        <Button 
          variant="ghost" 
          size="icon" 
          className="absolute top-4 right-4 p-2 rounded-full bg-background/80 backdrop-blur-sm"
          onClick={handleShare}
        >
          <Share className="w-5 h-5" />
        </Button>
      </div>
      
      <div className="px-4 py-6 max-w-2xl mx-auto -mt-20 relative z-10">
        <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-border">
          <div className="mb-4 flex items-center gap-2">
            <span className="bg-primary/20 text-primary text-xs px-3 py-1 rounded-full">
              {event.category}
            </span>
            
            {event.trending && (
              <span className="flex items-center gap-1 text-xs bg-accent/20 text-accent px-3 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" />
                <span>Trending</span>
              </span>
            )}
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mt-1">
              <Avatar className="w-6 h-6 border border-border">
                <AvatarImage src={organizer.avatar} alt={organizer.name} />
                <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">
                Organized by <span className="font-medium">{organizer.name}</span>
              </span>
            </div>
          </div>
          
          <div className="flex flex-col gap-4 mb-6">
            <div className="flex items-center text-sm text-muted-foreground">
              <MapPin className="w-5 h-5 mr-3 text-primary" />
              <div>
                <div>{event.location}</div>
                {event.distance && <div className="text-xs">{event.distance} away</div>}
              </div>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Calendar className="w-5 h-5 mr-3 text-primary" />
              <div>Today</div>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-5 h-5 mr-3 text-primary" />
              <div>{event.endTime.replace('Ends at', '')} • {event.duration}</div>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="w-5 h-5 mr-3 text-primary" />
              <div>{event.attendees} attending</div>
            </div>
            
            {event.trending && (
              <div className="flex items-center text-sm text-accent">
                <Activity className="w-5 h-5 mr-3" />
                <div>High activity in this area right now</div>
              </div>
            )}
          </div>
          
          <Separator className="my-6" />
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">About this event</h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Participants</h2>
            
            <div className="flex flex-wrap gap-3 mb-3">
              <Avatar className="w-10 h-10 border-2 border-primary">
                <AvatarImage src={organizer.avatar} alt={organizer.name} />
                <AvatarFallback>{organizer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              {visibleParticipants.map(participant => (
                <Avatar key={participant.id} className="w-10 h-10 border border-border">
                  <AvatarImage src={participant.avatar} alt={participant.name} />
                  <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              
              {!showAllParticipants && participants.length > MAX_VISIBLE_PARTICIPANTS && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="w-10 h-10 rounded-full text-xs"
                  onClick={() => setShowAllParticipants(true)}
                >
                  +{participants.length - MAX_VISIBLE_PARTICIPANTS}
                </Button>
              )}
            </div>
          </div>
          
          <div className="flex gap-3">
            <PullupButton 
              eventId={event.id} 
              className="flex-1 py-3 rounded-xl" 
              onJoinEvent={handleJoinEvent}
            />
            
            <Button variant="outline" className="rounded-xl py-3">
              <MessageCircle className="w-5 h-5 mr-2" />
              Chat
            </Button>
          </div>
        </div>
        
        {/* Similar Events Section */}
        {similarEvents.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Similar Events
            </h2>
            
            <div className="grid gap-4">
              {similarEvents.map(similarEvent => (
                <Link to={`/event/${similarEvent.id}`} key={similarEvent.id}>
                  <div className="bg-card/80 p-4 rounded-lg border border-border hover:border-primary transition-all">
                    <div className="flex items-start gap-3">
                      {similarEvent.image && (
                        <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
                          <img 
                            src={similarEvent.image} 
                            alt={similarEvent.title}
                            className="w-full h-full object-cover"
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1567634065309-a53e0014a26e?auto=format&fit=crop&q=80';
                            }}
                          />
                        </div>
                      )}
                      
                      <div className="flex-1">
                        <h3 className="font-medium mb-1">{similarEvent.title}</h3>
                        <div className="flex items-center text-xs text-muted-foreground mb-1">
                          <MapPin className="w-3 h-3 mr-1" />
                          <span>{similarEvent.location}</span>
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground">
                          <Clock className="w-3 h-3 mr-1" />
                          <span>{similarEvent.endTime.replace('Ends at', '')}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventDetail;
