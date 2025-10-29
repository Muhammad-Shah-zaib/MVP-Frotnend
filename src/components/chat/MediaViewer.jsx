"use client";

import { useEffect, useRef } from "react";
import { useChatStore } from "@/store";
import {
  RequestingView,
  DeniedView,
  IdleView,
  ActiveVideoWrapper,
  ImageView,
} from "./MediaViewerParts";
import CameraOverlay from "./CameraOverlay";
import { PERMISSION_STATES } from "@/constants/chat";

const MediaViewer = () => {
  const videoRef = useRef(null);

  const cameraStream = useChatStore((s) => s.cameraStream);
  const isCameraActive = useChatStore((s) => s.isCameraActive);
  const permissionState = useChatStore((s) => s.permissionState);
  const permissionError = useChatStore((s) => s.permissionError);
  const capturedImage = useChatStore((s) => s.capturedImage);
  const uploadedImage = useChatStore((s) => s.uploadedImage);
  const showUploadInMain = useChatStore((s) => s.showUploadInMain);
  const showCapturedInMain = useChatStore((s) => s.showCapturedInMain);
  const retryPermission = useChatStore((s) => s.retryPermission);
  const swapImageAndCamera = useChatStore((s) => s.swapImageAndCamera);

  useEffect(() => {
    if (videoRef.current && cameraStream) {
      videoRef.current.srcObject = cameraStream;
    }
  }, [cameraStream, videoRef, capturedImage, showUploadInMain]);

  if (capturedImage && uploadedImage) {
    const mainImage = showCapturedInMain ? capturedImage : uploadedImage;
    const overlayImage = showCapturedInMain ? uploadedImage : capturedImage;

    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <ImageView imageSrc={mainImage} />
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

  if (capturedImage) return <ImageView imageSrc={capturedImage} />;

  if (uploadedImage && showUploadInMain)
    return (
      <div style={{ position: "relative", width: "100%", height: "100%" }}>
        <ImageView imageSrc={uploadedImage} />
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
