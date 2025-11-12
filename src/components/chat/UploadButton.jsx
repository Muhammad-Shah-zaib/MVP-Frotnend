"use client";

import { useRef } from "react";
import { useChatStore } from "@/store";
import { uploadToServer } from "@/actions/elevenlabs";
import { useElevenLabsStore } from "@/store/elevenlabs/elevenLabsStore";
import { useUserStore } from "@/store/user/userStore";
import "./styles.css";
import UploadIcon from "@/shared/icons/UploadIcon";

const UploadButton = ({ userId: propUserId }) => {
  const isCameraActive = useChatStore((state) => state.isCameraActive);
  const capturedImage = useChatStore((state) => state.capturedImage);
  const uploadedImage = useChatStore((state) => state.uploadedImage);
  const uploadImage = useChatStore((state) => state.uploadImage);
  const updateSessionCoverImage = useChatStore((state) => state.updateSessionCoverImage);
  const { chatId } = useElevenLabsStore();
  const storeUserId = useUserStore((state) => state.userId);
  const fileInputRef = useRef(null);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      if (isCameraActive) {
        uploadImage(file);
        const result = await uploadToServer(file, chatId, propUserId || storeUserId);
        console.log("[UploadButton] upload result:", result);
        
        if (result?.public_image_url) {
          updateSessionCoverImage(result.public_image_url);
        }
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
          <UploadIcon />
        </div>
      </button>
    </>
  );
};

export default UploadButton;
