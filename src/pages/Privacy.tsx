
import { useLanguage } from '@/contexts/LanguageContext';
import { Shield, Lock, Eye, Database, UserCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const Privacy = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();

  const privacyPrinciples = [
    {
      icon: Shield,
      title: language === 'th' ? 'การปกป้องข้อมูล' : 'Data Protection',
      description: language === 'th' 
        ? 'เราใช้มาตรฐาน PDPA และ GDPR ในการปกป้องข้อมูลส่วนตัวของคุณ'
        : 'We follow PDPA and GDPR standards to protect your personal data'
    },
    {
      icon: Lock,
      title: language === 'th' ? 'การเข้ารหัส' : 'Encryption',
      description: language === 'th' 
        ? 'ข้อมูลทั้งหมดถูกเข้ารหัสด้วยเทคโนโลยี AES-256'
        : 'All data is encrypted using AES-256 encryption technology'
    },
    {
      icon: Eye,
      title: language === 'th' ? 'ความโปร่งใส' : 'Transparency',
      description: language === 'th' 
        ? 'คุณสามารถดู แก้ไข หรือลบข้อมูลของคุณได้ตลอดเวลา'
        : 'You can view, edit, or delete your data at any time'
    },
    {
      icon: Database,
      title: language === 'th' ? 'การจัดเก็บข้อมูล' : 'Data Storage',
      description: language === 'th' 
        ? 'ข้อมูลถูกเก็บบนเซิร์ฟเวอร์ที่ปลอดภัยในประเทศไทย'
        : 'Data is stored on secure servers within Thailand'
    },
    {
      icon: UserCheck,
      title: language === 'th' ? 'การยินยอม' : 'Consent',
      description: language === 'th' 
        ? 'เราขอความยินยอมก่อนการเก็บรวบรวมข้อมูลทุกครั้ง'
        : 'We ask for consent before collecting any personal information'
    }
  ];

  return (
    <div className="min-h-screen thai-gradient">
      <div className="max-w-2xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="lotus-glow w-16 h-16 mx-auto mb-6">
            <Shield className="w-8 h-8 text-zen-green mx-auto" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-800 mb-4 font-thai">
            {language === 'th' ? 'นโยบายความเป็นส่วนตัว' : 'Privacy Policy'}
          </h1>
          
          <p className="text-lg text-gray-600 font-thai leading-relaxed">
            {language === 'th' 
              ? 'เราให้ความสำคัญกับความเป็นส่วนตัวและความปลอดภัยของข้อมูลส่วนบุคคลของคุณ'
              : 'We prioritize the privacy and security of your personal information'
            }
          </p>
        </div>

        {/* Privacy Principles */}
        <div className="space-y-6 mb-8">
          {privacyPrinciples.map((item, index) => {
            const Icon = item.icon;
            return (
              <Card key={index} className="zen-card border-0">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="lotus-glow w-12 h-12 flex-shrink-0">
                      <Icon className="w-6 h-6 text-zen-green mx-auto" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 mb-2 font-thai">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 font-thai leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Detailed Policy */}
        <Card className="zen-card border-0 mb-8">
          <CardContent className="p-8">
            <div className="space-y-6 font-thai">
              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {language === 'th' ? 'ข้อมูลที่เราเก็บรวบรวม' : 'Information We Collect'}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'th' 
                    ? 'เราเก็บรวบรวมข้อมูลที่จำเป็นสำหรับการให้บริการเท่านั้น รวมถึงข้อมูลการใช้งานแอป การวิเคราะห์อารมณ์ และข้อมูลการติดต่อสื่อสารกับ AI'
                    : 'We only collect information necessary for service provision, including app usage data, mood analysis, and AI communication logs'
                  }
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {language === 'th' ? 'การใช้ข้อมูล' : 'How We Use Your Data'}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'th' 
                    ? 'ข้อมูลของคุณใช้เพื่อปรับปรุงประสบการณ์การใช้งาน วิเคราะห์อารมณ์ และให้คำแนะนำที่เหมาะสม เราไม่แบ่งปันข้อมูลส่วนบุคคลกับบุคคลที่สาม'
                    : 'Your data is used to improve user experience, analyze mood patterns, and provide personalized recommendations. We do not share personal data with third parties'
                  }
                </p>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {language === 'th' ? 'สิทธิของผู้ใช้' : 'Your Rights'}
                </h2>
                <ul className="text-gray-600 space-y-2">
                  <li>• {language === 'th' ? 'สิทธิในการเข้าถึงข้อมูลส่วนบุคคล' : 'Right to access your personal data'}</li>
                  <li>• {language === 'th' ? 'สิทธิในการแก้ไขข้อมูลที่ไม่ถูกต้อง' : 'Right to correct inaccurate information'}</li>
                  <li>• {language === 'th' ? 'สิทธิในการลบข้อมูลส่วนบุคคล' : 'Right to delete your personal data'}</li>
                  <li>• {language === 'th' ? 'สิทธิในการยกเลิกความยินยอม' : 'Right to withdraw consent'}</li>
                </ul>
              </div>

              <div>
                <h2 className="text-xl font-semibold text-gray-800 mb-3">
                  {language === 'th' ? 'การติดต่อเรา' : 'Contact Us'}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {language === 'th' 
                    ? 'หากคุณมีคำถามเกี่ยวกับนโยบายความเป็นส่วนตัว กรุณาติดต่อเราที่ privacy@mindthaizen.com'
                    : 'If you have questions about our privacy policy, please contact us at privacy@mindthaizen.com'
                  }
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            onClick={() => navigate('/')}
            className="zen-button flex-1"
          >
            {language === 'th' ? 'ฉันเข้าใจและยอมรับ' : 'I Understand and Accept'}
          </Button>
          
          <Button 
            onClick={() => navigate('/')}
            variant="outline"
            className="flex-1"
          >
            {language === 'th' ? 'กลับหน้าหลัก' : 'Back to Home'}
          </Button>
        </div>

        {/* Last Updated */}
        <div className="text-center mt-8 pt-6 border-t border-white/20">
          <p className="text-sm text-gray-500 font-thai">
            {language === 'th' 
              ? 'อัปเดตล่าสุด: 21 มิถุนายน 2025' 
              : 'Last updated: June 21, 2025'
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
