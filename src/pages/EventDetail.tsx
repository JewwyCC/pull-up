
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  Calendar, Clock, MapPin, Users, ArrowLeft, 
  Share, MessageCircle, CalendarCheck, AlertCircle 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import PullupButton from '@/components/PullupButton';

// Mock data - in a real app, this would come from an API
const mockEventData = {
  '1': {
    id: '1',
    title: 'Morning Coffee Meetup',
    description: 'Start your day with great coffee and even better conversations. Casual networking for professionals. Join us for a relaxed morning to connect with like-minded individuals.',
    location: 'Brew & Bean, 123 Downtown Ave',
    time: '8:00 AM',
    date: 'Today',
    duration: '1.5 hours',
    attendees: 12,
    distance: '0.8 mi',
    category: 'Social',
    trending: true,
    organizer: {
      id: 'user1',
      name: 'Alex Chen',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80'
    },
    participants: [
      { id: 'user2', name: 'Taylor Kim', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
      { id: 'user3', name: 'Jordan Lee', avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
      { id: 'user4', name: 'Morgan Davis', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
    ],
    image: 'https://images.unsplash.com/photo-1485182708500-e8f1f318ba72?auto=format&fit=crop&q=80'
  },
  '2': {
    id: '2',
    title: 'Pickup Basketball Game',
    description: 'Join us for a friendly 3v3 basketball game at the park. All skill levels welcome! We have extra gear if needed.',
    location: 'Central Park Courts',
    time: '5:30 PM',
    date: 'Today',
    duration: '2 hours',
    attendees: 8,
    distance: '1.2 mi',
    category: 'Sports',
    trending: false,
    organizer: {
      id: 'user5',
      name: 'Jamie Wilson',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80'
    },
    participants: [
      { id: 'user6', name: 'Casey Smith', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
      { id: 'user7', name: 'Riley Johnson', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
    ],
    image: 'https://images.unsplash.com/photo-1546519638-68e109acd27d?auto=format&fit=crop&q=80'
  },
  '3': {
    id: '3',
    title: 'Sunset Beach Yoga',
    description: 'Relax and recharge with a guided yoga session as the sun sets over the ocean. Perfect for all levels.',
    location: 'Venice Beach',
    time: '7:00 PM',
    date: 'Today',
    duration: '1 hour',
    attendees: 15,
    distance: '2.5 mi',
    category: 'Wellness',
    trending: true,
    organizer: {
      id: 'user8',
      name: 'Sam Taylor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80'
    },
    participants: [
      { id: 'user9', name: 'Avery Martin', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
      { id: 'user10', name: 'Jordan Parker', avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
    ],
    image: 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&q=80'
  },
  '4': {
    id: '4',
    title: 'Tech Startup Networking',
    description: 'Connect with local entrepreneurs and tech enthusiasts. Share ideas and find potential collaborators.',
    location: 'Innovation Hub, Silicon Beach',
    time: '6:00 PM',
    date: 'Tomorrow',
    duration: '3 hours',
    attendees: 28,
    distance: '3.1 mi',
    category: 'Tech',
    trending: false,
    organizer: {
      id: 'user11',
      name: 'Quinn Lopez',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80'
    },
    participants: [
      { id: 'user12', name: 'Skyler Reyes', avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
      { id: 'user13', name: 'Taylor Green', avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80' },
    ],
    image: 'https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80'
  }
};

const EventDetail = () => {
  const { eventId } = useParams();
  const [showAllParticipants, setShowAllParticipants] = useState(false);
  const [joinedEvents, setJoinedEvents] = useState<string[]>([]);
  
  // Load joined events from localStorage
  useEffect(() => {
    const storedJoinedEvents = JSON.parse(localStorage.getItem('joinedEvents') || '[]');
    setJoinedEvents(storedJoinedEvents);
  }, []);
  
  // In a real app, this would fetch from an API
  const event = eventId ? mockEventData[eventId as keyof typeof mockEventData] : null;
  
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
  
  const handleShare = () => {
    // In a real app, this would use the Web Share API or copy link
    toast.success("Event link copied to clipboard", {
      description: "Now you can share it with your friends!",
      duration: 3000
    });
  };
  
  const handleJoinEvent = (eventId: string) => {
    if (!joinedEvents.includes(eventId)) {
      const updatedJoinedEvents = [...joinedEvents, eventId];
      setJoinedEvents(updatedJoinedEvents);
      localStorage.setItem('joinedEvents', JSON.stringify(updatedJoinedEvents));
    }
  };
  
  const MAX_VISIBLE_PARTICIPANTS = 5;
  const visibleParticipants = showAllParticipants 
    ? event.participants 
    : event.participants.slice(0, MAX_VISIBLE_PARTICIPANTS);
    
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
          <div className="mb-4">
            <span className="bg-primary/20 text-primary text-xs px-3 py-1 rounded-full">
              {event.category}
            </span>
          </div>
          
          <h1 className="text-2xl font-bold mb-2">{event.title}</h1>
          
          <div className="mb-6">
            <div className="flex items-center gap-2 mt-1">
              <Avatar className="w-6 h-6 border border-border">
                <AvatarImage src={event.organizer.avatar} alt={event.organizer.name} />
                <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <span className="text-sm">
                Organized by <span className="font-medium">{event.organizer.name}</span>
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
              <div>{event.date}</div>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock className="w-5 h-5 mr-3 text-primary" />
              <div>{event.time} • {event.duration}</div>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="w-5 h-5 mr-3 text-primary" />
              <div>{event.attendees} attending</div>
            </div>
          </div>
          
          <Separator className="my-6" />
          
          <div className="mb-6">
            <h2 className="text-lg font-semibold mb-3">About this event</h2>
            <p className="text-sm text-muted-foreground">{event.description}</p>
          </div>
          
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Participants</h2>
            
            <div className="flex flex-wrap gap-3 mb-3">
              <Avatar className="w-10 h-10 border-2 border-primary">
                <AvatarImage src={event.organizer.avatar} alt={event.organizer.name} />
                <AvatarFallback>{event.organizer.name.charAt(0)}</AvatarFallback>
              </Avatar>
              
              {visibleParticipants.map(participant => (
                <Avatar key={participant.id} className="w-10 h-10 border border-border">
                  <AvatarImage src={participant.avatar} alt={participant.name} />
                  <AvatarFallback>{participant.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              
              {!showAllParticipants && event.participants.length > MAX_VISIBLE_PARTICIPANTS && (
                <Button 
                  variant="outline" 
                  size="icon" 
                  className="w-10 h-10 rounded-full text-xs"
                  onClick={() => setShowAllParticipants(true)}
                >
                  +{event.participants.length - MAX_VISIBLE_PARTICIPANTS}
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
      </div>
    </div>
  );
};

export default EventDetail;
