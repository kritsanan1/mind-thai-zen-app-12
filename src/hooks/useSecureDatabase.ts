
import { supabase } from '@/integrations/supabase/client';
import { Database } from '@/integrations/supabase/types';
import { useAuth } from '@/contexts/AuthContext';

// Type aliases for better readability
type TableName = keyof Database['public']['Tables'];
type TableRow<T extends TableName> = Database['public']['Tables'][T]['Row'];
type TableInsert<T extends TableName> = Database['public']['Tables'][T]['Insert'];
type TableUpdate<T extends TableName> = Database['public']['Tables'][T]['Update'];

export interface SecureDatabaseOptions {
  enableEncryption?: boolean;
  enableAuditLog?: boolean;
  enableRateLimit?: boolean;
}

export interface DatabaseResult<T = any> {
  data: T | null;
  error: Error | null;
  loading: boolean;
}

export interface SecureDatabaseHook {
  // Generic CRUD operations
  select: <T extends TableName>(
    table: T,
    options?: {
      columns?: string;
      filters?: Record<string, any>;
      orderBy?: string;
      limit?: number;
    }
  ) => Promise<DatabaseResult<TableRow<T>[]>>;

  insert: <T extends TableName>(
    table: T,
    values: TableInsert<T>
  ) => Promise<DatabaseResult<TableRow<T>>>;

  update: <T extends TableName>(
    table: T,
    values: Partial<TableUpdate<T>>,
    filters: Record<string, any>
  ) => Promise<DatabaseResult<TableRow<T>>>;

  delete: <T extends TableName>(
    table: T,
    filters: Record<string, any>
  ) => Promise<DatabaseResult<void>>;

  // User-specific operations (for RLS-enabled tables)
  selectUserData: <T extends TableName>(
    table: T,
    options?: {
      columns?: string;
      filters?: Record<string, any>;
      orderBy?: string;
      limit?: number;
    }
  ) => Promise<DatabaseResult<TableRow<T>[]>>;

  insertUserData: <T extends TableName>(
    table: T,
    values: TableInsert<T>
  ) => Promise<DatabaseResult<TableRow<T>>>;
}

export const useSecureDatabase = (options: SecureDatabaseOptions = {}): SecureDatabaseHook => {
  const { user } = useAuth();

  // Generic select operation
  const select = async <T extends TableName>(
    table: T,
    selectOptions?: {
      columns?: string;
      filters?: Record<string, any>;
      orderBy?: string;
      limit?: number;
    }
  ): Promise<DatabaseResult<TableRow<T>[]>> => {
    try {
      let query = supabase.from(table).select(selectOptions?.columns || '*');

      // Apply filters
      if (selectOptions?.filters) {
        Object.entries(selectOptions.filters).forEach(([key, value]) => {
          query = query.eq(key, value);
        });
      }

      // Apply ordering
      if (selectOptions?.orderBy) {
        query = query.order(selectOptions.orderBy);
      }

      // Apply limit
      if (selectOptions?.limit) {
        query = query.limit(selectOptions.limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error(`Database select error for table ${table}:`, error);
        return { data: null, error: new Error(error.message), loading: false };
      }

      return { data: data as TableRow<T>[], error: null, loading: false };
    } catch (error) {
      console.error('Unexpected error in select operation:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Unknown error'), 
        loading: false 
      };
    }
  };

  // Generic insert operation
  const insert = async <T extends TableName>(
    table: T,
    values: TableInsert<T>
  ): Promise<DatabaseResult<TableRow<T>>> => {
    try {
      const { data, error } = await supabase
        .from(table)
        .insert(values as any)
        .select()
        .single();

      if (error) {
        console.error(`Database insert error for table ${table}:`, error);
        return { data: null, error: new Error(error.message), loading: false };
      }

      return { data: data as TableRow<T>, error: null, loading: false };
    } catch (error) {
      console.error('Unexpected error in insert operation:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Unknown error'), 
        loading: false 
      };
    }
  };

  // Generic update operation
  const update = async <T extends TableName>(
    table: T,
    values: Partial<TableUpdate<T>>,
    filters: Record<string, any>
  ): Promise<DatabaseResult<TableRow<T>>> => {
    try {
      let query = supabase.from(table).update(values as any);

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      const { data, error } = await query.select().single();

      if (error) {
        console.error(`Database update error for table ${table}:`, error);
        return { data: null, error: new Error(error.message), loading: false };
      }

      return { data: data as TableRow<T>, error: null, loading: false };
    } catch (error) {
      console.error('Unexpected error in update operation:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Unknown error'), 
        loading: false 
      };
    }
  };

  // Generic delete operation
  const deleteRecord = async <T extends TableName>(
    table: T,
    filters: Record<string, any>
  ): Promise<DatabaseResult<void>> => {
    try {
      let query = supabase.from(table).delete();

      // Apply filters
      Object.entries(filters).forEach(([key, value]) => {
        query = query.eq(key, value);
      });

      const { error } = await query;

      if (error) {
        console.error(`Database delete error for table ${table}:`, error);
        return { data: null, error: new Error(error.message), loading: false };
      }

      return { data: null, error: null, loading: false };
    } catch (error) {
      console.error('Unexpected error in delete operation:', error);
      return { 
        data: null, 
        error: error instanceof Error ? error : new Error('Unknown error'), 
        loading: false 
      };
    }
  };

  // User-specific select (automatically filters by user_id)
  const selectUserData = async <T extends TableName>(
    table: T,
    selectOptions?: {
      columns?: string;
      filters?: Record<string, any>;
      orderBy?: string;
      limit?: number;
    }
  ): Promise<DatabaseResult<TableRow<T>[]>> => {
    if (!user) {
      return { data: null, error: new Error('User not authenticated'), loading: false };
    }

    const userFilters = {
      user_id: user.id,
      ...(selectOptions?.filters || {})
    };

    return select(table, {
      ...selectOptions,
      filters: userFilters
    });
  };

  // User-specific insert (automatically adds user_id)
  const insertUserData = async <T extends TableName>(
    table: T,
    values: TableInsert<T>
  ): Promise<DatabaseResult<TableRow<T>>> => {
    if (!user) {
      return { data: null, error: new Error('User not authenticated'), loading: false };
    }

    const userValues = {
      ...values,
      user_id: user.id
    } as TableInsert<T>;

    return insert(table, userValues);
  };

  return {
    select,
    insert,
    update,
    delete: deleteRecord,
    selectUserData,
    insertUserData
  };
};

export default useSecureDatabase;
