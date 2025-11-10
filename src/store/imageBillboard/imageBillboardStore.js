import { create } from 'zustand';

export const useImageBillboardStore = create((set) => ({
    isOpen: true,
    imagePath: null,
    highlightedCoordinates: [],
    setIsOpen: (value) => set({ isOpen: value }),
    setImagePath: (path) => set({ imagePath: path, isOpen: true }),
    setHighlightedCoordinates: (coordinates) => set({ highlightedCoordinates: coordinates }),
    clearHighlightedCoordinates: () => set({ highlightedCoordinates: [] }),
}));