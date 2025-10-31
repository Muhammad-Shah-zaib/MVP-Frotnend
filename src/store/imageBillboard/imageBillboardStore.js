import { create } from 'zustand';

export const useImageBillboardStore = create((set) => ({
    isOpen: true,
    imagePath: null,
    setIsOpen: (value) => set({ isOpen: value }),
    setImagePath: (path) => set({ imagePath: path, isOpen: true }),
}));