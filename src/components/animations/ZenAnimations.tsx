
import React from 'react';
import { cn } from '@/lib/utils';

interface FloatingElementProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

export const FloatingElement = ({ children, className, delay = 0 }: FloatingElementProps) => {
  return (
    <div 
      className={cn("meditation-float", className)}
      style={{ animationDelay: `${delay}s` }}
    >
      {children}
    </div>
  );
};

interface LotusBloomProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LotusBloom = ({ className, size = 'md' }: LotusBloomProps) => {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={cn("lotus-bloom lotus-glow", sizeClasses[size], className)}>
      <div className="w-full h-full bg-gradient-to-br from-zen-lotus to-zen-blue rounded-full" />
    </div>
  );
};

interface ZenPulseProps {
  children: React.ReactNode;
  className?: string;
}

export const ZenPulse = ({ children, className }: ZenPulseProps) => {
  return (
    <div className={cn("animate-zen-pulse", className)}>
      {children}
    </div>
  );
};

interface BreathingCircleProps {
  isActive: boolean;
  size?: number;
  className?: string;
}

export const BreathingCircle = ({ isActive, size = 100, className }: BreathingCircleProps) => {
  return (
    <div 
      className={cn(
        "rounded-full bg-gradient-to-br from-zen-blue to-zen-mint transition-all duration-4000 ease-in-out",
        {
          "scale-150 opacity-70": isActive,
          "scale-100 opacity-90": !isActive
        },
        className
      )}
      style={{ 
        width: size, 
        height: size,
        boxShadow: isActive 
          ? '0 0 40px rgba(46, 125, 50, 0.3)' 
          : '0 0 20px rgba(46, 125, 50, 0.2)'
      }}
    />
  );
};

// Micro-animation utility hooks
export const useMicroAnimation = () => {
  const buttonClick = "transform transition-all duration-200 hover:scale-105 active:scale-95";
  const cardHover = "transition-all duration-300 hover:shadow-xl hover:-translate-y-1";
  const fadeIn = "animate-in fade-in-0 duration-500";
  const slideUp = "animate-in slide-in-from-bottom-4 duration-500";
  const scaleIn = "animate-in zoom-in-95 duration-300";
  
  return {
    buttonClick,
    cardHover,
    fadeIn,
    slideUp,
    scaleIn
  };
};
