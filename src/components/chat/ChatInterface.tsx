
import { useState, useRef, useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Send, Mic, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Message {
  id: string;
  text: string;
  isFromUser: boolean;
  timestamp: Date;
}

interface SuggestionChip {
  id: string;
  text: string;
  action: string;
}

export const ChatInterface = () => {
  const { t, language } = useLanguage();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: language === 'th' 
        ? 'สวัสดีค่ะ! ฉันคือผู้ช่วย AI ที่เข้าใจวัฒนธรรมไทย พร้อมที่จะรับฟังและช่วยเหลือคุณ บอกฉันได้เลยว่าวันนี้คุณรู้สึกอย่างไร'
        : 'Hello! I\'m your culturally-aware AI assistant, ready to listen and help. Tell me how you\'re feeling today.',
      isFromUser: false,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestionChips: SuggestionChip[] = [
    {
      id: '1',
      text: language === 'th' ? 'ลองแบบฝึกหายใจ' : 'Try breathing exercise',
      action: 'breathing'
    },
    {
      id: '2',
      text: language === 'th' ? 'ฉันรู้สึกเครียด' : 'I feel stressed',
      action: 'stress'
    },
    {
      id: '3',
      text: language === 'th' ? 'ต้องการนั่งสมาธิ' : 'Need meditation',
      action: 'meditation'
    },
    {
      id: '4',
      text: language === 'th' ? 'รู้สึกวิตกกังวล' : 'Feeling anxious',
      action: 'anxiety'
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const generateAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (language === 'th') {
      if (lowerMessage.includes('เครียด') || lowerMessage.includes('stress')) {
        return 'ฉันเข้าใจว่าคุณรู้สึกเครียด การหายใจลึกๆ จะช่วยให้คุณรู้สึกสงบขึ้นได้ ลองนั่งสมาธิ 5 นาทีกับฉันไหม?';
      } else if (lowerMessage.includes('วิตกกังวล') || lowerMessage.includes('กังวล')) {
        return 'ความกังวลเป็นเรื่องปกติ แต่เราสามารถจัดการกับมันได้ ลองเทคนิค "อานาปานสติ" การสังเกตลมหายใจเข้าออกดูไหม?';
      } else if (lowerMessage.includes('เศร้า') || lowerMessage.includes('sad')) {
        return 'ขอบคุณที่เล่าให้ฉันฟัง ความรู้สึกเศร้าเป็นส่วนหนึ่งของชีวิต ลองเขียนสิ่งที่ขอบคุณ 3 อย่างในวันนี้ดูไหม?';
      } else {
        return 'ขอบคุณที่แบ่งปันความรู้สึกกับฉัน ฉันอยู่ที่นี่เพื่อรับฟังและช่วยเหลือคุณเสมอ มีอะไรอื่นที่อยากคุยไหม?';
      }
    } else {
      if (lowerMessage.includes('stress') || lowerMessage.includes('เครียด')) {
        return 'I understand you\'re feeling stressed. Deep breathing can help you feel more calm. Would you like to try a 5-minute meditation with me?';
      } else if (lowerMessage.includes('anxious') || lowerMessage.includes('anxiety')) {
        return 'Anxiety is normal, but we can manage it together. Try the "Anapanasati" technique - observing your breath in and out. Would you like me to guide you?';
      } else if (lowerMessage.includes('sad') || lowerMessage.includes('เศร้า')) {
        return 'Thank you for sharing with me. Sadness is part of life. Try writing down 3 things you\'re grateful for today. It might help shift your perspective.';
      } else {
        return 'Thank you for sharing your feelings with me. I\'m here to listen and help you always. Is there anything else you\'d like to talk about?';
      }
    }
  };

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      isFromUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    // Simulate AI processing time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateAIResponse(inputText),
        isFromUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleSuggestionClick = (suggestion: SuggestionChip) => {
    setInputText(suggestion.text);
  };

  const handleSaveMood = () => {
    // Here you would implement mood saving to database
    console.log('Saving mood data...');
    // toast.success(t('chat.mood_saved'));
  };

  return (
    <div className="flex flex-col h-full">
      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isFromUser ? 'justify-end' : 'justify-start'}`}
          >
            <Card className={`max-w-[80%] ${
              message.isFromUser 
                ? 'bg-blue-500 text-white' 
                : 'zen-card border-0'
            }`}>
              <CardContent className="p-3">
                <p className="font-thai text-sm leading-relaxed">
                  {message.text}
                </p>
                <p className={`text-xs mt-2 ${
                  message.isFromUser ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString([], { 
                    hour: '2-digit', 
                    minute: '2-digit' 
                  })}
                </p>
              </CardContent>
            </Card>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <Card className="zen-card border-0">
              <CardContent className="p-3">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggestion Chips */}
      <div className="p-4 border-t border-white/20">
        <div className="flex flex-wrap gap-2 mb-4">
          {suggestionChips.map((chip) => (
            <Badge
              key={chip.id}
              variant="secondary"
              className="bg-zen-mint text-zen-green cursor-pointer hover:scale-105 transition-transform"
              onClick={() => handleSuggestionClick(chip)}
            >
              {chip.text}
            </Badge>
          ))}
        </div>

        {/* Input Area */}
        <div className="flex space-x-2">
          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={t('chat.placeholder')}
            className="flex-1 font-thai"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="zen-button px-3"
          >
            <Send className="w-4 h-4" />
          </Button>
          <Button
            variant="outline"
            onClick={handleSaveMood}
            className="px-3"
          >
            <Save className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
