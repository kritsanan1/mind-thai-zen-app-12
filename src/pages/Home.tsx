
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, Target, Gift, TrendingUp } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Home = () => {
  const { t, language } = useLanguage();
  const { user } = useAuth();
  const [streak, setStreak] = useState(3);
  const [todayTip, setTodayTip] = useState('');

  useEffect(() => {
    const tips = language === 'th' ? [
      'ลองหายใจลึกๆ 5 ครั้ง เมื่อรู้สึกเครียด',
      'การเดินในธรรมชาติช่วยลดความกังวลได้',
      'นั่งสมาธิแค่ 5 นาทีก็มีผลดีต่อจิตใจ',
      'การขอบคุณในสิ่งเล็กๆ ทำให้มีความสุข',
      'พักผ่อนให้เพียงพอ สุขภาพจิตจึงจะดี'
    ] : [
      'Try taking 5 deep breaths when feeling stressed',
      'Walking in nature helps reduce anxiety',
      'Just 5 minutes of meditation benefits your mind',
      'Gratitude for small things brings happiness',
      'Adequate rest is essential for mental health'
    ];
    
    setTodayTip(tips[Math.floor(Math.random() * tips.length)]);
  }, [language]);

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Friend';

  return (
    <div className="p-6 space-y-6">
      {/* Header with greeting */}
      <div className="text-center mb-8">
        <div className="lotus-glow w-16 h-16 mx-auto mb-4 meditation-float">
          <Sparkles className="w-8 h-8 text-zen-green mx-auto" />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-2 font-thai">
          {t('home.welcome')} {userName}
        </h1>
        <p className="text-gray-600 font-thai">
          {t('home.how_are_you')}
        </p>
      </div>

      {/* Mood Check CTA */}
      <Card className="zen-card border-0">
        <CardContent className="p-6 text-center">
          <div className="mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto flex items-center justify-center mb-3">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-semibold text-gray-800 mb-2 font-thai">
              {t('home.how_are_you')}
            </h3>
            <p className="text-sm text-gray-600 font-thai mb-4">
              {language === 'th' 
                ? 'บอกเราถึงความรู้สึกของคุณวันนี้'
                : 'Tell us how you\'re feeling today'
              }
            </p>
          </div>
          <Button className="zen-button w-full mb-3">
            {t('home.mood_check')}
          </Button>
          <Button className="zen-button-secondary w-full">
            {t('home.start_meditation')}
          </Button>
        </CardContent>
      </Card>

      {/* Streak Counter */}
      <Card className="zen-card border-0">
        <CardContent className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-zen-gold rounded-full flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="font-semibold text-gray-800 font-thai">
                {t('home.streak')}
              </p>
              <p className="text-sm text-gray-600 font-thai">
                {streak} {t('home.days')}
              </p>
            </div>
          </div>
          <div className="text-2xl">🔥</div>
        </CardContent>
      </Card>

      {/* Daily Tip */}
      <Card className="zen-card border-0">
        <CardContent className="p-6">
          <div className="flex items-start space-x-3">
            <div className="w-10 h-10 bg-zen-mint rounded-full flex items-center justify-center flex-shrink-0">
              <Gift className="w-5 h-5 text-zen-green" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 font-thai">
                {t('home.daily_tip')}
              </h3>
              <p className="text-gray-600 font-thai leading-relaxed">
                {todayTip}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="zen-card border-0 cursor-pointer hover:scale-105 transition-transform">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-xl">🧘‍♀️</span>
            </div>
            <p className="font-medium text-gray-800 font-thai text-sm">
              {language === 'th' ? 'นั่งสมาธิ' : 'Meditate'}
            </p>
          </CardContent>
        </Card>

        <Card className="zen-card border-0 cursor-pointer hover:scale-105 transition-transform">
          <CardContent className="p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-600 rounded-full mx-auto mb-3 flex items-center justify-center">
              <span className="text-xl">💬</span>
            </div>
            <p className="font-medium text-gray-800 font-thai text-sm">
              {language === 'th' ? 'แชท AI' : 'AI Chat'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Premium Upgrade Prompt */}
      <Card className="zen-card border-0 bg-gradient-to-r from-zen-gold/20 to-zen-lotus/20">
        <CardContent className="p-6 text-center">
          <div className="w-12 h-12 bg-zen-gold rounded-full mx-auto mb-3 flex items-center justify-center">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <h3 className="font-semibold text-gray-800 mb-2 font-thai">
            {language === 'th' ? 'อัปเกรดเป็นพรีเมียม' : 'Upgrade to Premium'}
          </h3>
          <p className="text-sm text-gray-600 font-thai mb-4">
            {language === 'th' 
              ? 'ปลดล็อกการนั่งสมาธิและเนื้อหาพิเศษ'
              : 'Unlock exclusive meditations and content'
            }
          </p>
          <Button className="zen-button text-sm px-6 py-2">
            {language === 'th' ? 'เริ่มทดลองฟรี' : 'Start Free Trial'}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
