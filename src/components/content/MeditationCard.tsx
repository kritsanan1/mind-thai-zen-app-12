
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, Pause, Clock, Star, Lock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MeditationCardProps {
  id: string;
  title: string;
  duration: number;
  theme: string;
  thumbnail: string;
  isPremium?: boolean;
  rating?: number;
  description?: string;
}

export const MeditationCard = ({ 
  id, 
  title, 
  duration, 
  theme, 
  thumbnail, 
  isPremium = false, 
  rating = 4.8,
  description 
}: MeditationCardProps) => {
  const { language, t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlay = () => {
    if (isPremium) {
      // Show premium upgrade modal
      console.log('Show premium upgrade modal');
      return;
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <Card className="zen-card border-0 overflow-hidden group hover:scale-105 transition-all duration-300">
      <div className="relative">
        <div 
          className="h-32 bg-gradient-to-br from-zen-mint to-zen-green bg-cover bg-center"
          style={{ 
            backgroundImage: thumbnail ? `url(${thumbnail})` : undefined 
          }}
        >
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
          
          {isPremium && (
            <Badge className="absolute top-2 right-2 bg-zen-gold text-white">
              <Lock className="w-3 h-3 mr-1" />
              {language === 'th' ? 'พรีเมียม' : 'Premium'}
            </Badge>
          )}
          
          <Button
            onClick={handlePlay}
            className="absolute inset-0 w-full h-full bg-transparent hover:bg-transparent border-0 shadow-none"
          >
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
              {isPlaying ? (
                <Pause className="w-6 h-6 text-zen-green" />
              ) : (
                <Play className="w-6 h-6 text-zen-green ml-1" />
              )}
            </div>
          </Button>
        </div>
      </div>
      
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <Badge variant="secondary" className="bg-zen-pearl text-zen-green text-xs">
            {theme}
          </Badge>
          <div className="flex items-center space-x-1">
            <Star className="w-3 h-3 text-yellow-400 fill-current" />
            <span className="text-xs text-gray-600">{rating}</span>
          </div>
        </div>
        
        <h3 className="font-semibold text-gray-800 mb-2 font-thai text-sm">
          {title}
        </h3>
        
        {description && (
          <p className="text-xs text-gray-600 font-thai mb-3 line-clamp-2">
            {description}
          </p>
        )}
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-1 text-gray-600">
            <Clock className="w-3 h-3" />
            <span className="text-xs font-thai">
              {duration} {t('content.minutes')}
            </span>
          </div>
          
          <Button 
            size="sm" 
            className="zen-button text-xs px-3 py-1"
            onClick={handlePlay}
          >
            {t('content.start')}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
