
import { useLanguage } from '@/contexts/LanguageContext';
import { LotusBloom } from '@/components/animations/ZenAnimations';
import { Loader2 } from 'lucide-react';

interface ZenLoadingProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const ZenLoading = ({ message, size = 'md' }: ZenLoadingProps) => {
  const { t, fontClass } = useLanguage();

  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12'
  };

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="relative">
        <LotusBloom size={size} />
        <Loader2 className={`${sizeClasses[size]} animate-spin absolute inset-0 m-auto text-zen-green`} />
      </div>
      <p className={`text-gray-600 text-center ${fontClass}`}>
        {message || t('common.loading')}
      </p>
    </div>
  );
};

export const ZenError = ({ message, onRetry }: { message: string; onRetry?: () => void }) => {
  const { t, fontClass } = useLanguage();

  return (
    <div className="flex flex-col items-center justify-center p-8 space-y-4">
      <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
        <span className="text-red-600 text-xl">⚠️</span>
      </div>
      <p className={`text-red-600 text-center ${fontClass}`}>
        {message}
      </p>
      {onRetry && (
        <button
          onClick={onRetry}
          className={`text-zen-green hover:underline ${fontClass}`}
        >
          {t('common.try_again') || 'Try Again'}
        </button>
      )}
    </div>
  );
};
