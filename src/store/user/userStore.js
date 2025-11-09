import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  userId: null,
  user: null,

  setUserId: (id) => set({ userId: id }),
  setUser: (userData) => set({ 
    user: userData,
    userId: userData?.id || null 
  }),
  
  reset: () => set({
    userId: null,
    user: null
  })
}))