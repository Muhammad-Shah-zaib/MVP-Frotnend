"use client";

import { useChatStore } from "@/store";
import { useCallback } from "react";
import { useImageBillboardStore } from "@/store/imageBillboard/imageBillboardStore";
import { useConversation } from "@elevenlabs/react";
import { useElevenLabsStore } from "@/store/elevenlabs/elevenLabsStore";

export const useVoiceConversation = () => {
  const {
    isConnected,
    isConnecting,
    error,
    setConnected,
    setConnecting,
    setError,
    setConversationId,
    setSpeaking,
    reset,
  } = useElevenLabsStore();

  const { setImagePath } = useImageBillboardStore();
  const { stopCamera, clearImages } = useChatStore();

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs");
      setConnected(true);
      setConnecting(false);
      setError(null);
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs");
      stopCamera();
      clearImages();
      reset();
    },
    onError: (error) => {
      console.error("ElevenLabs error:", error);
      setError(error.message);
      setConnecting(false);
    },
    onMessage: (message) => {
      console.log("Message received:", message);
    },
    onModeChange: (mode) => {
      console.log("Mode changed:", mode);
      setSpeaking(mode.mode === "speaking");
    },
    clientTools: {
      showImageOnScreen: async ({ imagePath }) => {
        console.log("imagePath: " + imagePath);
        setImagePath(imagePath);
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

      const returnedConversationId = await conversation.startSession({
        signedUrl: result.signedUrl,
        connectionType: "websocket",
      });

      setConversationId(returnedConversationId || result.agentId);
    } catch (error) {
      console.error("Failed to start conversation:", error);
      setError(error.message);
      setConnecting(false);
    }
  }, [conversation, setConnecting, setError, setConversationId]);

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
