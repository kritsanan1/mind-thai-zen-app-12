
import { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useSecureAuth } from '@/hooks/useSecureAuth';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Heart, Mail, Lock, User, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';

const Auth = () => {
  const { user } = useAuth();
  const { secureSignIn, secureSignUp, isLoading } = useSecureAuth();
  const navigate = useNavigate();
  const { t, language } = useLanguage();
  
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  // Redirect if already authenticated
  useEffect(() => {
    if (user) {
      navigate('/', { replace: true });
    }
  }, [user, navigate]);

  // Real-time password validation
  useEffect(() => {
    if (password && isSignUp) {
      const errors: string[] = [];
      if (password.length < 8) errors.push('At least 8 characters');
      if (!/[A-Z]/.test(password)) errors.push('One uppercase letter');
      if (!/[a-z]/.test(password)) errors.push('One lowercase letter');
      if (!/[0-9]/.test(password)) errors.push('One number');
      if (!/[^A-Za-z0-9]/.test(password)) errors.push('One special character');
      setValidationErrors(errors);
    } else {
      setValidationErrors([]);
    }
  }, [password, isSignUp]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (isSignUp && validationErrors.length > 0) {
      toast.error('Please fix password requirements');
      return;
    }

    try {
      if (isSignUp) {
        await secureSignUp(email, password, fullName);
        toast.success('Registration successful! Please check your email to confirm your account.');
      } else {
        await secureSignIn(email, password);
        navigate('/', { replace: true });
      }
    } catch (error) {
      // Error is already handled in useSecureAuth
      console.error('Auth error:', error);
    }
  };

  if (user) {
    return null; // Will redirect above
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-zen-pearl via-zen-mist to-zen-lotus flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="lotus-glow w-16 h-16 mx-auto mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-zen-blue to-zen-sage rounded-full mx-auto flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 font-thai mb-2">
            {language === 'th' ? 'มายด์ฟูล ไทย' : 'MindfulThai'}
          </h1>
          <p className="text-gray-600 font-thai text-sm">
            {language === 'th' ? 'แอปดูแลสุขภาพจิตด้วย AI' : 'AI-Powered Mental Health App'}
          </p>
        </div>

        <Card className="zen-card border-0">
          <CardHeader className="space-y-4">
            <div className="text-center">
              <CardTitle className="text-xl font-semibold text-gray-800 font-thai">
                {isSignUp 
                  ? (language === 'th' ? 'สร้างบัญชี' : 'Create Account')
                  : (language === 'th' ? 'เข้าสู่ระบบ' : 'Sign In')
                }
              </CardTitle>
              <CardDescription className="font-thai">
                {isSignUp
                  ? (language === 'th' ? 'เริ่มต้นการดูแลสุขภาพจิตของคุณ' : 'Start your mental wellness journey')
                  : (language === 'th' ? 'ยินดีต้อนรับกลับมา' : 'Welcome back')
                }
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {isSignUp && (
                <div className="space-y-2">
                  <Label htmlFor="fullName" className="font-thai">
                    {language === 'th' ? 'ชื่อ-นามสกุล' : 'Full Name'}
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      id="fullName"
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="pl-10 font-thai"
                      placeholder={language === 'th' ? 'กรอกชื่อ-นามสกุล' : 'Enter your full name'}
                    />
                  </div>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="font-thai">
                  {language === 'th' ? 'อีเมล' : 'Email'}
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    placeholder={language === 'th' ? 'กรอกอีเมล' : 'Enter your email'}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="font-thai">
                  {language === 'th' ? 'รหัสผ่าน' : 'Password'}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10"
                    placeholder={language === 'th' ? 'กรอกรหัสผ่าน' : 'Enter your password'}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 h-4 w-4 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </button>
                </div>
                
                {/* Password requirements for signup */}
                {isSignUp && password && validationErrors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-3">
                    <p className="text-sm font-medium text-red-800 mb-2 font-thai">
                      {language === 'th' ? 'รหัสผ่านต้องมี:' : 'Password must have:'}
                    </p>
                    <ul className="text-xs text-red-700 space-y-1">
                      {validationErrors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <Button
                type="submit"
                className="w-full zen-button"
                disabled={isLoading || (isSignUp && validationErrors.length > 0)}
              >
                {isLoading 
                  ? (language === 'th' ? 'กำลังดำเนินการ...' : 'Processing...') 
                  : isSignUp 
                    ? (language === 'th' ? 'สร้างบัญชี' : 'Create Account')
                    : (language === 'th' ? 'เข้าสู่ระบบ' : 'Sign In')
                }
              </Button>
            </form>

            <Separator className="my-6" />

            <div className="text-center">
              <button
                onClick={() => setIsSignUp(!isSignUp)}
                className="text-sm text-zen-blue hover:text-zen-sage font-thai transition-colors"
              >
                {isSignUp
                  ? (language === 'th' ? 'มีบัญชีแล้ว? เข้าสู่ระบบ' : 'Already have an account? Sign In')
                  : (language === 'th' ? 'ยังไม่มีบัญชี? สร้างบัญชี' : "Don't have an account? Create Account")
                }
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
