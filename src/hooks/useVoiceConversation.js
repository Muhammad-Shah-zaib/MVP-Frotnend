"use client";

import { useChatStore } from "@/store";
import { useCallback } from "react";
import { useImageBillboardStore } from "@/store/imageBillboard/imageBillboardStore";
import { useConversation } from "@elevenlabs/react";
import { useElevenLabsStore } from "@/store/elevenlabs/elevenLabsStore";
import { useUserStore } from "@/store/user/userStore";

/**
 * Format session memories into a natural context string for the AI agent
 */
const formatSessionContext = (sessionMemories) => {
  if (!sessionMemories || sessionMemories.length === 0) {
    return "No prior session history.";
  }

  const formattedMemories = sessionMemories.map((item) => {
    const meta = item.metadata;
    return `- ${meta.data}`;
  }).join("\n");

  return `Current session insights:\n${formattedMemories}`;
};

/**
 * Format global memories into a natural context string for the AI agent
 */
const formatGlobalContext = (globalMemories) => {
  if (!globalMemories || globalMemories.length === 0) {
    return "No long-term user knowledge available.";
  }

  const formattedMemories = globalMemories.map((item) => {
    const meta = item.metadata;
    return `- ${meta.data}`;
  }).join("\n");

  return `User profile and preferences:\n${formattedMemories}`;
};

export const useVoiceConversation = () => {
  const {
    isConnected,
    isConnecting,
    error,
    setConnected,
    setConnecting,
    setError,
    setConversationId,
    setChatId,
    setSpeaking,
    reset,
  } = useElevenLabsStore();

  const userId = useUserStore((state) => state.userId);

  const { setImagePath } = useImageBillboardStore();
  const { 
    stopCamera, 
    clearImages, 
    setAutoCapturing, 
    fetchUserMemories,
    createAndSetChatSession 
  } = useChatStore();

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs");
      setConnected(true);
      setConnecting(false);
      setError(null);
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs");
      setAutoCapturing(false);
      stopCamera();
      clearImages();
      reset();
    },
    onError: (error) => {
      console.error("ElevenLabs error:", error);
      setError(error.message);
      setConnecting(false);
      setAutoCapturing(false);
    },
    onMessage: (message) => {
      console.log("Message received:", message);
    },
    onModeChange: (mode) => {
      console.log("Mode changed:", mode);
      setSpeaking(mode.mode === "speaking");
    },
    clientTools: {
      logMessage: async ({ message }) => {
        console.log(message);
      },
      showImageOnScreen: async ({ imagePath }) => {
        console.log("imagePath: " + imagePath);
        setImagePath(imagePath);
      },
      pointObjectInImage: async ({ query }) => {
        console.log("🔍 pointObjectInImage called with query:", query);
      },
    },
  });

  const startConversation = useCallback(async () => {
    try {
      setConnecting(true);
      setError(null);

      const response = await fetch("/api/elevenlabs-signed-url");
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      const userIdToUse = userId || "ANONYMOUS_USER";

      console.log("[Voice Conversation] Creating new chat session...");
      const chatId = await createAndSetChatSession(userIdToUse);
      
      if (!chatId) {
        throw new Error("Failed to create chat session");
      }

      console.log("[Voice Conversation] Chat session created:", chatId);
      console.log("[Voice Conversation] Fetching memories before starting session...");
      
      const memories = await fetchUserMemories(chatId, userIdToUse);
      
      console.log("[Voice Conversation] Memories fetched:", {
        sessionCount: memories.session?.length || 0,
        globalCount: memories.global?.length || 0,
      });

      const sessionContext = formatSessionContext(memories.session);
      const globalContext = formatGlobalContext(memories.global);

      console.log("[Voice Conversation] Formatted contexts:", {
        sessionContext,
        globalContext,
      });

      const returnedConversationId = await conversation.startSession({
        signedUrl: result.signedUrl,
        connectionType: "websocket",
        customLlmExtraBody: {
          chatId,
          userId: userIdToUse,
        },
        dynamicVariables: {
          session_context: sessionContext,
          global_context: globalContext,
        }
      });

      console.log("Conversation started with ID:", returnedConversationId);
      console.log("Chat ID:", chatId);
      console.log("User ID:", userIdToUse);

      setConversationId(returnedConversationId || result.agentId);
      setChatId(chatId);
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setError(error.message);
      setConnecting(false);
    }
  }, [
    conversation, 
    setConnecting, 
    setError, 
    setConversationId, 
    setChatId, 
    userId, 
    fetchUserMemories,
    createAndSetChatSession
  ]);

  const endConversation = useCallback(async () => {
    try {
      await conversation.endSession();
      reset();
    } catch (error) {
      console.error("Failed to end conversation:", error);
      setError(error.message);
    }
  }, [conversation, reset, setError]);

  return {
    isConnected,
    isConnecting,
    error,
    startConversation,
    endConversation,
    status: conversation.status,
  };
};
