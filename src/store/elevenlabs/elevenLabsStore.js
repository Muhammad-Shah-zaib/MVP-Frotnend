import { create } from "zustand";

export const useElevenLabsStore = create((set) => ({
  isConnected: false,
  isConnecting: false,
  error: null,
  conversationId: null,
  isMuted: false,
  isSpeaking: false,
  
  setConnected: (connected) => set({ isConnected: connected }),
  setConnecting: (connecting) => set({ isConnecting: connecting }),
  setError: (error) => set({ error }),
  setConversationId: (id) => set({ conversationId: id }),
  setMuted: (muted) => set({ isMuted: muted }),
  setSpeaking: (speaking) => set({ isSpeaking: speaking }),
  
  reset: () => set({
    isConnected: false,
    isConnecting: false,
    error: null,
    conversationId: null,
    isMuted: false,
    isSpeaking: false
  })
}));
