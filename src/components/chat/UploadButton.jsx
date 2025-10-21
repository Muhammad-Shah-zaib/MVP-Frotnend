"use client";

import { Image } from "lucide-react";
import { useChatStore } from "@/store";
import { generateSideButtonClass } from "@/utils/chatHelpers";

const UploadButton = () => {
  const isCameraActive = useChatStore((state) => state.isCameraActive);

  return (
    <div className={generateSideButtonClass(isCameraActive)}>
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Image className="w-8 h-8 text-primary" />
      </div>
    </div>
  );
};

export default UploadButton;
