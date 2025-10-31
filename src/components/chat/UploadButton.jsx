"use client";

import { Image } from "lucide-react";
import { useRef } from "react";
import { useChatStore } from "@/store";
import { uploadToServer } from "@/actions/elevenlabs";
import { useElevenLabsStore } from "@/store/elevenlabs/elevenLabsStore";
import "./styles.css";

const UploadButton = ({ userId }) => {
  const isCameraActive = useChatStore((state) => state.isCameraActive);
  const capturedImage = useChatStore((state) => state.capturedImage);
  const uploadedImage = useChatStore((state) => state.uploadedImage);
  const uploadImage = useChatStore((state) => state.uploadImage);
  const { conversationId } = useElevenLabsStore();
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (isCameraActive) {
        uploadImage(file);
        // also send to backend (silent)
        await uploadToServer(file, conversationId, userId);
      }
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const shouldShow = isCameraActive || capturedImage || uploadedImage;
  if (!shouldShow) return null;

  return (
    <>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      <button
        className="neumorphic-button btn-round upload-button"
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
          <Image style={{ width: "28px", height: "28px", color: "#a3b1c6" }} />
        </div>
      </button>
    </>
  );
};

export default UploadButton;
