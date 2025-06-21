
import { useState, useCallback } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { createRateLimiter, emailSchema, passwordSchema } from '@/utils/validation';
import { toast } from 'sonner';

// Rate limiter for auth attempts (5 attempts per 15 minutes)
const authRateLimiter = createRateLimiter(5, 15 * 60 * 1000);

export const useSecureAuth = () => {
  const { signIn, signUp } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const secureSignIn = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      // Rate limiting
      if (!authRateLimiter(email)) {
        throw new Error('Too many login attempts. Please try again later.');
      }

      // Input validation
      const validEmail = emailSchema.parse(email);
      
      const { error } = await signIn(validEmail, password);
      
      if (error) {
        console.error('Sign in error:', error);
        
        // Don't expose internal errors to users
        if (error.message.includes('Invalid login credentials')) {
          throw new Error('Invalid email or password. Please check your credentials and try again.');
        } else if (error.message.includes('Email not confirmed')) {
          throw new Error('Please check your email and click the confirmation link before signing in.');
        } else {
          throw new Error('Sign in failed. Please try again.');
        }
      }

      toast.success('Successfully signed in!');
      
    } catch (error: any) {
      console.error('Secure sign in error:', error);
      toast.error(error.message || 'Sign in failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [signIn]);

  const secureSignUp = useCallback(async (email: string, password: string, fullName?: string) => {
    setIsLoading(true);
    
    try {
      // Rate limiting
      if (!authRateLimiter(email)) {
        throw new Error('Too many registration attempts. Please try again later.');
      }

      // Input validation
      const validEmail = emailSchema.parse(email);
      const validPassword = passwordSchema.parse(password);
      
      // Sanitize full name if provided
      const sanitizedName = fullName?.replace(/[<>\"']/g, '').trim();
      
      const { error } = await signUp(validEmail, validPassword);
      
      if (error) {
        console.error('Sign up error:', error);
        
        if (error.message.includes('already registered')) {
          throw new Error('An account with this email already exists. Please sign in instead.');
        } else if (error.message.includes('Password')) {
          throw new Error('Password does not meet security requirements.');
        } else {
          throw new Error('Registration failed. Please try again.');
        }
      }

      toast.success('Registration successful! Please check your email for confirmation.');
      
    } catch (error: any) {
      console.error('Secure sign up error:', error);
      toast.error(error.message || 'Registration failed');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [signUp]);

  return {
    secureSignIn,
    secureSignUp,
    isLoading
  };
};
