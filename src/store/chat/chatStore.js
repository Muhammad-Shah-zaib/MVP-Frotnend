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
  capturedImage: null,
  uploadedImage: null,
  showUploadInMain: false,
  showCapturedInMain: true,

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
  },

  captureFrame: (videoElement) => {
    const { capturedImage, uploadedImage, showUploadInMain } = get();
    
    if (capturedImage) {
      set({ capturedImage: null });
      return;
    }

    if (!videoElement || !videoElement.videoWidth || !videoElement.videoHeight) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;
    
    const ctx = canvas.getContext('2d');
    ctx.drawImage(videoElement, 0, 0);
    
    const imageDataUrl = canvas.toDataURL('image/jpeg', 0.9);
    
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
    });
  }
}));
