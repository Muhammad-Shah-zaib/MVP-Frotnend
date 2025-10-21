"use client";

import {
  Play,
  Loader2,
  AudioWaveform as AudioWaveformIcon,
  AudioLines,
} from "lucide-react";
import { PERMISSION_STATES } from "@/constants/chat";
import { useChatStore } from "@/store";
import AudioWaveform from "./AudioWaveform";
import "./styles.css";

const PlayButton = () => {
  const toggleCamera = useChatStore((state) => state.toggleCamera);
  const isCameraActive = useChatStore((state) => state.isCameraActive);
  const permissionState = useChatStore((state) => state.permissionState);
  const toggleAudio = useChatStore((state) => state.toggleAudio);
  const isAudioActive = useChatStore((state) => state.isAudioActive);
  const audioPermissionState = useChatStore(
    (state) => state.audioPermissionState
  );

  const isLoading = permissionState === PERMISSION_STATES.REQUESTING;
  const isAudioLoading = audioPermissionState === PERMISSION_STATES.REQUESTING;

  const handleClick = () => {
    if (!isCameraActive) {
      toggleCamera();
      setTimeout(() => {
        if (!isAudioActive) {
          toggleAudio();
        }
      }, 200);
    } else {
      toggleAudio();
      setTimeout(() => {
        toggleCamera();
      }, 100);
    }
  };

  return (
    <div className="relative w-[140px] h-[140px]">
      {isCameraActive && isAudioActive && (
        <AudioWaveform isActive={isAudioActive} size={120} />
      )}

      <button
        onClick={handleClick}
        disabled={isLoading || isAudioLoading}
        className={`play-button-wrapper hover:scale-[0.97] rounded-full flex justify-center items-center border border-gray-400 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${
          isCameraActive ? " w-16 h-16 " : " w-18 h-18 "
        } transition-all cursor-pointer ${
          isLoading || isAudioLoading ? "opacity-50 cursor-not-allowed" : ""
        } ${
          !isCameraActive && !isLoading && !isAudioLoading ? "should-click" : ""
        } ${isCameraActive && isAudioActive ? "active-glow" : ""}`}
      >
       
          {isLoading || isAudioLoading ? (
            <Loader2
              className={`w-8 h-8 text-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 animate-spin`}
            />
          ) : isCameraActive ? (
            <AudioLines className="w-8 h-8 text-primary absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          ) : (
            <Play className="w-8 h-8 text-gray-500 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          )}
      </button>
    </div>
  );
};

export default PlayButton;
