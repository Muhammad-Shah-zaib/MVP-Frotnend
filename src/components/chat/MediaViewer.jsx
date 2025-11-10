"use client";

import { useEffect, useRef, useCallback } from "react";
import { useChatStore } from "@/store";
import { useElevenLabsStore } from "@/store";
import { useUserStore } from "@/store/user/userStore";
import { useImageBillboardStore } from "@/store/imageBillboard/imageBillboardStore";
import {
  RequestingView,
  DeniedView,
  IdleView,
  ActiveVideoWrapper,
  ImageView,
} from "./MediaViewerParts";
import CameraOverlay from "./CameraOverlay";
import { PERMISSION_STATES } from "@/constants/chat";
import { uploadToServer } from "@/actions/elevenlabs";

const MediaViewer = () => {
  const videoRef = useRef(null);
  const imageRef = useRef(null);
  const containerRef = useRef(null);
  const autoCaptureTimerRef = useRef(null);
  const hashResetTimeoutRef = useRef(null);

  const { isSpeaking, isConnected, chatId } = useElevenLabsStore();
  const userId = useUserStore((state) => state.userId);
  const { highlightedCoordinates } = useImageBillboardStore();

  const {
    cameraStream,
    isCameraActive,
    permissionState,
    permissionError,
    capturedImage,
    uploadedImage,
    showUploadInMain,
    showCapturedInMain,
    retryPermission,
    swapImageAndCamera,
    isAutoCapturing,
    autoCaptureInterval,
    similarityThreshold,
    lastImageHash,
    lastCaptureTime,
    getImageData,
    calculateImageHash,
    calculateSimilarity,
    setLastImageHash,
    setLastCaptureTime,
  } = useChatStore();


  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream, videoRef, capturedImage, showUploadInMain]);

  const resetHashAfterTimeout = useCallback(() => {
    if (hashResetTimeoutRef.current) {
      clearTimeout(hashResetTimeoutRef.current);
    }

    hashResetTimeoutRef.current = setTimeout(() => {
      setLastImageHash(null);
    }, 20000);
  }, [setLastImageHash]);

  const captureImage = useCallback(async () => {
    if (!videoRef.current || !cameraStream) {
      return null;
    }

    const video = videoRef.current;

    if (
      !video.videoWidth ||
      !video.videoHeight ||
      video.videoWidth <= 0 ||
      video.videoHeight <= 0
    ) {
      return null;
    }

    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return null;
    }

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    try {
      ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    } catch (drawError) {
      return null;
    }

    const smallImageData = getImageData(video);
    if (smallImageData) {
      try {
        const currentHash = calculateImageHash(smallImageData);

        if (lastImageHash && currentHash) {
          const difference = calculateSimilarity(currentHash, lastImageHash);

          if (difference < similarityThreshold) {
            return null;
          }
        }

        if (currentHash) {
          setLastImageHash(currentHash);
        }
      } catch (hashError) {
        console.warn("Hash check failed, proceeding with capture");
      }
    }

    resetHashAfterTimeout();

    return new Promise((resolve) => {
      try {
        canvas.toBlob(
          (blob) => {
            if (!blob) {
              resolve(null);
              return;
            }

            try {
              const file = new File(
                [blob],
                `camera-capture-${Date.now()}.jpg`,
                {
                  type: "image/jpeg",
                  lastModified: Date.now(),
                }
              );

              resolve(file);
            } catch (fileError) {
              resolve(null);
            }
          },
          "image/jpeg",
          0.95
        );
      } catch (blobError) {
        resolve(null);
      }
    });
  }, [
    videoRef,
    cameraStream,
    getImageData,
    calculateImageHash,
    calculateSimilarity,
    lastImageHash,
    similarityThreshold,
    setLastImageHash,
    resetHashAfterTimeout,
  ]);

  const handleAutoCapture = useCallback(async () => {
    const now = Date.now();
    if (now - lastCaptureTime < autoCaptureInterval) {
      return;
    }

    if (!isCameraActive || capturedImage || uploadedImage) {
      return;
    }

    const imageFile = await captureImage();
    if (imageFile) {
      setLastCaptureTime(now);
      uploadToServer(imageFile, chatId, userId);
    }
  }, [
    lastCaptureTime,
    autoCaptureInterval,
    isCameraActive,
    capturedImage,
    uploadedImage,
    captureImage,
    setLastCaptureTime,
    chatId,
    userId,
  ]);

  useEffect(() => {
    if (!isAutoCapturing || !isConnected || isSpeaking) {
      if (autoCaptureTimerRef.current) {
        clearInterval(autoCaptureTimerRef.current);
        autoCaptureTimerRef.current = null;
      }
      return;
    }

    autoCaptureTimerRef.current = setInterval(
      handleAutoCapture,
      autoCaptureInterval
    );

    return () => {
      if (autoCaptureTimerRef.current) {
        clearInterval(autoCaptureTimerRef.current);
        autoCaptureTimerRef.current = null;
      }
    };
  }, [
    isAutoCapturing,
    isConnected,
    isSpeaking,
    handleAutoCapture,
    autoCaptureInterval,
  ]);

  useEffect(() => {
    return () => {
      if (hashResetTimeoutRef.current) {
        clearTimeout(hashResetTimeoutRef.current);
      }
      if (autoCaptureTimerRef.current) {
        clearInterval(autoCaptureTimerRef.current);
      }
    };
  }, []);

  if (capturedImage && uploadedImage) {
    const mainImage = showCapturedInMain ? capturedImage : uploadedImage;
    const overlayImage = showCapturedInMain ? uploadedImage : capturedImage;
    const isMainFromCamera = showCapturedInMain;

    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <ImageView 
          imageSrc={mainImage} 
          highlightedCoordinates={highlightedCoordinates}
          imageRef={imageRef}
          containerRef={containerRef}
          isFromCamera={isMainFromCamera}
        />
        <div
          className="camera-overlay"
          onClick={swapImageAndCamera}
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            width: "120px",
            height: "90px",
            borderRadius: "12px",
            overflow: "hidden",
            border: "2px solid rgba(163, 177, 198, 0.3)",
            cursor: "pointer",
            zIndex: 10,
            transition: "all 0.3s ease",
          }}
        >
          <img
            src={overlayImage}
            alt="Overlay"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    );
  }

  if (capturedImage) return <ImageView 
    imageSrc={capturedImage} 
    highlightedCoordinates={highlightedCoordinates}
    imageRef={imageRef}
    containerRef={containerRef}
    isFromCamera={true}
  />;

  if (uploadedImage && showUploadInMain)
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <ImageView 
          imageSrc={uploadedImage} 
          highlightedCoordinates={highlightedCoordinates}
          imageRef={imageRef}
          containerRef={containerRef}
          isFromCamera={false}
        />
        <CameraOverlay />
      </div>
    );

  if (uploadedImage && !showUploadInMain && isCameraActive)
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <ActiveVideoWrapper videoRef={videoRef} />
        <div
          className="camera-overlay"
          onClick={swapImageAndCamera}
          style={{
            position: "absolute",
            bottom: "16px",
            right: "16px",
            width: "120px",
            height: "90px",
            borderRadius: "12px",
            overflow: "hidden",
            border: "2px solid rgba(163, 177, 198, 0.3)",
            cursor: "pointer",
            zIndex: 10,
            transition: "all 0.3s ease",
          }}
        >
          <img
            src={uploadedImage}
            alt="Uploaded"
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    );

  if (permissionState === PERMISSION_STATES.REQUESTING)
    return <RequestingView />;

  if (permissionState === PERMISSION_STATES.DENIED && permissionError)
    return (
      <DeniedView permissionError={permissionError} onRetry={retryPermission} />
    );

  if (!isCameraActive) return <IdleView />;

  return <ActiveVideoWrapper videoRef={videoRef} />;
};

export default MediaViewer;
