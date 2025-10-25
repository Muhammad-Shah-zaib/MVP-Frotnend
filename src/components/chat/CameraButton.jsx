"use client";

import { useChatStore } from "@/store";
import Camera from "@/shared/icons/Camera";
import "./styles.css";

const CameraButton = () => {
  const isCameraActive = useChatStore((state) => state.isCameraActive);
  const capturedImage = useChatStore((state) => state.capturedImage);
  const uploadedImage = useChatStore((state) => state.uploadedImage);
  const captureFrame = useChatStore((state) => state.captureFrame);

  const handleClick = () => {
    if (capturedImage) {
      captureFrame(null);
    } else if (isCameraActive) {
      const videoElements = document.querySelectorAll('video');
      let targetVideo = Array.from(videoElements).find(video => 
        !video.closest('.camera-overlay')
      );
      
      if (!targetVideo) {
        targetVideo = Array.from(videoElements).find(video => 
          video.closest('.camera-overlay')
        );
      }
      
      if (targetVideo) {
        captureFrame(targetVideo);
      }
    }
  };

  const shouldShow = isCameraActive || capturedImage || uploadedImage;
  const isImageCaptured = !!capturedImage;
  
  if (!shouldShow) return null;

  return (
    <button
      className="neumorphic-button btn-round camera-button"
      style={{
        width: "55px",
        height: "55px",
        flexShrink: 0,
      }}
      onClick={handleClick}
    >
      <div
        style={{
          width: "36px",
          height: "36px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Camera 
          style={{ 
            width: "28px", 
            height: "28px", 
            color: isImageCaptured ? "#3b82f6" : "#a3b1c6",
            transition: "color 0.3s ease"
          }} 
        />
      </div>
    </button>
  );
};

export default CameraButton;
