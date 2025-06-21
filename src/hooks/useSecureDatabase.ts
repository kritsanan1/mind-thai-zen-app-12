
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';

export const useSecureDatabase = () => {
  const { user } = useAuth();

  const secureInsert = useCallback(async (
    tableName: string, 
    data: any
  ) => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    try {
      // Ensure user_id is set correctly
      const dataWithUserId = {
        ...data,
        user_id: user.id
      };

      console.log(`Inserting into ${tableName}:`, dataWithUserId);

      const { data: result, error } = await supabase
        .from(tableName)
        .insert(dataWithUserId)
        .select()
        .single();

      if (error) {
        console.error(`Database insert error for ${tableName}:`, error);
        throw new Error(`Failed to save data: ${error.message}`);
      }

      return result;
    } catch (error: any) {
      console.error(`Secure insert error for ${tableName}:`, error);
      toast.error(error.message || 'Database operation failed');
      throw error;
    }
  }, [user]);

  const secureUpdate = useCallback(async (
    tableName: string,
    id: string,
    data: any
  ) => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    try {
      console.log(`Updating ${tableName} with id ${id}:`, data);

      const { data: result, error } = await supabase
        .from(tableName)
        .update(data)
        .eq('id', id)
        .eq('user_id', user.id) // Ensure user can only update their own data
        .select()
        .single();

      if (error) {
        console.error(`Database update error for ${tableName}:`, error);
        throw new Error(`Failed to update data: ${error.message}`);
      }

      return result;
    } catch (error: any) {
      console.error(`Secure update error for ${tableName}:`, error);
      toast.error(error.message || 'Database operation failed');
      throw error;
    }
  }, [user]);

  const secureSelect = useCallback(async (
    tableName: string,
    columns?: string,
    filters?: Record<string, any>
  ) => {
    if (!user) {
      throw new Error('User must be authenticated');
    }

    try {
      let query = supabase
        .from(tableName)
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
        console.error(`Database select error for ${tableName}:`, error);
        throw new Error(`Failed to fetch data: ${error.message}`);
      }

      return data;
    } catch (error: any) {
      console.error(`Secure select error for ${tableName}:`, error);
      toast.error(error.message || 'Database operation failed');
      throw error;
    }
  }, [user]);

  // Specific secure operations for common actions
  const saveChatMessage = useCallback(async (sessionId: string, message: string, isFromUser: boolean) => {
    return secureInsert('ai_chat_messages', {
      session_id: sessionId,
      message_text: message,
      is_from_user: isFromUser,
      timestamp: new Date().toISOString()
    });
  }, [secureInsert]);

  const saveMoodEntry = useCallback(async (moodData: any) => {
    return secureInsert('mood_entries', moodData);
  }, [secureInsert]);

  const updateProfile = useCallback(async (profileData: any) => {
    if (!user) throw new Error('User must be authenticated');
    
    return secureUpdate('profiles', user.id, profileData);
  }, [secureUpdate, user]);

  const saveFeedback = useCallback(async (feedbackData: any) => {
    return secureInsert('feedback', feedbackData);
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
