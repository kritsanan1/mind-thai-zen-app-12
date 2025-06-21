
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Play, Clock, Star, BookOpen, Wind } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface MeditationContent {
  id: string;
  title: string;
  description: string;
  duration: number;
  type: 'meditation' | 'breathing' | 'article';
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  isPremium: boolean;
  thumbnail: string;
}

const Content = () => {
  const { t, language } = useLanguage();
  const [activeTab, setActiveTab] = useState<'meditation' | 'breathing' | 'articles'>('meditation');

  const meditationContent: MeditationContent[] = [
    {
      id: '1',
      title: language === 'th' ? 'การนั่งสมาธิเบื้องต้น' : 'Basic Mindfulness',
      description: language === 'th' ? 'เรียนรู้พื้นฐานการนั่งสมาธิแบบไทย' : 'Learn basic Thai meditation techniques',
      duration: 5,
      type: 'meditation',
      difficulty: 'beginner',
      isPremium: false,
      thumbnail: '🧘‍♀️'
    },
    {
      id: '2',
      title: language === 'th' ? 'การสำรวจกาย' : 'Body Scan',
      description: language === 'th' ? 'ผ่อนคลายร่างกายและจิตใจ' : 'Relax your body and mind',
      duration: 10,
      type: 'meditation',
      difficulty: 'beginner',
      isPremium: false,
      thumbnail: '✨'
    },
    {
      id: '3',
      title: language === 'th' ? 'สมาธิก่อนนอน' : 'Sleep Meditation',
      description: language === 'th' ? 'ช่วยให้หลับลึกและพักผ่อนดี' : 'Deep sleep and better rest',
      duration: 15,
      type: 'meditation',
      difficulty: 'intermediate',
      isPremium: true,
      thumbnail: '🌙'
    },
    {
      id: '4',
      title: language === 'th' ? 'การหายใจ 4-7-8' : '4-7-8 Breathing',
      description: language === 'th' ? 'เทคนิคการหายใจลดความเครียด' : 'Stress-relief breathing technique',
      duration: 5,
      type: 'breathing',
      difficulty: 'beginner',
      isPremium: false,
      thumbnail: '💨'
    },
    {
      id: '5',
      title: language === 'th' ? 'การหายใจแบบพุทธ' : 'Buddhist Breathing',
      description: language === 'th' ? 'การหายใจตามแนวพุทธศาสนา' : 'Traditional Buddhist breathing',
      duration: 8,
      type: 'breathing',
      difficulty: 'intermediate',
      isPremium: true,
      thumbnail: '🙏'
    }
  ];

  const articles = [
    {
      id: '1',
      title: language === 'th' ? 'ความเครียดในยุคดิจิทัล' : 'Digital Age Stress',
      description: language === 'th' ? 'วิธีจัดการความเครียดจากเทคโนโลยี' : 'Managing technology-related stress',
      readTime: 5,
      isPremium: false
    },
    {
      id: '2',
      title: language === 'th' ? 'การนอนหลับที่ดี' : 'Better Sleep Habits',
      description: language === 'th' ? 'สร้างนิสัยการนอนหลับที่ดีต่อสุขภาพจิต' : 'Building healthy sleep habits for mental wellness',
      readTime: 7,
      isPremium: false
    }
  ];

  const filteredContent = meditationContent.filter(item => {
    if (activeTab === 'meditation') return item.type === 'meditation';
    if (activeTab === 'breathing') return item.type === 'breathing';
    return false;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner': return 'bg-green-100 text-green-800';
      case 'intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyText = (difficulty: string) => {
    if (language === 'th') {
      switch (difficulty) {
        case 'beginner': return 'เริ่มต้น';
        case 'intermediate': return 'กลาง';
        case 'advanced': return 'สูง';
        default: return difficulty;
      }
    }
    return difficulty;
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="lotus-glow w-12 h-12 mx-auto mb-3">
          <BookOpen className="w-6 h-6 text-zen-green mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 font-thai">
          {language === 'th' ? 'เนื้อหาเพื่อสุขภาพจิต' : 'Wellness Content'}
        </h1>
        <p className="text-gray-600 font-thai">
          {language === 'th' ? 'สมาธิ การหายใจ และบทความดีๆ' : 'Meditation, breathing, and wellness articles'}
        </p>
      </div>

      {/* Tabs */}
      <div className="zen-card p-2 flex rounded-2xl">
        <button
          onClick={() => setActiveTab('meditation')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium font-thai text-sm transition-all ${
            activeTab === 'meditation'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'text-gray-600 hover:text-blue-500'
          }`}
        >
          {t('content.meditation')}
        </button>
        <button
          onClick={() => setActiveTab('breathing')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium font-thai text-sm transition-all ${
            activeTab === 'breathing'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'text-gray-600 hover:text-blue-500'
          }`}
        >
          {t('content.breathing')}
        </button>
        <button
          onClick={() => setActiveTab('articles')}
          className={`flex-1 py-3 px-4 rounded-xl font-medium font-thai text-sm transition-all ${
            activeTab === 'articles'
              ? 'bg-blue-500 text-white shadow-lg'
              : 'text-gray-600 hover:text-blue-500'
          }`}
        >
          {t('content.articles')}
        </button>
      </div>

      {/* Content Grid */}
      {activeTab !== 'articles' ? (
        <div className="space-y-4">
          {filteredContent.map((item) => (
            <Card key={item.id} className="zen-card border-0 hover:scale-102 transition-transform">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="text-4xl">{item.thumbnail}</div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="font-semibold text-gray-800 font-thai">
                        {item.title}
                      </h3>
                      {item.isPremium && (
                        <Badge className="bg-zen-gold text-white text-xs">
                          Premium
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 font-thai mb-3">
                      {item.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm text-gray-500">
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span className="font-thai">{item.duration} {t('content.minutes')}</span>
                        </div>
                        <Badge className={getDifficultyColor(item.difficulty)}>
                          {getDifficultyText(item.difficulty)}
                        </Badge>
                      </div>
                      <Button 
                        className="zen-button text-sm px-4 py-2"
                        disabled={item.isPremium}
                      >
                        <Play className="w-4 h-4 mr-1" />
                        {t('content.start')}
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          {articles.map((article) => (
            <Card key={article.id} className="zen-card border-0 hover:scale-102 transition-transform">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-semibold text-gray-800 font-thai">
                    {article.title}
                  </h3>
                  {article.isPremium && (
                    <Badge className="bg-zen-gold text-white text-xs">
                      Premium
                    </Badge>
                  )}
                </div>
                <p className="text-sm text-gray-600 font-thai mb-4">
                  {article.description}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="font-thai">{article.readTime} {language === 'th' ? 'นาที' : 'min read'}</span>
                  </div>
                  <Button className="zen-button text-sm px-4 py-2">
                    <BookOpen className="w-4 h-4 mr-1" />
                    {language === 'th' ? 'อ่าน' : 'Read'}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Premium Upgrade Prompt */}
      <Card className="zen-card border-0 bg-gradient-to-r from-zen-gold/20 to-zen-lotus/20">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-zen-gold rounded-full mx-auto mb-3 flex items-center justify-center">
            <Star className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2 font-thai">
            {language === 'th' ? 'ปลดล็อกเนื้อหาพิเศษ' : 'Unlock Premium Content'}
          </h3>
          <p className="text-sm text-gray-600 font-thai mb-4">
            {language === 'th' 
              ? 'เข้าถึงการนั่งสมาธิและบทความสำหรับสมาชิกพรีเมียมเท่านั้น'
              : 'Access exclusive meditations and articles for premium members'
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

export default Content;
