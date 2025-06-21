
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import type { Database } from '@/integrations/supabase/types';
import { createRateLimiter } from '@/utils/validation';
import { toast } from 'sonner';

type Tables = Database['public']['Tables'];
type TableName = keyof Tables;

// Rate limiter for database operations (100 operations per minute)
const dbRateLimiter = createRateLimiter(100, 60 * 1000);

export const useSecureDatabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const secureQuery = async <T extends TableName>(
    tableName: T,
    options?: {
      select?: string;
      filters?: Record<string, any>;
      orderBy?: string;
      ascending?: boolean;
      limit?: number;
    }
  ) => {
    setLoading(true);
    setError(null);

    try {
      // Rate limiting
      if (!dbRateLimiter('query')) {
        throw new Error('Too many database queries. Please slow down.');
      }

      let query = supabase.from(tableName).select(options?.select || '*');

      // Apply filters
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // Apply ordering
      if (options?.orderBy) {
        query = query.order(options.orderBy, { ascending: options.ascending ?? true });
      }

      // Apply limit
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error: queryError } = await query;

      if (queryError) {
        console.error('Database query error:', queryError);
        throw new Error('Failed to fetch data');
      }

      return { data, error: null };
    } catch (error: any) {
      console.error('Secure query error:', error);
      const errorMessage = error.message || 'Database operation failed';
      setError(errorMessage);
      toast.error(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const secureInsert = async <T extends TableName>(
    tableName: T,
    data: Tables[T]['Insert']
  ) => {
    setLoading(true);
    setError(null);

    try {
      const { data: insertedData, error: insertError } = await supabase
        .from(tableName)
        .insert(data)
        .select()
        .single();

      if (insertError) {
        console.error('Database insert error:', insertError);
        throw new Error('Failed to create record');
      }

      toast.success('Record created successfully');
      return { data: insertedData, error: null };
    } catch (error: any) {
      console.error('Secure insert error:', error);
      const errorMessage = error.message || 'Failed to create record';
      setError(errorMessage);
      toast.error(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const secureUpdate = async <T extends TableName>(
    tableName: T,
    id: string,
    updates: Tables[T]['Update']
  ) => {
    setLoading(true);
    setError(null);

    try {
      const { data: updatedData, error: updateError } = await supabase
        .from(tableName)
        .update(updates)
        .eq('id', id)
        .select()
        .single();

      if (updateError) {
        console.error('Database update error:', updateError);
        throw new Error('Failed to update record');
      }

      toast.success('Record updated successfully');
      return { data: updatedData, error: null };
    } catch (error: any) {
      console.error('Secure update error:', error);
      const errorMessage = error.message || 'Failed to update record';
      setError(errorMessage);
      toast.error(errorMessage);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const secureDelete = async <T extends TableName>(
    tableName: T,
    id: string
  ) => {
    setLoading(true);
    setError(null);

    try {
      const { error: deleteError } = await supabase
        .from(tableName)
        .delete()
        .eq('id', id);

      if (deleteError) {
        console.error('Database delete error:', deleteError);
        throw new Error('Failed to delete record');
      }

      toast.success('Record deleted successfully');
      return { error: null };
    } catch (error: any) {
      console.error('Secure delete error:', error);
      const errorMessage = error.message || 'Failed to delete record';
      setError(errorMessage);
      toast.error(errorMessage);
      return { error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    secureQuery,
    secureInsert,
    secureUpdate,
    secureDelete,
    loading,
    error
  };
};
