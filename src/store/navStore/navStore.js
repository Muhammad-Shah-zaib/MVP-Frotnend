import { create } from 'zustand';

export const useNavStore = create((set) => ({
    isOpen: false,

    setIsOpen: (value) => set({ isOpen: value }),
    openNavBar: () => set({ isOpen: true }),
    closeNavBar: () => set({ isOpen: false }),
}));