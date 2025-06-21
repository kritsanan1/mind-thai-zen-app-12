
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Sparkles, Heart, Shield } from 'lucide-react';

const Index = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen thai-gradient">
      <div className="max-w-md mx-auto px-6 py-12">
        {/* Language Toggle */}
        <div className="flex justify-end mb-8">
          <div className="zen-card p-2 flex rounded-full">
            <button
              onClick={() => setLanguage('th')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                language === 'th' ? 'bg-blue-500 text-white' : 'text-gray-600'
              }`}
            >
              ไทย
            </button>
            <button
              onClick={() => setLanguage('en')}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                language === 'en' ? 'bg-blue-500 text-white' : 'text-gray-600'
              }`}
            >
              EN
            </button>
          </div>
        </div>

        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="lotus-glow w-24 h-24 mx-auto mb-6 meditation-float">
            <div className="w-12 h-12 bg-gradient-to-br from-zen-lotus to-purple-300 rounded-full mx-auto lotus-bloom flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-gray-800 mb-4 font-thai">
            {language === 'th' ? 'Mind Thai Zen' : 'Mind Thai Zen'}
          </h1>
          
          <p className="text-lg text-gray-600 mb-8 font-thai leading-relaxed">
            {language === 'th' 
              ? 'แอปดูแลสุขภาพจิตด้วย AI สำหรับคนไทยรุ่นใหม่ พบความสงบใจผ่านการนั่งสมาธิและการบำบัดแบบไทย'
              : 'AI-powered mental wellness app for young Thai adults. Find inner peace through mindfulness and Thai therapeutic practices'
            }
          </p>

          <div className="space-y-4 mb-12">
            <Link to="/app/home" className="block">
              <button className="w-full zen-button py-4 text-lg font-semibold">
                {language === 'th' ? 'เริ่มต้นการเดินทางสู่ความสงบ' : 'Begin Your Journey to Peace'}
              </button>
            </Link>
            
            <Link to="/auth" className="block">
              <button className="w-full zen-button-secondary py-4 text-lg font-semibold">
                {language === 'th' ? 'เข้าสู่ระบบ / สมัครสมาชิก' : 'Sign In / Sign Up'}
              </button>
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="space-y-6">
          <div className="zen-card p-6 flex items-start space-x-4">
            <div className="lotus-glow w-12 h-12 flex-shrink-0">
              <Heart className="w-6 h-6 text-zen-green mx-auto" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 font-thai">
                {language === 'th' ? 'AI ที่เข้าใจวัฒนธรรมไทย' : 'Culturally-Aware AI'}
              </h3>
              <p className="text-gray-600 text-sm font-thai">
                {language === 'th' 
                  ? 'ระบบ AI ที่เข้าใจบริบทและค่านิยมไทย ให้คำแนะนำที่เหมาะสมกับวิถีชีวิตของคุณ'
                  : 'AI that understands Thai context and values, providing culturally relevant guidance'
                }
              </p>
            </div>
          </div>

          <div className="zen-card p-6 flex items-start space-x-4">
            <div className="lotus-glow w-12 h-12 flex-shrink-0">
              <Sparkles className="w-6 h-6 text-zen-green mx-auto" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 font-thai">
                {language === 'th' ? 'การนั่งสมาธิแบบไทย' : 'Thai-Style Meditation'}
              </h3>
              <p className="text-gray-600 text-sm font-thai">
                {language === 'th' 
                  ? 'เทคนิคการนั่งสมาธิที่ผสมผสานปรัชญาพุทธกับวิทยาศาสตร์สมัยใหม่'
                  : 'Meditation techniques blending Buddhist philosophy with modern science'
                }
              </p>
            </div>
          </div>

          <div className="zen-card p-6 flex items-start space-x-4">
            <div className="lotus-glow w-12 h-12 flex-shrink-0">
              <Shield className="w-6 h-6 text-zen-green mx-auto" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-2 font-thai">
                {language === 'th' ? 'ความปลอดภัยสูงสุด' : 'Maximum Privacy'}
              </h3>
              <p className="text-gray-600 text-sm font-thai">
                {language === 'th' 
                  ? 'ข้อมูลส่วนตัวของคุณได้รับการป้องกันตามมาตรฐาน PDPA และ GDPR'
                  : 'Your personal data is protected under PDPA and GDPR standards'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-12 pt-8 border-t border-white/20">
          <Link to="/privacy" className="text-sm text-gray-500 hover:text-gray-700 font-thai">
            {language === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Index;
