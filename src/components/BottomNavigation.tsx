
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Home, MessageCircle, Book, Users, User } from 'lucide-react';

const BottomNavigation = () => {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/app/home', icon: Home, label: t('nav.home') },
    { path: '/app/chat', icon: MessageCircle, label: t('nav.chat') },
    { path: '/app/content', icon: Book, label: t('nav.content') },
    { path: '/app/therapist', icon: Users, label: t('nav.therapist') },
    { path: '/app/profile', icon: User, label: t('nav.profile') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-lg border-t border-white/20 px-4 py-2">
      <div className="max-w-md mx-auto">
        <div className="flex justify-around items-center">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex flex-col items-center p-2 rounded-2xl transition-all duration-300 ${
                  isActive 
                    ? 'bg-gradient-to-t from-blue-500 to-blue-400 text-white shadow-lg transform scale-110' 
                    : 'text-gray-600 hover:text-blue-500'
                }`}
              >
                <Icon className={`w-6 h-6 mb-1 ${isActive ? 'animate-zen-pulse' : ''}`} />
                <span className="text-xs font-thai font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BottomNavigation;
