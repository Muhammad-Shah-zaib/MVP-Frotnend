import { create } from "zustand";
import {
  PERMISSION_STATES,
  ERROR_NAMES,
  PERMISSION_MESSAGES,
  AUDIO_PERMISSION_MESSAGES,
} from "@/constants/chat";
import { EMPTY_STRING } from "@/constants/general";
import { uploadToServer } from "@/actions/elevenlabs";
import { useElevenLabsStore } from "@/store";
import { supabaseBrowser } from "@/lib/Supabase/client";
import { generateSessionUserId, generateGlobalUserId } from "@/utils/memoryUtils";

export const useChatStore = create((set, get) => ({
  cameraStream: null,
  isCameraActive: false,
  audioStream: null,
  isAudioActive: false,
  permissionState: PERMISSION_STATES.IDLE,
  audioPermissionState: PERMISSION_STATES.IDLE,
  permissionError: EMPTY_STRING,
  audioPermissionError: EMPTY_STRING,
  capturedImage: null,
  uploadedImage: null,
  showUploadInMain: false,
  showCapturedInMain: true,
  isAutoCapturing: false,
  autoCaptureInterval: 1000,
  similarityThreshold: 10,
  lastImageHash: null,
  lastCaptureTime: 0,

  startCamera: async () => {
    set({
      permissionState: PERMISSION_STATES.REQUESTING,
      permissionError: EMPTY_STRING,
    });

    try {
      let stream = null;

      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: { ideal: "environment" } },
          audio: true,
        });
      } catch (backCameraError) {
        stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "user" },
          audio: true,
        });
      }

      set({
        cameraStream: stream,
        isCameraActive: true,
        permissionState: PERMISSION_STATES.GRANTED,
      });
    } catch (error) {
      console.error("Error accessing camera:", error);
      let permissionError = PERMISSION_MESSAGES.GENERIC;

      if (error.name === ERROR_NAMES.NOT_ALLOWED)
        permissionError = PERMISSION_MESSAGES.DENIED;
      else if (error.name === ERROR_NAMES.NOT_FOUND)
        permissionError = PERMISSION_MESSAGES.NOT_FOUND;
      else if (error.name === ERROR_NAMES.NOT_SUPPORTED)
        permissionError = PERMISSION_MESSAGES.NOT_SUPPORTED;

      set({ permissionState: PERMISSION_STATES.DENIED, permissionError });
    }
  },

  stopCamera: () => {
    const { cameraStream } = get();
    if (cameraStream) {
      cameraStream.getTracks().forEach((track) => track.stop());
    }
    set({
      cameraStream: null,
      isCameraActive: false,
      permissionState: PERMISSION_STATES.IDLE,
      permissionError: EMPTY_STRING,
      capturedImage: null,
      uploadedImage: null,
      showUploadInMain: false,
      isAutoCapturing: false,
      lastImageHash: null,
      lastCaptureTime: 0,
    });
  },

  retryPermission: () => {
    get().startCamera();
  },

  toggleCamera: () => {
    const { isCameraActive, stopCamera, startCamera } = get();

    if (isCameraActive) stopCamera();
    else startCamera();
  },

  startAudio: async () => {
    set({
      audioPermissionState: PERMISSION_STATES.REQUESTING,
      audioPermissionError: EMPTY_STRING,
    });

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: {
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true,
        },
      });
      set({
        audioStream: stream,
        isAudioActive: true,
        audioPermissionState: PERMISSION_STATES.GRANTED,
      });
    } catch (error) {
      console.error("Error accessing microphone:", error);
      let audioPermissionError = AUDIO_PERMISSION_MESSAGES.GENERIC;

      if (error.name === ERROR_NAMES.NOT_ALLOWED)
        audioPermissionError = AUDIO_PERMISSION_MESSAGES.DENIED;
      else if (error.name === ERROR_NAMES.NOT_FOUND)
        audioPermissionError = AUDIO_PERMISSION_MESSAGES.NOT_FOUND;
      else if (error.name === ERROR_NAMES.NOT_SUPPORTED)
        audioPermissionError = AUDIO_PERMISSION_MESSAGES.NOT_SUPPORTED;

      set({
        audioPermissionState: PERMISSION_STATES.DENIED,
        audioPermissionError,
      });
    }
  },

  stopAudio: () => {
    const { audioStream } = get();
    if (audioStream) {
      audioStream.getTracks().forEach((track) => track.stop());
    }
    set({
      audioStream: null,
      isAudioActive: false,
      audioPermissionState: PERMISSION_STATES.IDLE,
      audioPermissionError: EMPTY_STRING,
    });
  },

  retryAudioPermission: () => {
    get().startAudio();
  },

  toggleAudio: () => {
    const { isAudioActive, stopAudio, startAudio } = get();

    if (isAudioActive) stopAudio();
    else startAudio();
  },

  captureFrame: (videoElement, opts) => {
    const { capturedImage, uploadedImage, showUploadInMain } = get();

    if (capturedImage) {
      set({ capturedImage: null });
      return;
    }

    if (
      !videoElement ||
      !videoElement.videoWidth ||
      !videoElement.videoHeight
    ) {
      return;
    }

    const canvas = document.createElement("canvas");
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    const ctx = canvas.getContext("2d");
    ctx.drawImage(videoElement, 0, 0);

    const imageDataUrl = canvas.toDataURL("image/jpeg", 0.9);

    if (uploadedImage) {
      set({
        capturedImage: imageDataUrl,
        showCapturedInMain: showUploadInMain ? false : true,
      });
    } else {
      set({
        capturedImage: imageDataUrl,
      });
    }

    try {
      const dataURLtoFile = (dataurl, filename) => {
        const arr = dataurl.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) {
          u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, { type: mime });
      };

      const file = dataURLtoFile(imageDataUrl, `capture_${Date.now()}.jpg`);
      const conversationIdFromStore = useElevenLabsStore.getState
        ? useElevenLabsStore.getState().conversationId
        : null;
      const userIdFromStore = useElevenLabsStore.getState
        ? useElevenLabsStore.getState().userId
        : null;

      const conv =
        (opts && opts.conversationId) ||
        conversationIdFromStore ||
        (typeof window !== "undefined" && window.LMA_CONVERSATION_ID) ||
        null;
      const uid =
        (opts && opts.userId) ||
        userIdFromStore ||
        (typeof window !== "undefined" && window.LMA_USER_ID) ||
        null;

      uploadToServer(file, conv, uid).catch(() => {});
    } catch (err) {
      console.info(
        "[Upload] failed to convert and upload captured image:",
        err
      );
    }
  },

  uploadImage: (file) => {
    const { capturedImage } = get();
    const reader = new FileReader();
    reader.onload = (e) => {
      if (capturedImage) {
        set({
          uploadedImage: e.target.result,
          showUploadInMain: true,
          showCapturedInMain: false,
        });
      } else {
        set({
          uploadedImage: e.target.result,
          capturedImage: null,
          showUploadInMain: true,
        });
      }
    };
    reader.readAsDataURL(file);
  },

  swapImageAndCamera: () => {
    const { showUploadInMain, capturedImage, uploadedImage } = get();

    if (capturedImage && uploadedImage) {
      set({
        showCapturedInMain: !get().showCapturedInMain,
      });
    } else {
      set({
        showUploadInMain: !showUploadInMain,
      });
    }
  },

  clearImages: () => {
    set({
      capturedImage: null,
      uploadedImage: null,
      showUploadInMain: false,
      showCapturedInMain: true,
      lastImageHash: null,
      lastCaptureTime: 0,
    });
  },

  toggleAutoCapture: () => {
    set({ isAutoCapturing: !get().isAutoCapturing });
  },

  setAutoCapturing: (isAutoCapturing) => {
    set({ isAutoCapturing });
  },

  setLastImageHash: (hash) => {
    set({ lastImageHash: hash });
  },

  setLastCaptureTime: (time) => {
    set({ lastCaptureTime: time });
  },

  getImageData: (videoElement) => {
    if (
      !videoElement ||
      !videoElement.videoWidth ||
      !videoElement.videoHeight
    ) {
      return null;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const width = 64;
    const height = Math.floor(
      videoElement.videoHeight * (width / videoElement.videoWidth)
    );
    const validHeight = Math.max(1, height);

    canvas.width = width;
    canvas.height = validHeight;

    ctx.drawImage(videoElement, 0, 0, width, validHeight);
    return ctx.getImageData(0, 0, width, validHeight);
  },

  calculateImageHash: (imageData) => {
    if (!imageData) return null;

    try {
      const { data, width, height } = imageData;

      if (!data || !width || !height || width <= 0 || height <= 0) {
        return null;
      }

      const grayscale = [];
      for (let i = 0; i < data.length; i += 4) {
        const gray =
          0.299 * data[i] + 0.587 * data[i + 1] + 0.114 * data[i + 2];
        grayscale.push(gray);
      }

      const totalPixels = width * height;
      const average =
        grayscale.reduce((sum, val) => sum + val, 0) / totalPixels;

      let hash = "";
      for (let i = 0; i < grayscale.length; i++) {
        hash += grayscale[i] >= average ? "1" : "0";
      }

      return hash;
    } catch (err) {
      return null;
    }
  },

  calculateSimilarity: (hash1, hash2) => {
    if (!hash1 || !hash2) return 100;
    if (hash1.length !== hash2.length) return 100;

    let differences = 0;
    for (let i = 0; i < hash1.length; i++) {
      if (hash1[i] !== hash2[i]) {
        differences++;
      }
    }

    return (differences / hash1.length) * 100;
  },

  fetchUserMemories: async (chat_id, user_id) => {
    try {
      console.log("[Memory Fetch] Fetching memories for:", {
        chat_id,
        user_id,
      });

      const sessionUserId = generateSessionUserId(user_id);
      const globalUserId = generateGlobalUserId(user_id);

      console.log("[Memory Fetch] Generated user IDs:", {
        sessionUserId,
        globalUserId,
      });

      const { data: sessionMemories, error: sessionError } =
        await supabaseBrowser
          .rpc("get_session_memories", {
            p_user_id: sessionUserId,
            p_chat_session_id: chat_id,
          });

      if (sessionError) {
        console.error(
          "[Memory Fetch] Error fetching session memories:",
          sessionError
        );
      }

      const { data: globalMemories, error: globalError } = await supabaseBrowser
        .rpc("get_global_memories", {
          p_user_id: globalUserId,
        });

      if (globalError) {
        console.error(
          "[Memory Fetch] Error fetching global memories:",
          globalError
        );
      }

      console.group("[Memory Fetch Results]");
      console.log("Session Memories:", sessionMemories || []);
      console.log("Global Memories:", globalMemories || []);
      console.groupEnd();

      return {
        session: sessionMemories || [],
        global: globalMemories || [],
      };
    } catch (err) {
      console.error("[Memory Fetch] Unexpected error:", err);
      return { session: [], global: [] };
    }
  },

  createAndSetChatSession: async (userId) => {
    try {
      const { createChatSession } = await import("@/actions/chat/create-session");
      
      const result = await createChatSession(userId);
      
      if (result.success) {
        const setChatId = useElevenLabsStore.getState().setChatId;
        setChatId(result.sessionId);
        
        console.log("[Chat Store] Chat session created:", result.sessionId);
        return result.sessionId;
      } else {
        console.error("[Chat Store] Failed to create chat session:", result.error);
        return null;
      }
    } catch (err) {
      console.error("[Chat Store] Error creating chat session:", err);
      return null;
    }
  },
}));

// INTERFACE DEFINITIONS FOR REFERENCE ONLY

// CHAT chat_sessions TABLE IN SUPABASE

// interface ChatSession {
//   id: string;                 // UUID, unique session id
//   user_id: string;            // UUID, owner of the session
//   title: string;              // text, user-given title for the session
//   cover_image?: string | null; // text, optional public URL for session cover image
//   metadata: Record<string, any>; // JSONB, additional session-level info
//   created_at: string;         // timestamp with timezone, session creation
//   updated_at: string;         // timestamp with timezone, last update
// }
