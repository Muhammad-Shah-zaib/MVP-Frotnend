import { create } from 'zustand';

export const useImageBillboardStore = create((set) => ({
    isOpen: true,
    setIsOpen: (value) => set({ isOpen: value }),
}));