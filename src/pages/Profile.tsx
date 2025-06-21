
import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { User, Settings, Bell, Shield, Crown, Trophy, Target, LogOut } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Badge } from '@/components/ui/badge';

const Profile = () => {
  const { t, language, setLanguage } = useLanguage();
  const { user, signOut } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  const userStats = {
    meditationStreak: 7,
    totalSessions: 45,
    totalMinutes: 320,
    badges: 3,
    level: 'Mindful Beginner'
  };

  const handleSignOut = async () => {
    try {
      await signOut();
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  const userName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'User';
  const userEmail = user?.email || '';

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="lotus-glow w-20 h-20 mx-auto mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full mx-auto flex items-center justify-center">
            <User className="w-6 h-6 text-white" />
          </div>
        </div>
        <h1 className="text-xl font-bold text-gray-800 font-thai mb-1">
          {userName}
        </h1>
        <p className="text-gray-600 font-thai text-sm mb-3">
          {userEmail}
        </p>
        <Badge className="bg-zen-mint text-zen-green">
          {language === 'th' ? 'สมาชิกฟรี' : 'Free Member'}
        </Badge>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="zen-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-zen-green mb-1">
              {userStats.meditationStreak}
            </div>
            <p className="text-sm text-gray-600 font-thai">
              {language === 'th' ? 'วันต่อเนื่อง' : 'Day Streak'}
            </p>
          </CardContent>
        </Card>

        <Card className="zen-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-zen-green mb-1">
              {userStats.totalSessions}
            </div>
            <p className="text-sm text-gray-600 font-thai">
              {language === 'th' ? 'เซสชั่น' : 'Sessions'}
            </p>
          </CardContent>
        </Card>

        <Card className="zen-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-zen-green mb-1">
              {userStats.totalMinutes}
            </div>
            <p className="text-sm text-gray-600 font-thai">
              {language === 'th' ? 'นาที' : 'Minutes'}
            </p>
          </CardContent>
        </Card>

        <Card className="zen-card border-0">
          <CardContent className="p-4 text-center">
            <div className="text-2xl font-bold text-zen-green mb-1">
              {userStats.badges}
            </div>
            <p className="text-sm text-gray-600 font-thai">
              {language === 'th' ? 'เหรียญรางวัล' : 'Badges'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Level */}
      <Card className="zen-card border-0">
        <CardContent className="p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-zen-gold rounded-full flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 font-thai">
                {language === 'th' ? 'ระดับปัจจุบัน' : 'Current Level'}
              </h3>
              <p className="text-sm text-gray-600 font-thai">
                {userStats.level}
              </p>
            </div>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-zen-gold h-2 rounded-full" style={{ width: '65%' }}></div>
          </div>
          <p className="text-xs text-gray-500 font-thai mt-2">
            {language === 'th' ? '65% สู่ระดับถัดไป' : '65% to next level'}
          </p>
        </CardContent>
      </Card>

      {/* Premium Upgrade */}
      <Card className="zen-card border-0 bg-gradient-to-r from-zen-gold/20 to-zen-lotus/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-zen-gold rounded-full flex items-center justify-center">
                <Crown className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 font-thai">
                  {language === 'th' ? 'อัปเกรดเป็นพรีเมียม' : 'Upgrade to Premium'}
                </h3>
                <p className="text-sm text-gray-600 font-thai">
                  {language === 'th' ? 'ปลดล็อกฟีเจอร์พิเศษ' : 'Unlock exclusive features'}
                </p>
              </div>
            </div>
            <Button className="zen-button text-sm px-4 py-2">
              {language === 'th' ? 'อัปเกรด' : 'Upgrade'}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Settings */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800 font-thai">
          {t('profile.settings')}
        </h2>

        <Card className="zen-card border-0">
          <CardContent className="p-6 space-y-4">
            {/* Language Setting */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Settings className="w-5 h-5 text-gray-600" />
                <span className="font-thai">{t('profile.language')}</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setLanguage('th')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    language === 'th' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  ไทย
                </button>
                <button
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                    language === 'en' ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  EN
                </button>
              </div>
            </div>

            {/* Notifications */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Bell className="w-5 h-5 text-gray-600" />
                <span className="font-thai">{t('profile.notifications')}</span>
              </div>
              <Switch 
                checked={notifications} 
                onCheckedChange={setNotifications}
              />
            </div>

            {/* Dark Mode */}
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Target className="w-5 h-5 text-gray-600" />
                <span className="font-thai">
                  {language === 'th' ? 'โหมดมืด' : 'Dark Mode'}
                </span>
              </div>
              <Switch 
                checked={darkMode} 
                onCheckedChange={setDarkMode}
              />
            </div>
          </CardContent>
        </Card>

        {/* Privacy & Legal */}
        <Card className="zen-card border-0">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-center space-x-3">
              <Shield className="w-5 h-5 text-gray-600" />
              <span className="font-thai">{t('profile.privacy')}</span>
            </div>
          </CardContent>
        </Card>

        {/* Sign Out */}
        <Button 
          onClick={handleSignOut}
          variant="outline"
          className="w-full text-red-600 border-red-200 hover:bg-red-50"
        >
          <LogOut className="w-4 h-4 mr-2" />
          {t('profile.logout')}
        </Button>
      </div>
    </div>
  );
};

export default Profile;
