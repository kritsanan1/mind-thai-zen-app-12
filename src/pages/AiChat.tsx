
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, Mic, Heart, BookOpen } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  mood?: string;
}

const AiChat = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Welcome message
    const welcomeMessage: Message = {
      id: '1',
      text: language === 'th' 
        ? 'สวัสดีค่ะ ฉันคือ AI ผู้ช่วยที่จะรับฟังและช่วยเหลือคุณ บอกฉันได้เลยว่าวันนี้คุณรู้สึกอย่างไร 💙'
        : 'Hello! I\'m your AI assistant here to listen and help. Tell me how you\'re feeling today 💙',
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  }, [language]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    // Mood detection keywords
    const stressKeywords = ['เครียด', 'กังวล', 'stress', 'worried', 'anxious'];
    const sadKeywords = ['เศร้า', 'หดหู่', 'sad', 'depressed', 'down'];
    const happyKeywords = ['ดีใจ', 'มีความสุข', 'happy', 'good', 'great'];

    if (language === 'th') {
      if (stressKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'เข้าใจความรู้สึกของคุณค่ะ การรู้สึกเครียดเป็นเรื่องปกติ ลองหายใจลึกๆ 3 ครั้ง หรือจะลองฟังเสียงธรรมชาติ 5 นาทีดีมั้ยคะ? 🧘‍♀️';
      }
      if (sadKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'ฉันเข้าใจความรู้สึกของคุณค่ะ ช่วงเวลาที่เศร้าก็เป็นส่วนหนึ่งของชีวิต การได้พูดคุยแบบนี้แสดงว่าคุณกล้าหาญมากเลย จะลองทำกิจกรรมที่ชอบสักอย่างมั้ยคะ? 💚';
      }
      if (happyKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'ดีใจด้วยค่ะ! ความสุขของคุณทำให้ฉันดีใจไปด้วย 😊 ความรู้สึกดีๆ แบบนี้จะช่วยให้คุณมีพลังในการทำสิ่งต่างๆ มากขึ้นเลยค่ะ';
      }
      return 'ขอบคุณที่แบ่งปันความรู้สึกกับฉันค่ะ ฉันอยู่ที่นี่เพื่อรับฟังและช่วยเหลือคุณเสมอ มีอะไรที่อยากพูดคุยเพิ่มเติมมั้ยคะ? 💙';
    } else {
      if (stressKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'I understand how you\'re feeling. Stress is a normal part of life. Try taking 3 deep breaths, or perhaps listen to nature sounds for 5 minutes? 🧘‍♀️';
      }
      if (sadKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'I hear you and understand your feelings. Sadness is part of the human experience, and talking about it shows your courage. Would you like to try doing something you enjoy? 💚';
      }
      if (happyKeywords.some(keyword => lowerMessage.includes(keyword))) {
        return 'I\'m so happy to hear that! Your happiness brings me joy too 😊 These positive feelings will give you more energy for everything you do.';
      }
      return 'Thank you for sharing your feelings with me. I\'m here to listen and support you always. Is there anything else you\'d like to talk about? 💙';
    }
  };

  const sendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <div className="flex flex-col h-screen bg-transparent">
      {/* Header */}
      <div className="p-6 pb-4">
        <div className="text-center">
          <div className="lotus-glow w-12 h-12 mx-auto mb-3">
            <Heart className="w-6 h-6 text-zen-green mx-auto" />
          </div>
          <h1 className="text-xl font-bold text-gray-800 font-thai">
            {t('chat.title')}
          </h1>
          <p className="text-sm text-gray-600 font-thai">
            {language === 'th' ? 'พูดคุยและแบ่งปันความรู้สึกของคุณ' : 'Share your thoughts and feelings'}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-6 pb-6">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] p-4 rounded-2xl ${
                  message.isUser
                    ? 'bg-blue-500 text-white ml-4'
                    : 'zen-card mr-4'
                }`}
              >
                <p className="font-thai text-sm leading-relaxed">{message.text}</p>
                <p className={`text-xs mt-2 ${
                  message.isUser ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString('th-TH', { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="zen-card max-w-[80%] p-4 mr-4">
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 pb-4">
        <div className="flex space-x-2 mb-4">
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-xs font-thai"
            onClick={() => setInputText(language === 'th' ? 'ฉันรู้สึกเครียด' : 'I feel stressed')}
          >
            {language === 'th' ? '😰 เครียด' : '😰 Stressed'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-xs font-thai"
            onClick={() => setInputText(language === 'th' ? 'ฉันรู้สึกดีใจ' : 'I feel happy')}
          >
            {language === 'th' ? '😊 ดีใจ' : '😊 Happy'}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-full text-xs font-thai"
            onClick={() => setInputText(language === 'th' ? 'ฉันรู้สึกเศร้า' : 'I feel sad')}
          >
            {language === 'th' ? '😢 เศร้า' : '😢 Sad'}
          </Button>
        </div>
      </div>

      {/* Input */}
      <div className="p-6 pt-0">
        <div className="zen-card p-4">
          <div className="flex items-center space-x-3">
            <Input
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder={t('chat.placeholder')}
              className="zen-input border-0 bg-transparent flex-1 font-thai"
            />
            <Button
              variant="ghost"
              size="sm"
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <Mic className="w-5 h-5 text-gray-600" />
            </Button>
            <Button
              onClick={sendMessage}
              className="zen-button p-2 rounded-full min-w-0"
              disabled={!inputText.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Save Mood Button */}
        <Button className="zen-button-secondary w-full mt-3">
          <BookOpen className="w-4 h-4 mr-2" />
          {t('chat.save_mood')}
        </Button>
      </div>
    </div>
  );
};

export default AiChat;
