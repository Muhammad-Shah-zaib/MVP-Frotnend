import { create } from 'zustand';

export const useImageBillboardStore = create((set) => ({
    isOpen: false,
    setIsOpen: (value) => set({ isOpen: value }),
}));