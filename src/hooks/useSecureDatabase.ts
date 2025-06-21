
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { toast } from 'sonner';

type Tables = Database['public']['Tables'];

export const useSecureDatabase = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const secureQuery = async <T extends keyof Tables>(
    tableName: T,
    options?: {
      select?: string;
      filters?: Record<string, any>;
      orderBy?: { column: string; ascending?: boolean };
      limit?: number;
    }
  ) => {
    setLoading(true);
    setError(null);

    try {
      let query = supabase.from(tableName).select(options?.select || '*');

      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      if (options?.orderBy) {
        query = query.order(options.orderBy.column, { 
          ascending: options.orderBy.ascending ?? true 
        });
      }

      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error: queryError } = await query;

      if (queryError) {
        throw queryError;
      }

      return { data, error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Database query failed';
      setError(errorMessage);
      toast.error(`Query Error: ${errorMessage}`);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const secureInsert = async <T extends keyof Tables>(
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
        throw insertError;
      }

      toast.success('Data saved successfully');
      return { data: insertedData, error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Insert operation failed';
      setError(errorMessage);
      toast.error(`Insert Error: ${errorMessage}`);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  const secureUpdate = async <T extends keyof Tables>(
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
        throw updateError;
      }

      toast.success('Data updated successfully');
      return { data: updatedData, error: null };
    } catch (err: any) {
      const errorMessage = err.message || 'Update operation failed';
      setError(errorMessage);
      toast.error(`Update Error: ${errorMessage}`);
      return { data: null, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    secureQuery,
    secureInsert,
    secureUpdate,
  };
};
