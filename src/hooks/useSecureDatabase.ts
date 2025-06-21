
import { useCallback } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from 'sonner';
import { Tables, TablesInsert, TablesUpdate } from '@/integrations/supabase/types';

interface DatabaseError {
  message: string;
  code?: string;
}

interface DatabaseResult<T> {
  data: T | null;
  error: DatabaseError | null;
}

interface DatabaseListResult<T> {
  data: T[] | null;
  error: DatabaseError | null;
  count: number | null;
}

export const useSecureDatabase = () => {
  const { user } = useAuth();

  const handleError = useCallback((error: any): DatabaseError => {
    console.error('Database operation failed:', error);
    
    if (error?.code === 'PGRST116') {
      return { message: 'No data found', code: error.code };
    }
    
    if (error?.message?.includes('RLS')) {
      return { message: 'Access denied: insufficient permissions', code: 'RLS_ERROR' };
    }
    
    return { message: error?.message || 'Database operation failed', code: error?.code };
  }, []);

  const validateUser = useCallback((): boolean => {
    if (!user) {
      toast.error('You must be logged in to perform this action');
      return false;
    }
    return true;
  }, [user]);

  // Generic select function
  const select = useCallback(async <T extends keyof Tables>(
    table: T,
    options?: {
      columns?: string;
      filters?: Record<string, any>;
      orderBy?: { column: string; ascending?: boolean };
      limit?: number;
      single?: boolean;
    }
  ): Promise<DatabaseResult<Tables[T]['Row']> | DatabaseListResult<Tables[T]['Row']>> => {
    if (!validateUser()) {
      return { data: null, error: { message: 'Authentication required' }, count: null };
    }

    try {
      let query = supabase.from(table).select(options?.columns || '*', { count: 'exact' });

      // Apply filters
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // Apply ordering
      if (options?.orderBy) {
        query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending ?? true });
      }

      // Apply limit
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error, count } = await query;

      if (error) {
        return { data: null, error: handleError(error), count: null };
      }

      if (options?.single) {
        return { data: data?.[0] || null, error: null };
      }

      return { data: data || [], error: null, count };
    } catch (error) {
      return { data: null, error: handleError(error), count: null };
    }
  }, [validateUser, handleError]);

  // Specific insert functions for each table to avoid type issues
  const insertRecord = useCallback(async <T extends keyof Tables>(
    table: T,
    values: any // Using any to avoid complex type issues for now
  ): Promise<DatabaseResult<Tables[T]['Row']>> => {
    if (!validateUser()) {
      return { data: null, error: { message: 'Authentication required' } };
    }

    try {
      const { data, error } = await supabase
        .from(table)
        .insert(values)
        .select()
        .single();

      if (error) {
        return { data: null, error: handleError(error) };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: handleError(error) };
    }
  }, [validateUser, handleError]);

  const updateRecord = useCallback(async <T extends keyof Tables>(
    table: T,
    id: string,
    values: any // Using any to avoid complex type issues for now
  ): Promise<DatabaseResult<Tables[T]['Row']>> => {
    if (!validateUser()) {
      return { data: null, error: { message: 'Authentication required' } };
    }

    try {
      const { data, error } = await supabase
        .from(table)
        .update(values)
        .eq('id', id)
        .select()
        .single();

      if (error) {
        return { data: null, error: handleError(error) };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: handleError(error) };
    }
  }, [validateUser, handleError]);

  const deleteRecord = useCallback(async <T extends keyof Tables>(
    table: T,
    id: string
  ): Promise<DatabaseResult<null>> => {
    if (!validateUser()) {
      return { data: null, error: { message: 'Authentication required' } };
    }

    try {
      const { error } = await supabase
        .from(table)
        .delete()
        .eq('id', id);

      if (error) {
        return { data: null, error: handleError(error) };
      }

      return { data: null, error: null };
    } catch (error) {
      return { data: null, error: handleError(error) };
    }
  }, [validateUser, handleError]);

  // Batch operations
  const insertBatch = useCallback(async <T extends keyof Tables>(
    table: T,
    values: any[] // Using any to avoid complex type issues for now
  ): Promise<DatabaseListResult<Tables[T]['Row']>> => {
    if (!validateUser()) {
      return { data: null, error: { message: 'Authentication required' }, count: null };
    }

    try {
      const { data, error, count } = await supabase
        .from(table)
        .insert(values)
        .select();

      if (error) {
        return { data: null, error: handleError(error), count: null };
      }

      return { data: data || [], error: null, count };
    } catch (error) {
      return { data: null, error: handleError(error), count: null };
    }
  }, [validateUser, handleError]);

  // User-specific operations (for RLS)
  const selectUserData = useCallback(async <T extends keyof Tables>(
    table: T,
    options?: {
      columns?: string;
      filters?: Record<string, any>;
      orderBy?: { column: string; ascending?: boolean };
      limit?: number;
    }
  ): Promise<DatabaseListResult<Tables[T]['Row']>> => {
    if (!validateUser()) {
      return { data: null, error: { message: 'Authentication required' }, count: null };
    }

    try {
      let query = supabase.from(table).select(options?.columns || '*', { count: 'exact' });

      // Always filter by user_id for user-specific data
      query = query.eq('user_id', user!.id);

      // Apply additional filters
      if (options?.filters) {
        Object.entries(options.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // Apply ordering
      if (options?.orderBy) {
        query = query.order(options.orderBy.column, { ascending: options.orderBy.ascending ?? true });
      }

      // Apply limit
      if (options?.limit) {
        query = query.limit(options.limit);
      }

      const { data, error, count } = await query;

      if (error) {
        return { data: null, error: handleError(error), count: null };
      }

      return { data: data || [], error: null, count };
    } catch (error) {
      return { data: null, error: handleError(error), count: null };
    }
  }, [validateUser, handleError, user]);

  const insertUserData = useCallback(async <T extends keyof Tables>(
    table: T,
    values: any // Using any to avoid complex type issues for now
  ): Promise<DatabaseResult<Tables[T]['Row']>> => {
    if (!validateUser()) {
      return { data: null, error: { message: 'Authentication required' } };
    }

    try {
      // Ensure user_id is set
      const dataWithUserId = { ...values, user_id: user!.id };

      const { data, error } = await supabase
        .from(table)
        .insert(dataWithUserId)
        .select()
        .single();

      if (error) {
        return { data: null, error: handleError(error) };
      }

      return { data, error: null };
    } catch (error) {
      return { data: null, error: handleError(error) };
    }
  }, [validateUser, handleError, user]);

  return {
    // Generic operations
    select,
    insert: insertRecord,
    update: updateRecord,
    delete: deleteRecord,
    insertBatch,
    
    // User-specific operations
    selectUserData,
    insertUserData,
    
    // Utility
    validateUser,
    currentUser: user,
  };
};
