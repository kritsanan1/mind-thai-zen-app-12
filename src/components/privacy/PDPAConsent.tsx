
import { useState, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { ZenCard, ZenCardContent, ZenCardHeader, ZenCardTitle, ZenCardDescription } from '@/components/ui/zen-card';
import { ZenButton } from '@/components/ui/zen-button';
import { Checkbox } from '@/components/ui/checkbox';
import { Shield, Lock, Eye, Users } from 'lucide-react';

interface PDPAConsentProps {
  onConsent: (consented: boolean) => void;
  isVisible: boolean;
}

export const PDPAConsent = ({ onConsent, isVisible }: PDPAConsentProps) => {
  const { t, language } = useLanguage();
  const [consentGiven, setConsentGiven] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    // Check if consent was already given
    const existingConsent = localStorage.getItem('mindful-thai-pdpa-consent');
    if (existingConsent === 'true') {
      onConsent(true);
    }
  }, [onConsent]);

  const handleConsent = () => {
    localStorage.setItem('mindful-thai-pdpa-consent', 'true');
    localStorage.setItem('mindful-thai-consent-date', new Date().toISOString());
    onConsent(true);
  };

  const handleDecline = () => {
    localStorage.setItem('mindful-thai-pdpa-consent', 'false');
    onConsent(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <ZenCard className="w-full max-w-lg">
        <ZenCardHeader className="text-center">
          <div className="lotus-glow w-16 h-16 mx-auto mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-zen-blue to-zen-green rounded-full mx-auto flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
          </div>
          <ZenCardTitle className={`text-2xl ${language === 'th' ? 'font-thai' : 'font-english'}`}>
            {t('privacy.title')}
          </ZenCardTitle>
          <ZenCardDescription className={language === 'th' ? 'font-thai' : 'font-english'}>
            {language === 'th' 
              ? 'เพื่อให้บริการที่ดีที่สุด เราจำเป็นต้องขอความยินยอมในการประมวลผลข้อมูลส่วนบุคคลของคุณ'
              : 'To provide you with the best service, we need your consent to process your personal data'
            }
          </ZenCardDescription>
        </ZenCardHeader>

        <ZenCardContent className="space-y-6">
          {/* Data Usage Overview */}
          <div className="space-y-4">
            <div className="flex items-start space-x-3 p-3 bg-zen-blue/30 rounded-lg">
              <Eye className="w-5 h-5 text-zen-green mt-0.5" />
              <div className={language === 'th' ? 'font-thai' : 'font-english'}>
                <p className="font-medium text-sm">
                  {language === 'th' ? 'การวิเคราะห์อารมณ์' : 'Mood Analysis'}
                </p>
                <p className="text-xs text-gray-600">
                  {t('privacy.data_usage')}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-zen-mint/30 rounded-lg">
              <Lock className="w-5 h-5 text-zen-green mt-0.5" />
              <div className={language === 'th' ? 'font-thai' : 'font-english'}>
                <p className="font-medium text-sm">
                  {language === 'th' ? 'ความปลอดภัย' : 'Data Security'}
                </p>
                <p className="text-xs text-gray-600">
                  {t('privacy.secure')}
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3 p-3 bg-zen-warm/30 rounded-lg">
              <Users className="w-5 h-5 text-zen-green mt-0.5" />
              <div className={language === 'th' ? 'font-thai' : 'font-english'}>
                <p className="font-medium text-sm">
                  {language === 'th' ? 'การแบ่งปัน' : 'Data Sharing'}
                </p>
                <p className="text-xs text-gray-600">
                  {language === 'th' 
                    ? 'เราจะไม่แบ่งปันข้อมูลส่วนบุคคลของคุณกับบุคคลที่สาม'
                    : 'We will never share your personal data with third parties'
                  }
                </p>
              </div>
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="flex items-start space-x-3 p-4 border border-zen-green/20 rounded-lg bg-zen-blue/10">
            <Checkbox
              id="pdpa-consent"
              checked={consentGiven}
              onCheckedChange={(checked) => setConsentGiven(!!checked)}
              className="mt-0.5"
            />
            <label
              htmlFor="pdpa-consent"
              className={`text-sm leading-relaxed cursor-pointer ${language === 'th' ? 'font-thai' : 'font-english'}`}
            >
              {language === 'th' 
                ? 'ฉันยินยอมให้ MindfulThai ประมวลผลข้อมูลส่วนบุคคลของฉันเพื่อวัตถุประสงค์ในการให้บริการวิเคราะห์อารมณ์และคำแนะนำด้านสุขภาพจิต ตามที่ระบุไว้ข้างต้น'
                : 'I consent to MindfulThai processing my personal data for mood analysis and mental health recommendations as described above'
              }
            </label>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-3">
            <ZenButton
              onClick={handleConsent}
              disabled={!consentGiven}
              className="w-full"
              variant="primary"
            >
              {t('privacy.agree')}
            </ZenButton>
            
            <ZenButton
              onClick={handleDecline}
              variant="outline"
              className="w-full"
            >
              {t('common.cancel')}
            </ZenButton>
          </div>

          {/* Privacy Policy Link */}
          <div className="text-center">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className={`text-xs text-zen-green hover:underline ${language === 'th' ? 'font-thai' : 'font-english'}`}
            >
              {language === 'th' 
                ?  'อ่านนโยบายความเป็นส่วนตัวฉบับเต็ม'
                : 'Read full privacy policy'
              }
            </button>
          </div>
        </ZenCardContent>
      </ZenCard>
    </div>
  );
};
