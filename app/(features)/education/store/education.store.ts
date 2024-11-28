// import { Education } from "@/app/models/education";
// import { create } from "zustand";
// import { EducationApi } from "../api/education.api";

// interface EducationState {
//   educations: Education[];
//   selectedEducation?: Education; // Allow undefined
//   totalEducation: number | null;
//   isLoading: boolean;
//   detailLoading: boolean;
//   error?: string; // Allow undefined
//   getEducations: (page: number, perPage: number) => Promise<void>; // Accept page and perPage
//   getEducation: (id: string) => Promise<void>;
//   createEducation: (payload: Education) => Promise<void>;
//   updateEducation: (id: string, payload: Partial<Education>) => Promise<void>;
//   deleteEducation: (id: string) => Promise<void>;
// }

// export const useEducationStore = create<EducationState>((set) => ({
//   educations: [],
//   selectedEducation: undefined,
//   totalEducation: 0,
//   isLoading: false,
//   detailLoading: false,
//   error: undefined,

//   // Fetch all educations with pagination
//   getEducations: async (page: number, perPage: number) => {
//     set({
//       isLoading: true,
//       error: undefined,
//     });
//     try {
//       const response = await EducationApi.getEducations(page, perPage );
//       set({
//         educations: response.data, // Assuming `response.data` contains the list of educations
//         totalEducation: response.totalCount, // Assuming `response.totalCount` contains the total count of educations
//         isLoading: false,
//       });
//     } catch (error) {
//       set({ error: error instanceof Error ? error.message : "unknown error", isLoading: false });
//     }
//   },

//   // Fetch a single education by ID
//   getEducation: async (id: string) => {
//     set({
//       detailLoading: true,
//       error: undefined,
//     });
//     try {
//       const selectedEducation = await EducationApi.getEducationById(id);
//       set({ selectedEducation, detailLoading: false });
//     } catch (error) {
//       set({ error: error instanceof Error ? error.message : "unknown error", detailLoading: false });
//     }
//   },

//   // Create a new education
//   createEducation: async (payload: Education) => {
//     set({ isLoading: true, error: undefined });
//     try {
//       const newEducation = await EducationApi.createEducation(payload);
//       set((state) => ({
//         educations: [...state.educations, newEducation],
//         isLoading: false,
//       }));
//     } catch (error) {
//       set({
//         error: error instanceof Error ? error.message : "Unknown error",
//         isLoading: false,
//       });
//     }
//   },

//   // Update an education by ID
//   updateEducation: async (id: string, payload: Partial<Education>) => {
//     set({
//       isLoading: true,
//       error: undefined,
//     });
//     try {
//       await EducationApi.updateEducation(id, payload);
//       await useEducationStore.getState().getEducations(1, 10); // Refresh the list after update with default pagination (page 1, perPage 10)
//     } catch (error) {
//       set({ error: error instanceof Error ? error.message : "unknown error", isLoading: false });
//     }
//   },

//   // Delete an education by ID
//   deleteEducation: async (id: string) => {
//     set({
//       isLoading: true,
//       error: undefined,
//     });
//     try {
//       await EducationApi.deleteEducation(id);
//       await useEducationStore.getState().getEducations(1, 10); // Refresh the list after deletion
//     } catch (error) {
//       set({ error: error instanceof Error ? error.message : "unknown error", isLoading: false });
//     }
//   },
// }));
