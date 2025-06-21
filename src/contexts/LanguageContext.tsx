
import React, { createContext, useContext, useState, ReactNode } from 'react';

export type Language = 'th' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
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
    
    // AI Chat
    'chat.title': 'แชทกับ AI ผู้ช่วย',
    'chat.placeholder': 'บอกความรู้สึกของคุณ...',
    'chat.send': 'ส่ง',
    'chat.save_mood': 'บันทึกอารมณ์',
    
    // Meditation Content
    'content.meditation': 'นั่งสมาธิ',
    'content.breathing': 'การหายใจ',
    'content.articles': 'บทความ',
    'content.duration': 'ระยะเวลา',
    'content.minutes': 'นาที',
    'content.start': 'เริ่ม',
    
    // Therapist
    'therapist.title': 'นักบำบัดมืออาชีพ',
    'therapist.book': 'จองเวลา',
    'therapist.rating': 'คะแนน',
    'therapist.experience': 'ประสบการณ์',
    'therapist.years': 'ปี',
    
    // Profile
    'profile.settings': 'การตั้งค่า',
    'profile.language': 'ภาษา',
    'profile.notifications': 'การแจ้งเตือน',
    'profile.privacy': 'ความเป็นส่วนตัว',
    'profile.logout': 'ออกจากระบบ',
    'profile.premium': 'อัปเกรดเป็นพรีเมียม',
    
    // Common
    'common.loading': 'กำลังโหลด...',
    'common.save': 'บันทึก',
    'common.cancel': 'ยกเลิก',
    'common.confirm': 'ยืนยัน',
    'common.error': 'เกิดข้อผิดพลาด',
    'common.success': 'สำเร็จ'
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
    
    // AI Chat
    'chat.title': 'Chat with AI Assistant',
    'chat.placeholder': 'Tell me how you feel...',
    'chat.send': 'Send',
    'chat.save_mood': 'Save Mood',
    
    // Meditation Content
    'content.meditation': 'Meditation',
    'content.breathing': 'Breathing',
    'content.articles': 'Articles',
    'content.duration': 'Duration',
    'content.minutes': 'minutes',
    'content.start': 'Start',
    
    // Therapist
    'therapist.title': 'Professional Therapists',
    'therapist.book': 'Book Session',
    'therapist.rating': 'Rating',
    'therapist.experience': 'Experience',
    'therapist.years': 'years',
    
    // Profile
    'profile.settings': 'Settings',
    'profile.language': 'Language',
    'profile.notifications': 'Notifications',
    'profile.privacy': 'Privacy',
    'profile.logout': 'Logout',
    'profile.premium': 'Upgrade to Premium',
    
    // Common
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.error': 'Error occurred',
    'common.success': 'Success'
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('th');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations['th']] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
