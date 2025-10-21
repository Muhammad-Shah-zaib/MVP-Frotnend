"use client";

import { useEffect, useRef } from "react";
import { useChatStore } from "@/store";
import { RequestingView, DeniedView, IdleView, ActiveVideoWrapper } from "./MediaViewerParts";
import { PERMISSION_STATES } from "@/constants/chat";

const MediaViewer = () => {
  const videoRef = useRef(null);

  const cameraStream = useChatStore((s) => s.cameraStream);
  const isCameraActive = useChatStore((s) => s.isCameraActive);
  const permissionState = useChatStore((s) => s.permissionState);
  const permissionError = useChatStore((s) => s.permissionError);
  const retryPermission = useChatStore((s) => s.retryPermission);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = isCameraActive && cameraStream ? cameraStream : null;
    }

    return () => {
      if (videoRef.current) videoRef.current.srcObject = null;
    };
  }, [cameraStream, isCameraActive]);

  if (permissionState === PERMISSION_STATES.REQUESTING) return <RequestingView />;
  if (permissionState === PERMISSION_STATES.DENIED && permissionError) return <DeniedView permissionError={permissionError} onRetry={retryPermission} />;
  if (!isCameraActive) return <IdleView />;

  return <ActiveVideoWrapper videoRef={videoRef} />;
};

export default MediaViewer;