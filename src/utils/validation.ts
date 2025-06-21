
import { z } from 'zod';

// Input validation schemas
export const chatMessageSchema = z.object({
  message: z.string()
    .min(1, 'Message cannot be empty')
    .max(1000, 'Message too long (max 1000 characters)')
    .refine(
      (val) => !/<script|javascript:|on\w+=/i.test(val),
      'Invalid content detected'
    ),
});

export const moodEntrySchema = z.object({
  mood_score: z.number().min(1).max(10),
  mood_text: z.string().max(50).optional(),
  notes: z.string().max(500).optional().refine(
    (val) => !val || !/<script|javascript:|on\w+=/i.test(val),
    'Invalid content detected'
  ),
});

export const profileUpdateSchema = z.object({
  full_name: z.string()
    .min(1, 'Name is required')
    .max(100, 'Name too long')
    .refine(
      (val) => !/<script|javascript:|on\w+=/i.test(val),
      'Invalid characters in name'
    ),
  preferred_language: z.enum(['th', 'en']),
});

export const feedbackSchema = z.object({
  message: z.string()
    .min(1, 'Feedback message is required')
    .max(1000, 'Feedback too long')
    .refine(
      (val) => !/<script|javascript:|on\w+=/i.test(val),
      'Invalid content detected'
    ),
  rating: z.number().min(1).max(5),
  screen_name: z.string().max(50).optional(),
});

// Input sanitization function
export const sanitizeInput = (input: string): string => {
  return input
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .trim();
};

// Rate limiting utility
export const createRateLimiter = (maxAttempts: number, windowMs: number) => {
  const attempts = new Map<string, { count: number; timestamp: number }>();
  
  return (identifier: string): boolean => {
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Clean old entries
    for (const [key, value] of attempts.entries()) {
      if (value.timestamp < windowStart) {
        attempts.delete(key);
      }
    }
    
    const current = attempts.get(identifier);
    if (!current) {
      attempts.set(identifier, { count: 1, timestamp: now });
      return true;
    }
    
    if (current.count >= maxAttempts) {
      return false;
    }
    
    current.count++;
    current.timestamp = now;
    return true;
  };
};

// Password strength validation
export const passwordSchema = z.string()
  .min(8, 'Password must be at least 8 characters')
  .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
  .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
  .regex(/[0-9]/, 'Password must contain at least one number')
  .regex(/[^A-Za-z0-9]/, 'Password must contain at least one special character');

export const emailSchema = z.string().email('Please enter a valid email address');
