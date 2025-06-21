
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Language = 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
  fontClass: string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  th: {
    // Navigation
    'nav.home': 'หน้าหลัก',
    'nav.chat': 'แชท AI',
    'nav.content': 'เนื้อหา',
    'nav.therapist': 'นักบำบัด',
    'nav.profile': 'โปรไฟล์',
    
    // Home Page
    'home.welcome': 'สวัสดี',
    'home.how_are_you': 'วันนี้คุณเป็นอย่างไร?',
    'home.mood_check': 'ตรวจสอบอารมณ์',
    'home.start_meditation': 'เริ่มนั่งสมาธิ',
    'home.daily_tip': 'เคล็ดลับประจำวัน',
    'home.streak': 'สร้อยต่อเนื่อง',
    'home.days': 'วัน',
    'home.stress_level': 'ระดับความเครียด',
    'home.wellness_score': 'คะแนนสุขภาพจิต',
    
    // AI Chat
    'chat.title': 'แชทกับ AI ผู้ช่วย',
    'chat.placeholder': 'บอกความรู้สึกของคุณ...',
    'chat.send': 'ส่ง',
    'chat.save_mood': 'บันทึกอารมณ์',
    'chat.breathing_suggestion': 'ลองออกกำลังการหายใจ 5 นาที?',
    'chat.meditation_suggestion': 'ต้องการนั่งสมาธิสั้นๆ ไหม?',
    
    // Meditation Content
    'content.meditation': 'นั่งสมาธิ',
    'content.breathing': 'การหายใจ',
    'content.articles': 'บทความ',
    'content.duration': 'ระยะเวลา',
    'content.minutes': 'นาที',
    'content.start': 'เริ่ม',
    'content.premium': 'พรีเมียม',
    'content.free': 'ฟรี',
    
    // Therapist
    'therapist.title': 'นักบำบัดมืออาชีพ',
    'therapist.book': 'จองเวลา',
    'therapist.rating': 'คะแนน',
    'therapist.experience': 'ประสบการณ์',
    'therapist.years': 'ปี',
    'therapist.online': 'ออนไลน์',
    'therapist.in_person': 'เข้าพบ',
    'therapist.rate_per_hour': 'ค่าบริการต่อชั่วโมง',
    
    // Profile
    'profile.settings': 'การตั้งค่า',
    'profile.language': 'ภาษา',
    'profile.notifications': 'การแจ้งเตือน',
    'profile.privacy': 'ความเป็นส่วนตัว',
    'profile.logout': 'ออกจากระบบ',
    'profile.premium': 'อัปเกรดเป็นพรีเมียม',
    'profile.achievements': 'ความสำเร็จ',
    'profile.progress': 'ความก้าวหน้า',
    
    // Authentication
    'auth.sign_in': 'เข้าสู่ระบบ',
    'auth.sign_up': 'สร้างบัญชี',
    'auth.email': 'อีเมล',
    'auth.password': 'รหัสผ่าน',
    'auth.full_name': 'ชื่อ-นามสกุล',
    'auth.forgot_password': 'ลืมรหัสผ่าน?',
    'auth.create_account': 'สร้างบัญชีใหม่',
    'auth.have_account': 'มีบัญชีแล้ว?',
    'auth.welcome_back': 'ยินดีต้อนรับกลับมา',
    'auth.start_journey': 'เริ่มต้นการดูแลสุขภาพจิต',
    
    // Privacy & PDPA
    'privacy.title': 'นโยบายความเป็นส่วนตัว',
    'privacy.consent': 'ฉันยินยอมให้ประมวลผลข้อมูลส่วนบุคคล',
    'privacy.agree': 'ยอมรับ',
    'privacy.data_usage': 'เราใช้ข้อมูลของคุณเพื่อวิเคราะห์อารมณ์และให้คำแนะนำ',
    'privacy.secure': 'ข้อมูลของคุณจะถูกเก็บรักษาอย่างปลอดภัย',
    
    // Common
    'common.loading': 'กำลังโหลด...',
    'common.save': 'บันทึก',
    'common.cancel': 'ยกเลิก',
    'common.confirm': 'ยืนยัน',
    'common.error': 'เกิดข้อผิดพลาด',
    'common.success': 'สำเร็จ',
    'common.close': 'ปิด',
    'common.next': 'ถัดไป',
    'common.previous': 'ก่อนหน้า',
    'common.continue': 'ดำเนินการต่อ',
    
    // Stress Levels
    'stress.low': 'ต่ำ',
    'stress.medium': 'ปานกลาง',
    'stress.high': 'สูง',
    
    // Mood States
    'mood.happy': 'มีความสุข',
    'mood.calm': 'สงบ',
    'mood.anxious': 'กังวล',
    'mood.sad': 'เศร้า',
    'mood.stressed': 'เครียด',
    'mood.peaceful': 'สงบสุข'
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.chat': 'AI Chat',
    'nav.content': 'Content',
    'nav.therapist': 'Therapist',
    'nav.profile': 'Profile',
    
    // Home Page
    'home.welcome': 'Hello',
    'home.how_are_you': 'How are you feeling today?',
    'home.mood_check': 'Check Mood',
    'home.start_meditation': 'Start Meditation',
    'home.daily_tip': 'Daily Tip',
    'home.streak': 'Streak',
    'home.days': 'days',
    'home.stress_level': 'Stress Level',
    'home.wellness_score': 'Wellness Score',
    
    // AI Chat
    'chat.title': 'Chat with AI Assistant',
    'chat.placeholder': 'Tell me how you feel...',
    'chat.send': 'Send',
    'chat.save_mood': 'Save Mood',
    'chat.breathing_suggestion': 'Try a 5-minute breathing exercise?',
    'chat.meditation_suggestion': 'Want to try a short meditation?',
    
    // Meditation Content
    'content.meditation': 'Meditation',
    'content.breathing': 'Breathing',
    'content.articles': 'Articles',
    'content.duration': 'Duration',
    'content.minutes': 'minutes',
    'content.start': 'Start',
    'content.premium': 'Premium',
    'content.free': 'Free',
    
    // Therapist
    'therapist.title': 'Professional Therapists',
    'therapist.book': 'Book Session',
    'therapist.rating': 'Rating',
    'therapist.experience': 'Experience',
    'therapist.years': 'years',
    'therapist.online': 'Online',
    'therapist.in_person': 'In-Person',
    'therapist.rate_per_hour': 'Rate per hour',
    
    // Profile
    'profile.settings': 'Settings',
    'profile.language': 'Language',
    'profile.notifications': 'Notifications',
    'profile.privacy': 'Privacy',
    'profile.logout': 'Logout',
    'profile.premium': 'Upgrade to Premium',
    'profile.achievements': 'Achievements',
    'profile.progress': 'Progress',
    
    // Authentication
    'auth.sign_in': 'Sign In',
    'auth.sign_up': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.full_name': 'Full Name',
    'auth.forgot_password': 'Forgot Password?',
    'auth.create_account': 'Create Account',
    'auth.have_account': 'Already have an account?',
    'auth.welcome_back': 'Welcome back',
    'auth.start_journey': 'Start your mental wellness journey',
    
    // Privacy & PDPA
    'privacy.title': 'Privacy Policy',
    'privacy.consent': 'I consent to personal data processing',
    'privacy.agree': 'Agree',
    'privacy.data_usage': 'We use your data to analyze mood and provide recommendations',
    'privacy.secure': 'Your data is stored securely and privately',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.error': 'Error occurred',
    'common.success': 'Success',
    'common.close': 'Close',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.continue': 'Continue',
    
    // Stress Levels
    'stress.low': 'Low',
    'stress.medium': 'Medium',
    'stress.high': 'High',
    
    // Mood States
    'mood.happy': 'Happy',
    'mood.calm': 'Calm',
    'mood.anxious': 'Anxious',
    'mood.sad': 'Sad',
    'mood.stressed': 'Stressed',
    'mood.peaceful': 'Peaceful'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(() => {
    // Get saved language from localStorage or default to Thai
    const saved = localStorage.getItem('mindful-thai-language');
    return (saved as Language) || 'th';
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('mindful-thai-language', language);
    
    // Update document attributes for proper font rendering
    document.documentElement.setAttribute('lang', language);
    document.documentElement.setAttribute('data-language', language);
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['th']] || key;
  };

  const fontClass = language === 'th' ? 'font-thai' : 'font-english';
  const isRTL = false; // Neither Thai nor English are RTL

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage, 
      t, 
      isRTL, 
      fontClass 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
