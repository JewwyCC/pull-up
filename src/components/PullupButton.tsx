
import React, { useState } from 'react';
import { ArrowUp, Check } from 'lucide-react';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';

interface PullupButtonProps {
  eventId: string;
  className?: string;
}

const PullupButton = ({ eventId, className }: PullupButtonProps) => {
  const [isPulledUp, setIsPulledUp] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handlePullup = () => {
    if (isPulledUp) return;
    
    setIsAnimating(true);
    
    // Simulate API call to join event
    setTimeout(() => {
      setIsPulledUp(true);
      setIsAnimating(false);
      toast.success("You've joined this event!", {
        description: "Check your calendar for details",
        duration: 3000,
      });
    }, 600);
  };

  return (
    <button
      onClick={handlePullup}
      disabled={isPulledUp || isAnimating}
      className={cn(
        'pullup-button w-full flex items-center justify-center gap-2',
        isPulledUp && 'bg-muted text-muted-foreground hover:bg-muted hover:translate-y-0',
        isAnimating && 'animate-pulse',
        className
      )}
    >
      {isPulledUp ? (
        <>
          <Check className="w-5 h-5" />
          <span>Joined</span>
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
