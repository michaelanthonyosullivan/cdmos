import { useEffect, useState, forwardRef } from 'react';
import { soundEffects } from '@/hooks/useSoundEffects';

interface CountdownTimerProps {
  duration: number;
  isRunning: boolean;
  onComplete: () => void;
  size?: number;
}

export const CountdownTimer = forwardRef<HTMLDivElement, CountdownTimerProps>(({ 
  duration, 
  isRunning, 
  onComplete,
  size = 180 
}, ref) => {
  const [timeLeft, setTimeLeft] = useState(duration);
  
  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    if (!isRunning) {
      soundEffects.stopTicking();
      return;
    }

    // Start ticking sound
    soundEffects.startTicking(timeLeft);

    if (timeLeft <= 0) {
      soundEffects.stopTicking();
      soundEffects.playTimeUp();
      onComplete();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          soundEffects.stopTicking();
          soundEffects.playTimeUp();
          onComplete();
          return 0;
        }
        // Update ticking sound based on time left
        soundEffects.startTicking(prev - 1);
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      soundEffects.stopTicking();
    };
  }, [isRunning, timeLeft, onComplete]);

  const progress = (timeLeft / duration) * 100;
  const circumference = 2 * Math.PI * 70;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  const getTimerClass = () => {
    if (timeLeft <= 5) return 'danger';
    if (timeLeft <= 10) return 'warning';
    return '';
  };

  return (
    <div ref={ref} className="relative" style={{ width: size, height: size }}>
      <svg
        className="transform -rotate-90"
        width={size}
        height={size}
        viewBox="0 0 160 160"
      >
        {/* Background circle */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          stroke="hsl(var(--muted))"
          strokeWidth="8"
        />
        {/* Progress circle */}
        <circle
          cx="80"
          cy="80"
          r="70"
          fill="none"
          strokeWidth="8"
          strokeLinecap="round"
          className={`timer-ring ${getTimerClass()} transition-all duration-300`}
          style={{
            strokeDasharray: circumference,
            strokeDashoffset: strokeDashoffset,
          }}
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span 
          className={`font-display font-bold transition-colors duration-300 ${
            size <= 120 
              ? 'text-3xl md:text-4xl' 
              : 'text-4xl md:text-5xl'
          } ${
            timeLeft <= 5 
              ? 'text-timer-danger' 
              : timeLeft <= 10 
                ? 'text-timer-warning' 
                : 'text-foreground'
          }`}
        >
          {timeLeft}
        </span>
      </div>
    </div>
  );
});

CountdownTimer.displayName = 'CountdownTimer';