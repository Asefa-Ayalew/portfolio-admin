"use client"
import { supabase } from "../../auth/login/supabase-client";

// Helper function to convert timestamp columns into Date objects
const formatDates = (data: any[]) => {
  return data.map(item => {
    const formattedItem = { ...item };
    for (const key in formattedItem) {
      if (formattedItem[key] && formattedItem[key].toString().includes('T')) {
        formattedItem[key] = new Date(formattedItem[key]); // Convert string timestamps to Date objects
      }
    }
    return formattedItem;
  });
};

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
      data: formatDates(data),  // Format dates before returning
      totalCount: count,
    };
  },

  // Fetch a single record by ID
  getById: async (id: string) => {
    const { data, error } = await supabase.from(tableName).select("*").eq("id", id).single();
    if (error) throw error;

    return formatDates([data])[0];  // Format dates before returning
  },

  // Create a new record
  create: async (payload: T): Promise<T> => {
    const { data, error } = await supabase.from(tableName).insert([payload]).single();
    if (error) throw error;

    return formatDates([data])[0];  // Format dates before returning
  },

  // Update an existing record by ID
  update: async (id: string, payload: Partial<T>): Promise<T> => {
    const { data, error } = await supabase.from(tableName).update(payload).eq("id", id).single();
    if (error) throw error;

    return formatDates([data])[0];  // Format dates before returning
  },

  // Delete a record by ID
  delete: async (id: string) => {
    const { data, error } = await supabase.from(tableName).delete().eq("id", id);
    if (error) throw error;

    return data;
  },
});
