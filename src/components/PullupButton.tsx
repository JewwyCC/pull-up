
import React, { useState, useEffect } from 'react';
import { ArrowUp, Check } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { mockEvents } from '@/data/mockData';

interface PullupButtonProps {
  eventId: string;
  className?: string;
  onJoinEvent?: (eventId: string) => void;
}

const PullupButton = ({ eventId, className, onJoinEvent }: PullupButtonProps) => {
  const [isPulledUp, setIsPulledUp] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

  // Check localStorage on component mount to see if user already joined this event
  useEffect(() => {
    const joinedEvents = JSON.parse(localStorage.getItem('joinedEvents') || '[]');
    if (joinedEvents.includes(eventId)) {
      setIsPulledUp(true);
    }
  }, [eventId]);
  
  // Check if event time overlaps with already joined events
  const checkEventOverlap = () => {
    const joinedEvents = JSON.parse(localStorage.getItem('joinedEvents') || '[]');
    const newEvent = mockEvents.find(e => e.id === eventId);
    if (!newEvent) return false;
    
    // Convert event times to comparable values
    const newEventEndTime = newEvent.endTime.replace('Ends at ', '');
    
    // Check if any joined event overlaps with the new event
    for (const joinedEventId of joinedEvents) {
      // Don't check against itself
      if (joinedEventId === eventId) continue;
      
      const joinedEvent = mockEvents.find(e => e.id === joinedEventId);
      if (!joinedEvent) continue;
      
      const joinedEventEndTime = joinedEvent.endTime.replace('Ends at ', '');
      
      // Simple overlap check - in a real app this would be more sophisticated
      if (newEventEndTime === joinedEventEndTime) {
        return true; // Events overlap
      }
    }
    
    return false; // No overlap
  };

  const handlePullup = () => {
    if (isPulledUp) {
      // If already joined, navigate to event page
      navigate(`/event/${eventId}`);
      return;
    }
    
    // Check for time conflicts
    if (checkEventOverlap()) {
      toast.error("Cannot join this event", {
        description: "You already have another event scheduled at this time",
        duration: 3000,
      });
      return;
    }
    
    setIsAnimating(true);
    
    // Simulate API call to join event
    setTimeout(() => {
      setIsPulledUp(true);
      setIsAnimating(false);
      
      // Store joined event in localStorage
      const joinedEvents = JSON.parse(localStorage.getItem('joinedEvents') || '[]');
      if (!joinedEvents.includes(eventId)) {
        joinedEvents.push(eventId);
        localStorage.setItem('joinedEvents', JSON.stringify(joinedEvents));
        
        // Automatically lock browsing
        localStorage.setItem('browsing_locked', 'true');
      }
      
      // Call the onJoinEvent callback if provided
      if (onJoinEvent) {
        onJoinEvent(eventId);
      }
      
      toast.success("You've joined this event!", {
        description: "Browsing has been locked to your events. You can unlock it any time.",
        duration: 3000,
      });
      
      // Navigate to event page
      navigate(`/event/${eventId}`);
    }, 600);
  };

  return (
    <button
      onClick={handlePullup}
      disabled={isAnimating}
      className={cn(
        'pullup-button w-full flex items-center justify-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground rounded-lg transition-all px-4 py-2 hover:-translate-y-1',
        isPulledUp && 'bg-muted text-muted-foreground hover:bg-muted hover:translate-y-0',
        isAnimating && 'animate-pulse',
        className
      )}
    >
      {isPulledUp ? (
        <>
          <Check className="w-5 h-5" />
          <span>View Event</span>
        </>
      ) : (
        <>
          <ArrowUp className="w-5 h-5" />
          <span>Pullup</span>
        </>
      )}
    </button>
  );
};

export default PullupButton;
