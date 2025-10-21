"use client";
import { Camera } from "lucide-react";
import { useChatStore } from "@/store";
import { generateSideButtonClass } from "@/utils/chatHelpers";

const CameraButton = () => {
  const isCameraActive = useChatStore((state) => state.isCameraActive);

  return (
    <div className={generateSideButtonClass(isCameraActive)}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Camera className="w-8 h-8 text-primary" />
      </div>
    </div>
  );
};

export default CameraButton;
