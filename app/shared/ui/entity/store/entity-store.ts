import { create } from "zustand";
import { EntityApi } from "../api/entity-api";

interface StoreState<T> {
  data: T[];
  selectedItem?: T;
  totalItems: number | null;
  isLoading: boolean;
  detailLoading: boolean;
  error?: string;
  getAll: (page: number, perPage: number) => Promise<void>;
  getById: (id: string) => Promise<void>;
  create: (payload: T) => Promise<void>;
  update: (id: string, payload: Partial<T>) => Promise<void>;
  delete: (id: string) => Promise<void>;
}

export const useEntityStore = <T>(api: ReturnType<typeof EntityApi<T>>) =>
  create<StoreState<T>>((set) => ({
    data: [],
    selectedItem: undefined,
    totalItems: 0,
    isLoading: false,
    detailLoading: false,
    error: undefined,

    getAll: async (page, perPage) => {
      set({ isLoading: true, error: undefined });
      try {
        const response = await api.getAll(page, perPage);
        set({
          data: response.data,
          totalItems: response.totalCount,
          isLoading: false,
        });
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : "Unknown error",
          isLoading: false,
        });
      }
    },

    getById: async (id) => {
      set({ detailLoading: true, error: undefined });
      try {
        const selectedItem = await api.getById(id);
        set({ selectedItem, detailLoading: false });
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : "Unknown error",
          detailLoading: false,
        });
      }
    },

    create: async (payload) => {
      set({ isLoading: true, error: undefined });
      try {
        const newItem = await api.create(payload);
        set((state) => ({
          data: [...state.data, newItem],
          isLoading: false,
        }));
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : "Unknown error",
          isLoading: false,
        });
      }
    },

    update: async (id, payload) => {
      set({ isLoading: true, error: undefined });
      try {
        await api.update(id, payload);
        await useEntityStore(api).getState().getAll(1, 10); // Refresh list
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : "Unknown error",
          isLoading: false,
        });
      }
    },

    delete: async (id) => {
      set({ isLoading: true, error: undefined });
      try {
        await api.delete(id);
        await useEntityStore(api).getState().getAll(1, 10); // Refresh list
      } catch (error) {
        set({
          error: error instanceof Error ? error.message : "Unknown error",
          isLoading: false,
        });
      }
    },
  }));
