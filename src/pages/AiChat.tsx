
import { ChatInterface } from '@/components/chat/ChatInterface';
import { useLanguage } from '@/contexts/LanguageContext';

const AiChat = () => {
  const { t } = useLanguage();

  return (
    <div className="h-[calc(100vh-5rem)] flex flex-col">
      <div className="p-4 border-b border-white/20 bg-white/50 backdrop-blur-sm">
        <h1 className="text-xl font-bold text-gray-800 font-thai text-center">
          {t('chat.title')}
        </h1>
      </div>
      <div className="flex-1">
        <ChatInterface />
      </div>
    </div>
  );
};

export default AiChat;
