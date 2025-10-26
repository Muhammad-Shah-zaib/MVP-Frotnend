"use client";

import { useElevenLabsStore } from "@/store/elevenlabs/elevenLabsStore";
import { Wifi, WifiOff } from "lucide-react";

const VoiceConnectionStatus = () => {
  const isConnected = useElevenLabsStore((state) => state.isConnected);
  const isConnecting = useElevenLabsStore((state) => state.isConnecting);
  const error = useElevenLabsStore((state) => state.error);

  if (!isConnecting && !isConnected && !error) return null;

  return (
    <div className="fixed top-4 right-4 z-50">
      {isConnecting && (
        <div className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" />
          <span className="text-sm font-medium">Connecting to voice...</span>
        </div>
      )}
      
      {isConnected && (
        <div className="bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2">
          <Wifi className="w-4 h-4" />
          <span className="text-sm font-medium">Voice connected</span>
        </div>
      )}
      
      {error && (
        <div className="bg-red-500 text-white px-4 py-2 rounded-lg shadow-lg flex items-center gap-2 max-w-sm">
          <WifiOff className="w-4 h-4 flex-shrink-0" />
          <span className="text-sm font-medium">{error}</span>
        </div>
      )}
    </div>
  );
};

export default VoiceConnectionStatus;
