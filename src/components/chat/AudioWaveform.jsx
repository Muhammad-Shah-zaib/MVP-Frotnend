import React, { useRef, useEffect, useCallback } from "react";

const AudioWaveform = ({ isActive = false, size = 120 }) => {
  const canvasRef = useRef(null);
  const requestRef = useRef(null);
  const audioCtxRef = useRef(null);
  const analyserRef = useRef(null);
  const dataArrayRef = useRef(null);
  const sourceRef = useRef(null);
  const streamRef = useRef(null);
  const recognitionRef = useRef(null);
  const audioLevelRef = useRef(0);

  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  const shadowPadding = Math.floor(size * 0.9);
  
  const canvasConfig = {
    displaySize: size + shadowPadding * 1,
    actualSize: (size + shadowPadding * 2) * dpr,
    baseRadius: Math.floor(size * 0.747) * dpr,
    ringWidth: Math.floor(size * 0.165) * dpr,
    shadowPadding: shadowPadding * dpr,
  };

  const startAudioProcessing = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { 
          echoCancellation: true,
          noiseSuppression: true,
          autoGainControl: true 
        } 
      });
      
      const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
      const analyser = audioCtx.createAnalyser();
      
      analyser.fftSize = 1024;
      analyser.smoothingTimeConstant = 0.85;
      
      const dataArray = new Uint8Array(analyser.fftSize);
      const source = audioCtx.createMediaStreamSource(stream);
      
      source.connect(analyser);
      
      audioCtxRef.current = audioCtx;
      analyserRef.current = analyser;
      dataArrayRef.current = dataArray;
      sourceRef.current = source;
      streamRef.current = stream;

      if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const recognition = new SpeechRecognition();
        
        recognition.continuous = true;
        recognition.interimResults = true;
        recognition.lang = 'en-US';
        
        recognition.onresult = (event) => {
          let transcript = '';
          for (let i = event.resultIndex; i < event.results.length; i++) {
            const result = event.results[i];
            if (result.isFinal) {
              transcript += result[0].transcript;
              console.log("User said:", transcript.trim());
            }
          }
        };
        
        recognition.onerror = (event) => {
          console.log("Speech recognition error:", event.error);
        };
        
        recognition.start();
        recognitionRef.current = recognition;
      }

    } catch (err) {
      console.error("Error accessing microphone:", err);
    }
  }, []);

  const stopAudioProcessing = useCallback(() => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
    }

    if (requestRef.current) {
      cancelAnimationFrame(requestRef.current);
      requestRef.current = null;
    }

    if (audioCtxRef.current) {
      audioCtxRef.current.close().catch(e => console.error(e));
      audioCtxRef.current = null;
    }

    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }

    analyserRef.current = null;
    dataArrayRef.current = null;
    sourceRef.current = null;
    audioLevelRef.current = 0;
  }, []);

  useEffect(() => {
    const setupCanvas = () => {
      if (!canvasRef.current) return;

      const canvas = canvasRef.current;
      canvas.width = canvas.height = canvasConfig.actualSize;
      canvas.style.width = `${canvasConfig.displaySize}px`;
      canvas.style.height = `${canvasConfig.displaySize}px`;

      const ctx = canvas.getContext("2d", { alpha: true });
      ctx.clearRect(0, 0, canvasConfig.actualSize, canvasConfig.actualSize);
    };

    setupCanvas();

    const handleResize = () => {
      if (canvasRef.current) {
        setupCanvas();
      }
    };

    window.addEventListener("resize", handleResize);
    
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [canvasConfig.actualSize, canvasConfig.displaySize]);

  useEffect(() => {
    if (isActive) {
      startAudioProcessing();
    } else {
      stopAudioProcessing();
    }
    
    if (!requestRef.current) {
      draw();
    }

    return () => {
      stopAudioProcessing();
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
        requestRef.current = null;
      }
    };
  }, [isActive, startAudioProcessing, stopAudioProcessing]);

  const draw = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d", { alpha: true });

    requestRef.current = requestAnimationFrame(draw);

    let micAmplitude = 0;
    if (analyserRef.current && dataArrayRef.current) {
      analyserRef.current.getByteTimeDomainData(dataArrayRef.current);
      const avgMicAmplitude = dataArrayRef.current.reduce((sum, val) => sum + Math.abs(val - 128), 0) / dataArrayRef.current.length;
      micAmplitude = Math.min(1, Math.max(0, avgMicAmplitude / 50));
      
      if (micAmplitude > 0.05) {
        audioLevelRef.current = micAmplitude;
      } else {
        audioLevelRef.current *= 0.95;
      }
    }

    const activeAmplitude = audioLevelRef.current;
    const scale = 1 + activeAmplitude * 0.25;
    const shadowAlpha = 0.7 + activeAmplitude * 0.3;
    const glowAlpha = 0.9 + activeAmplitude * 0.125;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    drawRingWithShadows(ctx, cx, cy, scale, shadowAlpha, glowAlpha, activeAmplitude);
  };

  const drawRingWithShadows = (ctx, cx, cy, scale, shadowAlpha, glowAlpha, activeAmplitude) => {
    const baseOffset = Math.floor(size * 0.05) * dpr;
    
    ctx.save();
    ctx.shadowColor = `rgba(143, 157, 178, ${Math.min(1, shadowAlpha)})`;
    ctx.shadowBlur = Math.floor((12 + activeAmplitude * 6) * dpr);
    ctx.shadowOffsetX = Math.floor(4 * dpr);
    ctx.shadowOffsetY = Math.floor(4 * dpr);

    drawRing(ctx, cx, cy, scale);
    ctx.restore();

    ctx.save();
    ctx.shadowColor = `rgba(255, 255, 255, ${Math.min(1, glowAlpha)})`;
    ctx.shadowBlur = Math.floor((14 + activeAmplitude * 5) * dpr);
    ctx.shadowOffsetX = -Math.floor((baseOffset + activeAmplitude * 2 * dpr));
    ctx.shadowOffsetY = -Math.floor((baseOffset + activeAmplitude * 2 * dpr));

    drawRing(ctx, cx, cy, scale);
    ctx.restore();
  };

  const drawRing = (ctx, cx, cy, scale) => {
    ctx.beginPath();
    ctx.arc(
      Math.round(cx),
      Math.round(cy),
      Math.round(canvasConfig.baseRadius * scale),
      0,
      Math.PI * 2,
      false
    );
    ctx.arc(
      Math.round(cx),
      Math.round(cy),
      Math.round((canvasConfig.baseRadius - canvasConfig.ringWidth) * scale),
      0,
      Math.PI * 2,
      true
    );
    ctx.closePath();
    ctx.fillStyle = "#E0E5EC";
    ctx.fill();
  };

  return (
    <div
      className="audio-waveform"
      style={{
        width: canvasConfig.displaySize,
        height: canvasConfig.displaySize,
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        overflow: "visible",
      }}
    >
      <canvas
        ref={canvasRef}
        width={canvasConfig.actualSize}
        height={canvasConfig.actualSize}
        style={{
          display: "block",
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />
    </div>
  );
};

export default AudioWaveform;