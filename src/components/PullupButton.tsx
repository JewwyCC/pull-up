
import React, { useState, useEffect } from 'react';
import { ArrowUp, Check } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

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

  const handlePullup = () => {
    if (isPulledUp) {
      // If already joined, navigate to event page
      navigate(`/event/${eventId}`);
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
      }
      
      // Call the onJoinEvent callback if provided
      if (onJoinEvent) {
        onJoinEvent(eventId);
      }
      
      toast.success("You've joined this event!", {
        description: "Check your calendar for details",
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
