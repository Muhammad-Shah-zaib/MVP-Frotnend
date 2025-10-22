"use client";

import { Image } from "lucide-react";
import { useChatStore } from "@/store";
import "./styles.css";

const UploadButton = () => {
  const isCameraActive = useChatStore((state) => state.isCameraActive);

  if (!isCameraActive) return null;

  return (
    <button
      className="neumorphic-button btn-round upload-button"
      style={{ 
        width: '55px', 
        height: '55px', 
        flexShrink: 0,
      }}
      onClick={() => {}}
    >
      <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <Image style={{ width: '28px', height: '28px', color: '#a3b1c6' }} />
      </div>
    </button>
  );
};

export default UploadButton;
