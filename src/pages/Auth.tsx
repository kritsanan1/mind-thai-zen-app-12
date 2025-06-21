
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Mail, Lock, User, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const Auth = () => {
  const { language } = useLanguage();
  const { signIn, signUp, loading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSignUp) {
      if (formData.password !== formData.confirmPassword) {
        toast({
          title: language === 'th' ? 'รหัสผ่านไม่ตรงกัน' : 'Passwords don\'t match',
          description: language === 'th' ? 'กรุณาตรวจสอบรหัสผ่านอีกครั้ง' : 'Please check your passwords again',
          variant: 'destructive'
        });
        return;
      }

      if (formData.password.length < 6) {
        toast({
          title: language === 'th' ? 'รหัสผ่านสั้นเกินไป' : 'Password too short',
          description: language === 'th' ? 'รหัสผ่านต้องมีอย่างน้อย 6 ตัวอักษร' : 'Password must be at least 6 characters',
          variant: 'destructive'
        });
        return;
      }

      try {
        const { error } = await signUp(formData.email, formData.password);
        if (error) {
          throw error;
        }
        
        toast({
          title: language === 'th' ? 'สมัครสมาชิกสำเร็จ' : 'Registration successful',
          description: language === 'th' ? 'กรุณาตรวจสอบอีเมลเพื่อยืนยันบัญชี' : 'Please check your email to verify your account'
        });
        
        setIsSignUp(false);
      } catch (error: any) {
        toast({
          title: language === 'th' ? 'เกิดข้อผิดพลาด' : 'Registration failed',
          description: error.message || (language === 'th' ? 'กรุณาลองใหม่อีกครั้ง' : 'Please try again'),
          variant: 'destructive'
        });
      }
    } else {
      try {
        const { error } = await signIn(formData.email, formData.password);
        if (error) {
          throw error;
        }
        
        toast({
          title: language === 'th' ? 'เข้าสู่ระบบสำเร็จ' : 'Login successful',
          description: language === 'th' ? 'ยินดีต้อนรับกลับมา' : 'Welcome back'
        });
        
        navigate('/app');
      } catch (error: any) {
        toast({
          title: language === 'th' ? 'เข้าสู่ระบบไม่สำเร็จ' : 'Login failed',
          description: error.message || (language === 'th' ? 'กรุณาตรวจสอบอีเมลและรหัสผ่าน' : 'Please check your email and password'),
          variant: 'destructive'
        });
      }
    }
  };

  return (
    <div className="min-h-screen thai-gradient flex items-center justify-center p-6">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="text-center">
          <div className="lotus-glow w-16 h-16 mx-auto mb-6 meditation-float">
            <div className="w-8 h-8 bg-gradient-to-br from-zen-lotus to-purple-300 rounded-full mx-auto lotus-bloom flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
          </div>
          
          <h1 className="text-2xl font-bold text-gray-800 mb-2 font-thai">
            {isSignUp 
              ? (language === 'th' ? 'สมัครสมาชิก' : 'Sign Up')
              : (language === 'th' ? 'เข้าสู่ระบบ' : 'Sign In')
            }
          </h1>
          
          <p className="text-gray-600 font-thai">
            {isSignUp 
              ? (language === 'th' ? 'เริ่มต้นการเดินทางสู่ความสงบใจ' : 'Begin your journey to inner peace')
              : (language === 'th' ? 'ยินดีต้อนรับกลับมา' : 'Welcome back')
            }
          </p>
        </div>

        {/* Form */}
        <Card className="zen-card border-0">
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="font-thai">
                    {language === 'th' ? 'ชื่อ-นามสกุล' : 'Full Name'}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required={isSignUp}
                      className="zen-input pl-10"
                      placeholder={language === 'th' ? 'กรอกชื่อ-นามสกุล' : 'Enter your full name'}
                      value={formData.fullName}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="font-thai">
                  {language === 'th' ? 'อีเมล' : 'Email'}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className="zen-input pl-10"
                    placeholder={language === 'th' ? 'กรอกอีเมล' : 'Enter your email'}
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-thai">
                  {language === 'th' ? 'รหัสผ่าน' : 'Password'}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                  <Input
                    id="password"
                    name="password"
                    type={showPassword ? 'text' : 'password'}
                    required
                    className="zen-input pl-10 pr-10"
                    placeholder={language === 'th' ? 'กรอกรหัสผ่าน' : 'Enter your password'}
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword" className="font-thai">
                    {language === 'th' ? 'ยืนยันรหัสผ่าน' : 'Confirm Password'}
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      required={isSignUp}
                      className="zen-input pl-10"
                      placeholder={language === 'th' ? 'ยืนยันรหัสผ่าน' : 'Confirm your password'}
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              )}

              <Button 
                type="submit" 
                className="zen-button w-full"
                disabled={loading}
              >
                {loading 
                  ? (language === 'th' ? 'กำลังดำเนินการ...' : 'Processing...')
                  : isSignUp 
                    ? (language === 'th' ? 'สมัครสมาชิก' : 'Sign Up')
                    : (language === 'th' ? 'เข้าสู่ระบบ' : 'Sign In')
                }
              </Button>
            </form>

            {/* Toggle Sign Up/In */}
            <div className="mt-6 text-center">
              <p className="text-gray-600 font-thai">
                {isSignUp 
                  ? (language === 'th' ? 'มีบัญชีแล้ว?' : 'Already have an account?')
                  : (language === 'th' ? 'ยังไม่มีบัญชี?' : 'Don\'t have an account?')
                }
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="ml-2 text-blue-600 hover:text-blue-800 font-medium"
                >
                  {isSignUp 
                    ? (language === 'th' ? 'เข้าสู่ระบบ' : 'Sign In')
                    : (language === 'th' ? 'สมัครสมาชิก' : 'Sign Up')
                  }
                </button>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Back to Home */}
        <div className="text-center">
          <button
            onClick={() => navigate('/')}
            className="text-gray-600 hover:text-gray-800 font-thai"
          >
            {language === 'th' ? '← กลับหน้าหลัก' : '← Back to Home'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Auth;
