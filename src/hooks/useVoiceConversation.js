"use client";

import { useChatStore } from "@/store";
import { useCallback, useRef, useEffect } from "react";
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

  const { setImagePath, setHighlightedCoordinates } = useImageBillboardStore();
  const { 
    stopCamera, 
    clearImages, 
    setAutoCapturing, 
    fetchUserMemories,
    createAndSetChatSession,
    getCurrentMainImage
  } = useChatStore();

  const highlightTimeoutRef = useRef(null);

  // Connection audio (played on ElevenLabs connect/disconnect)
  const connectionAudioRef = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        connectionAudioRef.current = new Audio("/connection.mp3");
        connectionAudioRef.current.preload = "auto";
      } catch (e) {
        console.debug("Failed to create connection audio:", e);
      }
    }
  }, []);

  const playConnectionSound = () => {
    try {
      const audio = connectionAudioRef.current;
      if (audio) {
        audio.currentTime = 0;
        audio.play().catch((err) => {
          // Playback may be blocked by browser autoplay policies; ignore silently
          console.debug("Connection audio play failed:", err);
        });
      }
    } catch (err) {
      console.debug("playConnectionSound error:", err);
    }
  };

  const conversation = useConversation({
    onConnect: () => {
      console.log("Connected to ElevenLabs");
      setConnected(true);
      setConnecting(false);
      setError(null);
      // Play connection sound on successful connect
      try {
        playConnectionSound();
      } catch (e) {
        console.debug("Failed to play connection sound on connect:", e);
      }
    },
    onDisconnect: () => {
      console.log("Disconnected from ElevenLabs");
      setAutoCapturing(false);
      reset();
      try {
        playConnectionSound();
      } catch (e) {
        console.debug("Failed to play connection sound on disconnect:", e);
      }
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
        
        try {
          const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";
          const conversationIdFromStore = useElevenLabsStore.getState?.()?.conversationId;
          const chatIdFromStore = useElevenLabsStore.getState?.()?.chatId;
          
          let filename = null;
          const imageToUse = getCurrentMainImage();
          
          if (!imageToUse) {
            console.warn("🔍 No image available for point detection");
            return {
              status: "error",
              message: "No image available. Please upload or capture an image first."
            };
          }

          console.log("🔍 Current main image type:", typeof imageToUse, imageToUse.substring?.(0, 50));

          if (typeof imageToUse === 'string' && imageToUse.startsWith('data:')) {
            console.log("🔍 Image is a data URL, converting to blob and uploading...");
            const blob = await fetch(imageToUse).then(r => r.blob());
            const file = new File([blob], `point-detection-${Date.now()}.jpg`, { type: 'image/jpeg' });
            
            const formData = new FormData();
            formData.append('image', file);
            formData.append('conversation_id', chatIdFromStore || conversationIdFromStore || 'temp');
            formData.append('user_id', userId || 'anonymous');
            
            const uploadResponse = await fetch(`${backendUrl}/api/v1/images/upload`, {
              method: 'POST',
              body: formData
            });
            
            if (!uploadResponse.ok) {
              throw new Error(`Upload failed: ${uploadResponse.status}`);
            }
            
            const uploadData = await uploadResponse.json();
            filename = uploadData.filename || uploadData.public_image_url?.split('/').pop();
            console.log("🔍 Data URL uploaded, filename:", filename);
          } else if (imageToUse instanceof File) {
            console.log("🔍 Image is a File object, uploading...");
            const formData = new FormData();
            formData.append('image', imageToUse);
            formData.append('conversation_id', chatIdFromStore || conversationIdFromStore || 'temp');
            formData.append('user_id', userId || 'anonymous');
            
            const uploadResponse = await fetch(`${backendUrl}/api/v1/images/upload`, {
              method: 'POST',
              body: formData
            });
            
            if (!uploadResponse.ok) {
              throw new Error(`Upload failed: ${uploadResponse.status}`);
            }
            
            const uploadData = await uploadResponse.json();
            filename = uploadData.filename || uploadData.public_image_url?.split('/').pop();
            console.log("🔍 Image uploaded, filename:", filename);
          } else if (typeof imageToUse === 'string') {
            filename = imageToUse.split('/').pop();
            console.log("🔍 Using existing image URL, filename:", filename);
          }
          
          if (!filename) {
            throw new Error("Could not determine image filename");
          }

          console.log("🔍 Calling Moondream API with filename:", filename, "query:", query);
          
          const response = await fetch(`${backendUrl}/api/v1/vision/point`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              filename: filename,
              object: query,
              max_points: 1
            })
          });
          
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || `Point detection failed: ${response.status}`);
          }
          
          const result = await response.json();
          console.log("🔍 Moondream result:", result);
          
          if (result.points && result.points.length > 0) {
            setHighlightedCoordinates(result.points);
            
            if (highlightTimeoutRef.current) {
              clearTimeout(highlightTimeoutRef.current);
            }
            
            highlightTimeoutRef.current = setTimeout(() => {
              setHighlightedCoordinates([]);
            }, 30000);
            
            return {
              status: 'success',
              points: result.points,
              count: result.count,
              message: `Found ${result.count} instance(s) of ${query}`
            };
          } else {
            return {
              status: 'success',
              points: [],
              count: 0,
              message: `No instances of ${query} found in the image`
            };
          }
        } catch (error) {
          console.error("🔍 Error in pointObjectInImage:", error);
          return {
            status: 'error',
            message: error.message || 'Point detection failed',
            error: error.toString()
          };
        }
      },
    },
  });

  const startConversation = useCallback(async (existingChatId = null) => {
    try {
      setConnecting(true);
      setError(null);

      const response = await fetch("/api/elevenlabs-signed-url");
      const result = await response.json();

      if (!result.success) {
        throw new Error(result.error);
      }

      const userIdToUse = userId || "ANONYMOUS_USER";
      let chatId;

      if (existingChatId) {
        console.log("[Voice Conversation] Using existing chat session:", existingChatId);
        chatId = existingChatId;
      } else {
        console.log("[Voice Conversation] Creating new chat session...");
        chatId = await createAndSetChatSession(userIdToUse);
        
        if (!chatId) {
          throw new Error("Failed to create chat session");
        }
        console.log("[Voice Conversation] Chat session created:", chatId);
      }

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
    console.log("[ELEVENLABS] ENDING SESSION")
    try {
      await conversation.endSession();
      console.log("Conversation ended");
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
