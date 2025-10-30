"use client";

import {
  Play,
  AudioLines,
} from "lucide-react";
import { PERMISSION_STATES } from "@/constants/chat";
import { useChatStore } from "@/store";
import { useVoiceConversation } from "@/hooks/useVoiceConversation";
import { useElevenLabsStore } from "@/store/elevenlabs/elevenLabsStore";
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
  const clearImages = useChatStore((state) => state.clearImages);

  const { startConversation, endConversation, isConnecting } = useVoiceConversation();
  const isConnected = useElevenLabsStore((state) => state.isConnected);

  const isLoading = permissionState === PERMISSION_STATES.REQUESTING;
  const isAudioLoading = audioPermissionState === PERMISSION_STATES.REQUESTING;
  const showGlow = !isCameraActive && !isConnected;
  const isActive = (isCameraActive && isAudioActive) || isConnected;

  const handleClick = async () => {
    if (!isCameraActive && !isConnected) {
      clearImages();
      toggleCamera();
      setTimeout(() => {
        if (!isAudioActive) {
          toggleAudio();
        }
      }, 200);
      
      await startConversation();
    } else {
      await endConversation();
      
      toggleAudio();
      setTimeout(() => {
        toggleCamera();
      }, 100);
    }
  };

  return (
    <div style={{ position: 'relative', width: '150px', height: '150px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {isActive && (
        <AudioWaveform isActive={isAudioActive || isConnected} size={135} />
      )}

      <button
        onClick={handleClick}
        disabled={isLoading || isAudioLoading || isConnecting}
        className={`start-button ${showGlow ? "should-click" : ""} ${isCameraActive || isConnected ? "active" : ""}`}
        style={{ 
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          position: 'absolute',
          opacity: isLoading || isAudioLoading || isConnecting ? 0.5 : 1,
          cursor: isLoading || isAudioLoading || isConnecting ? 'not-allowed' : 'pointer',
          ...((isCameraActive || isConnected) && {
            boxShadow: 'inset 0.25rem 0.25rem 0.5rem rgba(163, 177, 198, 0.5), inset -0.25rem -0.25rem 0.5rem rgba(255, 255, 255, 0.8)'
          })
        }}
      >
        <div style={{ width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {isLoading || isAudioLoading || isConnecting ? (
            <div 
              style={{ 
                width: '20px', 
                height: '20px', 
                borderRadius: '50%', 
                border: '2px solid #a3b1c6', 
                borderTop: '2px solid transparent', 
                animation: 'spin 1s linear infinite' 
              }}
            />
          ) : isCameraActive || isConnected ? (
            <AudioLines style={{ width: '38px', height: '38px', color: '#a3b1c6' }} />
          ) : (
            <Play style={{ width: '38px', height: '38px', color: '#a3b1c6' }} />
          )}
        </div>
      </button>
    </div>
  );
};

export default PlayButton;
