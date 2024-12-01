// import { Education } from "@/app/models/education";
// import { createClient } from "@supabase/supabase-js";

// const supabase = createClient<Education>(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// export const EducationApi = {
//   // Fetch all educations with pagination
//   getEducations: async (page: number, perPage: number) => {
//     const offset = (page - 1) * perPage;

//     const { data, error, count } = await supabase
//       .from("education")
//       .select("*", { count: "exact" }) // Add exact count to get total count for pagination
//       .range(offset, offset + perPage - 1); // Set range based on pagination parameters

//     if (error) throw error;

//     return {
//       data, // Return the list of educations
//       totalCount: count, // Return the total number of records (for pagination)
//     };
//   },

//   // Fetch a single education by ID
//   getEducationById: async (id: string) => {
//     const { data, error } = await supabase
//       .from("education")
//       .select("*")
//       .eq("id", id)
//       .single();
//     if (error) throw error;

//     return data;
//   },

//   // Create a new education record
//   createEducation: async (payload: Education): Promise<Education> => {
//     const { data, error } = await supabase
//       .from("education")
//       .insert([payload]) // Wrap payload in an array
//       .single();
//     if (error) throw error;
//     return data;
//   },

//   // Update an existing education record
//   updateEducation: async (id: string, payload: Partial<Education>): Promise<Education> => {
//     const { data, error } = await supabase
//       .from("education")
//       .update(payload)
//       .eq("id", id)
//       .single();
//     if (error) throw error;
//     return data;
//   },

//   // Delete an education record
//   deleteEducation: async (id: string) => {
//     const { data, error } = await supabase.from("education").delete().eq("id", id);
//     if (error) throw error;

//     return data;
//   }
// };
