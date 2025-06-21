
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { 
  chatMessageSchema, 
  moodEntrySchema, 
  profileUpdateSchema, 
  feedbackSchema,
  sanitizeInput 
} from '@/utils/validation';
import { toast } from 'sonner';

export const useSecureDatabase = () => {
  const { user } = useAuth();

  const secureInsert = useCallback(async (
    table: string, 
    data: any, 
    schema?: any
  ) => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    try {
      // Validate input if schema provided
      let validatedData = data;
      if (schema) {
        validatedData = schema.parse(data);
      }

      // Ensure user_id is set correctly
      const dataWithUserId = {
        ...validatedData,
        user_id: user.id
      };

      console.log(`Inserting into ${table}:`, dataWithUserId);

      const { data: result, error } = await supabase
        .from(table)
        .insert(dataWithUserId)
        .single();

      if (error) {
        console.error(`Database insert error for ${table}:`, error);
        throw new Error(`Failed to save data: ${error.message}`);
      }

      return result;
    } catch (error: any) {
      console.error(`Secure insert error for ${table}:`, error);
      toast.error(error.message || 'Database operation failed');
      throw error;
    }
  }, [user]);

  const secureUpdate = useCallback(async (
    table: string,
    id: string,
    data: any,
    schema?: any
  ) => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    try {
      let validatedData = data;
      if (schema) {
        validatedData = schema.parse(data);
      }

      console.log(`Updating ${table} with id ${id}:`, validatedData);

      const { data: result, error } = await supabase
        .from(table)
        .update(validatedData)
        .eq('id', id)
        .eq('user_id', user.id) // Ensure user can only update their own data
        .single();

      if (error) {
        console.error(`Database update error for ${table}:`, error);
        throw new Error(`Failed to update data: ${error.message}`);
      }

      return result;
    } catch (error: any) {
      console.error(`Secure update error for ${table}:`, error);
      toast.error(error.message || 'Database operation failed');
      throw error;
    }
  }, [user]);

  const secureSelect = useCallback(async (
    table: string,
    columns?: string,
    filters?: any
  ) => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    try {
      let query = supabase
        .from(table)
        .select(columns || '*')
        .eq('user_id', user.id); // Always filter by user_id

      // Apply additional filters if provided
      if (filters) {
        Object.entries(filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      const { data, error } = await query;

      if (error) {
        console.error(`Database select error for ${table}:`, error);
        throw new Error(`Failed to fetch data: ${error.message}`);
      }

      return data;
    } catch (error: any) {
      console.error(`Secure select error for ${table}:`, error);
      toast.error(error.message || 'Database operation failed');
      throw error;
    }
  }, [user]);

  // Specific secure operations for common actions
  const saveChatMessage = useCallback(async (sessionId: string, message: string, isFromUser: boolean) => {
    const validatedMessage = chatMessageSchema.parse({ message });
    
    return secureInsert('ai_chat_messages', {
      session_id: sessionId,
      message_text: sanitizeInput(validatedMessage.message),
      is_from_user: isFromUser,
      timestamp: new Date().toISOString()
    });
  }, [secureInsert]);

  const saveMoodEntry = useCallback(async (moodData: any) => {
    return secureInsert('mood_entries', moodData, moodEntrySchema);
  }, [secureInsert]);

  const updateProfile = useCallback(async (profileData: any) => {
    if (!user) throw new Error('User must be authenticated');
    
    return secureUpdate('profiles', user.id, profileData, profileUpdateSchema);
  }, [secureUpdate, user]);

  const saveFeedback = useCallback(async (feedbackData: any) => {
    return secureInsert('feedback', feedbackData, feedbackSchema);
  }, [secureInsert]);

  return {
    secureInsert,
    secureUpdate,
    secureSelect,
    saveChatMessage,
    saveMoodEntry,
    updateProfile,
    saveFeedback
  };
};
