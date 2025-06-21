
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { TherapistCard } from '@/components/therapist/TherapistCard';
import { Search, Filter, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const Therapist = () => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');

  const therapists = [
    {
      id: '1',
      name: language === 'th' ? 'ดร. สมหญิง ใจดี' : 'Dr. Somying Jaidee',
      photo: '',
      specialties: [
        language === 'th' ? 'ความวิตกกังวล' : 'Anxiety',
        language === 'th' ? 'ซึมเศร้า' : 'Depression',
        language === 'th' ? 'ความเครียด' : 'Stress'
      ],
      experience: 8,
      rating: 4.9,
      reviewCount: 127,
      pricePerSession: 2500,
      location: language === 'th' ? 'กรุงเทพฯ' : 'Bangkok',
      languages: [language === 'th' ? 'ไทย, อังกฤษ' : 'Thai, English'],
      isPremiumOnly: false,
      nextAvailable: language === 'th' ? 'พรุ่งนี้ 14:00' : 'Tomorrow 2:00 PM'
    },
    {
      id: '2',
      name: language === 'th' ? 'ดร. ปิยะ สุขใจ' : 'Dr. Piya Sukjai',
      photo: '',
      specialties: [
        language === 'th' ? 'ครอบครัว' : 'Family Therapy',
        language === 'th' ? 'ความสัมพันธ์' : 'Relationships',
        language === 'th' ? 'การปรับตัว' : 'Adjustment'
      ],
      experience: 12,
      rating: 4.8,
      reviewCount: 95,
      pricePerSession: 3000,
      location: language === 'th' ? 'เชียงใหม่' : 'Chiang Mai',
      languages: [language === 'th' ? 'ไทย' : 'Thai'],
      isPremiumOnly: true,
      nextAvailable: language === 'th' ? 'จันทร์หน้า 10:00' : 'Next Monday 10:00 AM'
    },
    {
      id: '3',
      name: language === 'th' ? 'ดร. นิรันดร์ สงบจิต' : 'Dr. Niran Sangobgit',
      photo: '',
      specialties: [
        language === 'th' ? 'การนั่งสมาธิ' : 'Meditation',
        language === 'th' ? 'มุมมองพุทธ' : 'Buddhist Psychology',
        language === 'th' ? 'จิตบำบัด' : 'Psychotherapy'
      ],
      experience: 15,
      rating: 4.9,
      reviewCount: 203,
      pricePerSession: 3500,
      location: language === 'th' ? 'กรุงเทพฯ' : 'Bangkok',
      languages: [language === 'th' ? 'ไทย, อังกฤษ, บาลี' : 'Thai, English, Pali'],
      isPremiumOnly: true,
      nextAvailable: language === 'th' ? 'พุธนี้ 16:30' : 'Wednesday 4:30 PM'
    },
    {
      id: '4',
      name: language === 'th' ? 'ดร. มาลี ช่วยเหลือ' : 'Dr. Malee Chuayluea',
      photo: '',
      specialties: [
        language === 'th' ? 'วัยรุ่น' : 'Adolescent',
        language === 'th' ? 'การเรียน' : 'Academic Stress',
        language === 'th' ? 'พฤติกรรม' : 'Behavioral'
      ],
      experience: 6,
      rating: 4.7,
      reviewCount: 68,
      pricePerSession: 2000,
      location: language === 'th' ? 'ภูเก็ต' : 'Phuket',
      languages: [language === 'th' ? 'ไทย, อังกฤษ' : 'Thai, English'],
      isPremiumOnly: false,
      nextAvailable: language === 'th' ? 'ศุกร์นี้ 13:00' : 'Friday 1:00 PM'
    }
  ];

  const filteredTherapists = therapists.filter(therapist => {
    const matchesSearch = therapist.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         therapist.specialties.some(specialty => 
                           specialty.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    const matchesLocation = selectedLocation === 'all' || therapist.location === selectedLocation;
    return matchesSearch && matchesLocation;
  });

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 font-thai mb-2">
          {t('therapist.title')}
        </h1>
        <p className="text-gray-600 font-thai">
          {language === 'th' 
            ? 'ค้นหานักจิตวิทยาและนักบำบัดที่เหมาะกับคุณ'
            : 'Find the right therapist and psychologist for you'
          }
        </p>
      </div>

      {/* Search & Filters */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder={language === 'th' ? 'ค้นหานักบำบัด หรือ ความเชี่ยวชาญ...' : 'Search therapist or specialty...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 font-thai"
          />
        </div>

        <div className="flex space-x-2">
          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-full font-thai">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4" />
                <SelectValue placeholder={language === 'th' ? 'เลือกพื้นที่' : 'Select Location'} />
              </div>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{language === 'th' ? 'ทุกพื้นที่' : 'All Locations'}</SelectItem>
              <SelectItem value={language === 'th' ? 'กรุงเทพฯ' : 'Bangkok'}>{language === 'th' ? 'กรุงเทพฯ' : 'Bangkok'}</SelectItem>
              <SelectItem value={language === 'th' ? 'เชียงใหม่' : 'Chiang Mai'}>{language === 'th' ? 'เชียงใหม่' : 'Chiang Mai'}</SelectItem>
              <SelectItem value={language === 'th' ? 'ภูเก็ต' : 'Phuket'}>{language === 'th' ? 'ภูเก็ต' : 'Phuket'}</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline" size="icon">
            <Filter className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Results */}
      <div className="space-y-4">
        <p className="text-sm text-gray-600 font-thai">
          {language === 'th' ? 'พบ' : 'Found'} {filteredTherapists.length} {language === 'th' ? 'นักบำบัด' : 'therapists'}
        </p>

        {filteredTherapists.map((therapist) => (
          <TherapistCard key={therapist.id} {...therapist} />
        ))}
      </div>

      {/* Premium Upgrade Prompt */}
      {filteredTherapists.some(t => t.isPremiumOnly) && (
        <div className="mt-8 p-6 bg-gradient-to-r from-zen-gold/20 to-zen-lotus/20 rounded-2xl text-center">
          <h3 className="font-semibold text-gray-800 mb-2 font-thai">
            {language === 'th' ? 'ต้องการนักบำบัดพิเศษเพิ่มเติม?' : 'Want access to premium therapists?'}
          </h3>
          <p className="text-sm text-gray-600 font-thai mb-4">
            {language === 'th' 
              ? 'อัปเกรดเป็นสมาชิกพรีเมียมเพื่อเข้าถึงนักบำบัดผู้เชี่ยวชาญระดับสูง'
              : 'Upgrade to premium to access highly specialized therapists'
            }
          </p>
          <Button className="zen-button">
            {language === 'th' ? 'อัปเกรดเป็นพรีเมียม' : 'Upgrade to Premium'}
          </Button>
        </div>
      )}
    </div>
  );
};

export default Therapist;
