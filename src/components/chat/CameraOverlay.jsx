"use client";

import { useEffect, useRef } from "react";
import { useChatStore } from "@/store";
import "./styles.css";

const CameraOverlay = () => {
  const videoRef = useRef(null);
  
  const cameraStream = useChatStore((s) => s.cameraStream);
  const isCameraActive = useChatStore((s) => s.isCameraActive);
  const uploadedImage = useChatStore((s) => s.uploadedImage);
  const showUploadInMain = useChatStore((s) => s.showUploadInMain);
  const swapImageAndCamera = useChatStore((s) => s.swapImageAndCamera);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = isCameraActive && cameraStream ? cameraStream : null;
    }

    return () => {
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [cameraStream, isCameraActive]);

  if (!uploadedImage || !isCameraActive || !showUploadInMain) return null;

  return (
    <div 
      className="camera-overlay"
      onClick={swapImageAndCamera}
    >
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
        }}
      />
    </div>
  );
};

export default CameraOverlay;