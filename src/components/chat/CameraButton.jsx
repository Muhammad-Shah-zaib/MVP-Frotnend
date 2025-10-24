"use client";

import { useChatStore } from "@/store";
import Camera from "@/shared/icons/Camera";
import "./styles.css";

const CameraButton = () => {
  const isCameraActive = useChatStore((state) => state.isCameraActive);

  if (!isCameraActive) return null;

  return (
    <button
      className="neumorphic-button btn-round camera-button"
      style={{
        width: "55px",
        height: "55px",
        flexShrink: 0,
      }}
      onClick={() => {}}
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
        <Camera style={{ width: "28px", height: "28px", color: "#a3b1c6" }} />
      </div>
    </button>
  );
};

export default CameraButton;
