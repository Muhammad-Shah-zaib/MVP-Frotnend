"use client";

import { useCallback, useEffect } from "react";
import { useConversation } from "@elevenlabs/react";
import { getElevenLabsSignedUrl } from "@/actions/elevenlabs";
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
    reset
  } = useElevenLabsStore();

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs");
      setConnected(true);
      setConnecting(false);
      setError(null);
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs");
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
    }
  });

  const startConversation = useCallback(async () => {
    try {
      setConnecting(true);
      setError(null);

      const result = await getElevenLabsSignedUrl();

      if (!result.success) {
        throw new Error(result.error);
      }

      const returnedConversationId = await conversation.startSession({
        signedUrl: result.signedUrl,
        connectionType: 'websocket'
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
    status: conversation.status
  };
};
