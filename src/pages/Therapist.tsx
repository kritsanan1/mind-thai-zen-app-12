
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Users, Star, Calendar, Filter, MapPin, Clock } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';

interface TherapistProfile {
  id: string;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  price: number;
  location: string;
  languages: string[];
  isPremium: boolean;
  available: boolean;
  image: string;
}

const Therapist = () => {
  const { t, language } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'premium' | 'available'>('all');

  const therapists: TherapistProfile[] = [
    {
      id: '1',
      name: language === 'th' ? 'ดร.สมใจ ใจดี' : 'Dr. Somjai Jaidee',
      specialty: language === 'th' ? 'จิตบำบัดเชิงพุทธ' : 'Buddhist Psychotherapy',
      experience: 8,
      rating: 4.9,
      price: 1200,
      location: language === 'th' ? 'กรุงเทพมหานคร' : 'Bangkok',
      languages: ['ไทย', 'English'],
      isPremium: false,
      available: true,
      image: '👩‍⚕️'
    },
    {
      id: '2',
      name: language === 'th' ? 'ดร.วิชัย สุขใจ' : 'Dr. Wichai Sukjai',
      specialty: language === 'th' ? 'จิตบำบัดเด็กและวัยรุ่น' : 'Child & Teen Therapy',
      experience: 12,
      rating: 4.8,
      price: 1500,
      location: language === 'th' ? 'เชียงใหม่' : 'Chiang Mai',
      languages: ['ไทย', 'English'],
      isPremium: true,
      available: true,
      image: '👨‍⚕️'
    },
    {
      id: '3',
      name: language === 'th' ? 'ดร.มาลี ใส่ใจ' : 'Dr. Malee Saijai',
      specialty: language === 'th' ? 'จิตบำบัดครอบครัว' : 'Family Therapy',
      experience: 6,
      rating: 4.7,
      price: 1000,
      location: language === 'th' ? 'ภูเก็ต' : 'Phuket',
      languages: ['ไทย'],
      isPremium: false,
      available: false,
      image: '👩‍⚕️'
    }
  ];

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         therapist.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    
    switch (selectedFilter) {
      case 'premium':
        return matchesSearch && therapist.isPremium;
      case 'available':
        return matchesSearch && therapist.available;
      default:
        return matchesSearch;
    }
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="lotus-glow w-12 h-12 mx-auto mb-3">
          <Users className="w-6 h-6 text-zen-green mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 font-thai">
          {t('therapist.title')}
        </h1>
        <p className="text-gray-600 font-thai">
          {language === 'th' 
            ? 'เลือกนักบำบัดที่เหมาะกับคุณ' 
            : 'Find the right therapist for you'
          }
        </p>
      </div>

      {/* Search and Filter */}
      <div className="space-y-4">
        <div className="zen-card p-4">
          <div className="flex items-center space-x-2">
            <Input
              placeholder={language === 'th' ? 'ค้นหานักบำบัด...' : 'Search therapists...'}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="zen-input flex-1"
            />
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="zen-card p-2 flex rounded-2xl">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`flex-1 py-2 px-4 rounded-xl font-medium font-thai text-sm transition-all ${
              selectedFilter === 'all'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            {language === 'th' ? 'ทั้งหมด' : 'All'}
          </button>
          <button
            onClick={() => setSelectedFilter('available')}
            className={`flex-1 py-2 px-4 rounded-xl font-medium font-thai text-sm transition-all ${
              selectedFilter === 'available'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            {language === 'th' ? 'ว่าง' : 'Available'}
          </button>
          <button
            onClick={() => setSelectedFilter('premium')}
            className={`flex-1 py-2 px-4 rounded-xl font-medium font-thai text-sm transition-all ${
              selectedFilter === 'premium'
                ? 'bg-blue-500 text-white shadow-lg'
                : 'text-gray-600 hover:text-blue-500'
            }`}
          >
            Premium
          </button>
        </div>
      </div>

      {/* Therapist List */}
      <div className="space-y-4">
        {filteredTherapists.map((therapist) => (
          <Card key={therapist.id} className="zen-card border-0 hover:scale-102 transition-transform">
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className="text-4xl">{therapist.image}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h3 className="font-semibold text-gray-800 font-thai">
                        {therapist.name}
                      </h3>
                      <p className="text-sm text-gray-600 font-thai">
                        {therapist.specialty}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {therapist.isPremium && (
                        <Badge className="bg-zen-gold text-white text-xs">
                          Premium
                        </Badge>
                      )}
                      {therapist.available && (
                        <Badge className="bg-green-100 text-green-800 text-xs">
                          {language === 'th' ? 'ว่าง' : 'Available'}
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span>{therapist.rating}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span className="font-thai">
                            {therapist.experience} {t('therapist.years')}
                          </span>
                        </div>
                      </div>
                      <div className="text-lg font-semibold text-zen-green">
                        ฿{therapist.price}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1 text-sm text-gray-600">
                      <MapPin className="w-4 h-4" />
                      <span className="font-thai">{therapist.location}</span>
                    </div>

                    <div className="flex items-center space-x-2">
                      {therapist.languages.map((lang) => (
                        <Badge key={lang} variant="outline" className="text-xs">
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <Button 
                      className="zen-button flex-1 text-sm"
                      disabled={!therapist.available || therapist.isPremium}
                    >
                      <Calendar className="w-4 h-4 mr-1" />
                      {t('therapist.book')}
                    </Button>
                    <Button variant="outline" className="text-sm px-4">
                      {language === 'th' ? 'ดูโปรไฟล์' : 'View Profile'}
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Premium Upgrade */}
      <Card className="zen-card border-0 bg-gradient-to-r from-zen-gold/20 to-zen-lotus/20">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-zen-gold rounded-full mx-auto mb-3 flex items-center justify-center">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2 font-thai">
            {language === 'th' ? 'จองนักบำบัดพรีเมียม' : 'Book Premium Therapists'}
          </h3>
          <p className="text-sm text-gray-600 font-thai mb-4">
            {language === 'th' 
              ? 'เข้าถึงนักบำบัดมืออาชีพระดับพรีเมียม'
              : 'Access premium professional therapists'
            }
          </p>
          <Button className="zen-button text-sm px-6 py-2">
            {language === 'th' ? 'อัปเกรดตอนนี้' : 'Upgrade Now'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Therapist;
