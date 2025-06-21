
import { useLanguage } from '@/contexts/LanguageContext';
import { Star, MapPin, Award, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface TherapistCardProps {
  id: string;
  name: string;
  photo: string;
  specialties: string[];
  experience: number;
  rating: number;
  reviewCount: number;
  pricePerSession: number;
  location: string;
  languages: string[];
  isPremiumOnly?: boolean;
  nextAvailable?: string;
}

export const TherapistCard = ({
  id,
  name,
  photo,
  specialties,
  experience,
  rating,
  reviewCount,
  pricePerSession,
  location,
  languages,
  isPremiumOnly = false,
  nextAvailable
}: TherapistCardProps) => {
  const { language, t } = useLanguage();

  const handleBookSession = () => {
    console.log(`Booking session with therapist ${id}`);
    // Here you would open booking modal or navigate to booking page
  };

  return (
    <Card className="zen-card border-0 hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="w-16 h-16">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback className="bg-zen-mint text-zen-green text-lg font-semibold">
              {name.substring(0, 2)}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <div className="flex items-start justify-between mb-2">
              <div>
                <h3 className="font-semibold text-gray-800 font-thai text-lg">
                  {name}
                </h3>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="flex items-center space-x-1">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-sm text-gray-600">{rating}</span>
                    <span className="text-xs text-gray-500">({reviewCount})</span>
                  </div>
                  <div className="flex items-center space-x-1 text-gray-600">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">{experience} {t('therapist.years')}</span>
                  </div>
                </div>
              </div>
              
              {isPremiumOnly && (
                <Badge className="bg-zen-gold text-white text-xs">
                  {language === 'th' ? 'พรีเมียม' : 'Premium'}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-1 text-gray-600 mb-2">
              <MapPin className="w-3 h-3" />
              <span className="text-sm font-thai">{location}</span>
            </div>
          </div>
        </div>

        {/* Specialties */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {specialties.slice(0, 3).map((specialty, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="bg-zen-pearl text-zen-green text-xs"
              >
                {specialty}
              </Badge>
            ))}
            {specialties.length > 3 && (
              <Badge variant="secondary" className="bg-gray-100 text-gray-600 text-xs">
                +{specialties.length - 3}
              </Badge>
            )}
          </div>
        </div>

        {/* Languages */}
        <div className="mb-4">
          <p className="text-xs text-gray-600 font-thai">
            {language === 'th' ? 'ภาษา: ' : 'Languages: '}
            {languages.join(', ')}
          </p>
        </div>

        {/* Availability & Price */}
        <div className="flex items-center justify-between mb-4">
          {nextAvailable && (
            <div className="flex items-center space-x-1 text-gray-600">
              <Clock className="w-3 h-3" />
              <span className="text-xs font-thai">
                {language === 'th' ? 'ว่างถัดไป: ' : 'Next available: '}
                {nextAvailable}
              </span>
            </div>
          )}
          <div className="text-right">
            <p className="text-lg font-bold text-zen-green">
              ฿{pricePerSession.toLocaleString()}
            </p>
            <p className="text-xs text-gray-600 font-thai">
              {language === 'th' ? 'ต่อเซสชั่น' : 'per session'}
            </p>
          </div>
        </div>

        {/* Book Button */}
        <Button 
          onClick={handleBookSession}
          className="w-full zen-button"
          disabled={isPremiumOnly}
        >
          {isPremiumOnly 
            ? (language === 'th' ? 'อัปเกรดเพื่อจอง' : 'Upgrade to Book')
            : t('therapist.book')
          }
        </Button>
      </CardContent>
    </Card>
  );
};
