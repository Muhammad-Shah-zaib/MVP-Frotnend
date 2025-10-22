import { create } from "zustand";
import {
  PERMISSION_STATES,
  ERROR_NAMES,
  PERMISSION_MESSAGES,
  AUDIO_PERMISSION_MESSAGES,
} from "@/constants/chat";
import { EMPTY_STRING } from "@/constants/general";

export const useChatStore = create((set, get) => ({
  cameraStream: null,
  isCameraActive: false,
  audioStream: null,
  isAudioActive: false,
  permissionState: PERMISSION_STATES.IDLE,
  audioPermissionState: PERMISSION_STATES.IDLE,
  permissionError: EMPTY_STRING,
  audioPermissionError: EMPTY_STRING,

  // Actions
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
        console.log("Back camera not available, trying front camera:", backCameraError);
        
        // If back camera fails, fall back to front camera (user-facing)
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

      set({ audioPermissionState: PERMISSION_STATES.DENIED, audioPermissionError });
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
  }
}));
