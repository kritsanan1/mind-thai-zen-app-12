
import { ReactNode } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';

interface ZenLayoutProps {
  children: ReactNode;
  className?: string;
  showBackground?: boolean;
}

export const ZenLayout = ({ children, className, showBackground = true }: ZenLayoutProps) => {
  const { fontClass } = useLanguage();

  return (
    <div 
      className={cn(
        "min-h-screen",
        fontClass,
        showBackground && "thai-gradient",
        className
      )}
    >
      {children}
    </div>
  );
};

interface ZenContainerProps {
  children: ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl';
}

export const ZenContainer = ({ children, className, maxWidth = 'md' }: ZenContainerProps) => {
  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl'
  };

  return (
    <div className={cn("mx-auto px-4", maxWidthClasses[maxWidth], className)}>
      {children}
    </div>
  );
};
