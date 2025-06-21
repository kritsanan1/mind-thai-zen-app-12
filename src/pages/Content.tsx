
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MeditationCard } from '@/components/content/MeditationCard';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Content = () => {
  const { language, t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');

  const meditationSessions = [
    {
      id: '1',
      title: language === 'th' ? 'การนั่งสมาธิเพื่อความสงบ' : 'Mindful Peace Meditation',
      duration: 5,
      theme: language === 'th' ? 'ความสงบ' : 'Peace',
      thumbnail: '',
      isPremium: false,
      rating: 4.8,
      description: language === 'th' 
        ? 'การนั่งสมาธิที่ช่วยให้จิตใจสงบและผ่อนคลาย'
        : 'A gentle meditation to calm your mind and relax your body'
    },
    {
      id: '2',
      title: language === 'th' ? 'เทคนิคการหายใจลึก' : 'Deep Breathing Technique',
      duration: 10,
      theme: language === 'th' ? 'การหายใจ' : 'Breathing',
      thumbnail: '',
      isPremium: false,
      rating: 4.9,
      description: language === 'th'
        ? 'แบบฝึกหายใจที่ช่วยลดความเครียดและความวิตกกังวล'
        : 'Breathing exercises to reduce stress and anxiety'
    },
    {
      id: '3',
      title: language === 'th' ? 'การนั่งสมาธิก่อนนอน' : 'Sleep Meditation',
      duration: 15,
      theme: language === 'th' ? 'การนอน' : 'Sleep',
      thumbnail: '',
      isPremium: true,
      rating: 4.7,
      description: language === 'th'
        ? 'การนั่งสมาธิที่ช่วยให้หลับลึกและพักผ่อนได้ดี'
        : 'Guided meditation for better sleep and deep rest'
    },
    {
      id: '4',
      title: language === 'th' ? 'อานาปานสติ' : 'Anapanasati Meditation',
      duration: 20,
      theme: language === 'th' ? 'พุทธศาสน์' : 'Buddhist',
      thumbnail: '',
      isPremium: true,
      rating: 4.9,
      description: language === 'th'
        ? 'การสังเกตลมหายใจตามแบบพุทธศาสตร์'
        : 'Traditional Buddhist breathing meditation practice'
    }
  ];

  const breathingExercises = [
    {
      id: '5',
      title: language === 'th' ? 'หายใจ 4-7-8' : '4-7-8 Breathing',
      duration: 5,
      theme: language === 'th' ? 'เทคนิค' : 'Technique',
      thumbnail: '',
      isPremium: false,
      rating: 4.6,
      description: language === 'th'
        ? 'เทคนิคการหายใจที่ช่วยให้หลับเร็วขึ้น'
        : 'Breathing technique to help you fall asleep faster'
    },
    {
      id: '6',
      title: language === 'th' ? 'การหายใจแบบกล่อง' : 'Box Breathing',
      duration: 8,
      theme: language === 'th' ? 'ความเข้มข้น' : 'Focus',
      thumbnail: '',
      isPremium: false,
      rating: 4.5,
      description: language === 'th'
        ? 'การหายใจที่ช่วยเพิ่มสมาธิและความมั่นคง'
        : 'Structured breathing for focus and stability'
    }
  ];

  const articles = [
    {
      id: '7',
      title: language === 'th' ? 'ความสำคัญของสุขภาพจิต' : 'Importance of Mental Health',
      duration: 3,
      theme: language === 'th' ? 'บทความ' : 'Article',
      thumbnail: '',
      isPremium: false,
      rating: 4.4,
      description: language === 'th'
        ? 'เข้าใจความสำคัญของการดูแลสุขภาพจิตในยุคปัจจุบัน'
        : 'Understanding the importance of mental health in modern times'
    }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-bold text-gray-800 font-thai mb-2">
          {t('content.meditation')} & {t('content.articles')}
        </h1>
        <p className="text-gray-600 font-thai">
          {language === 'th' 
            ? 'เนื้อหาที่จะช่วยดูแลสุขภาพจิตของคุณ'
            : 'Content to nurture your mental wellness'
          }
        </p>
      </div>

      {/* Search & Filter */}
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder={language === 'th' ? 'ค้นหาเนื้อหา...' : 'Search content...'}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 font-thai"
          />
        </div>
        <Button variant="outline" size="icon">
          <Filter className="w-4 h-4" />
        </Button>
      </div>

      {/* Content Tabs */}
      <Tabs defaultValue="meditation" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="meditation" className="font-thai">
            {t('content.meditation')}
          </TabsTrigger>
          <TabsTrigger value="breathing" className="font-thai">
            {t('content.breathing')}
          </TabsTrigger>
          <TabsTrigger value="articles" className="font-thai">
            {t('content.articles')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="meditation" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {meditationSessions.map((session) => (
              <MeditationCard key={session.id} {...session} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="breathing" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {breathingExercises.map((exercise) => (
              <MeditationCard key={exercise.id} {...exercise} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="articles" className="space-y-4">
          <div className="grid grid-cols-1 gap-4">
            {articles.map((article) => (
              <MeditationCard key={article.id} {...article} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Content;
