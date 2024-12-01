import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANNON_KEY!
);

export const EntityApi = <T>(tableName: string) => ({
  // Fetch all records with pagination
  getAll: async (page: number, perPage: number) => {
    const offset = (page - 1) * perPage;

    const { data, error, count } = await supabase
      .from(tableName)
      .select("*", { count: "exact" })
      .range(offset, offset + perPage - 1);

    if (error) throw error;

    return {
      data,
      totalCount: count,
    };
  },

  // Fetch a single record by ID
  getById: async (id: string) => {
    const { data, error } = await supabase.from(tableName).select("*").eq("id", id).single();
    if (error) throw error;
    return data;
  },

  // Create a new record
  create: async (payload: T): Promise<T> => {
    const { data, error } = await supabase.from(tableName).insert([payload]).single();
    if (error) throw error;
    return data;
  },

  // Update an existing record by ID
  update: async (id: string, payload: Partial<T>): Promise<T> => {
    const { data, error } = await supabase.from(tableName).update(payload).eq("id", id).single();
    if (error) throw error;
    return data;
  },

  // Delete a record by ID
  delete: async (id: string) => {
    const { data, error } = await supabase.from(tableName).delete().eq("id", id);
    if (error) throw error;
    return data;
  },
});
