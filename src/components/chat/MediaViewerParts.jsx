import { Camera as CameraIcon, AlertCircle } from "lucide-react";
import CoordinateHighlighter from "../CoordinateHighlighter";

export const RequestingView = () => (
  <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl bg-primary/20">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mb-4" />
    <p className="text-gray-600 text-center">Requesting camera access...</p>
    <p className="text-gray-500 text-sm text-center mt-2">
      Please allow camera permission in your browser
    </p>
  </div>
);

export const DeniedView = ({ permissionError, onRetry }) => (
  <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl bg-primary/20 p-6">
    <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
    <h3 className="text-lg font-medium text-gray-800 mb-2 text-center">
      Camera Access Required
    </h3>
    <p className="text-gray-600 text-center mb-6">{permissionError}</p>
    <button
      onClick={onRetry}
      className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center gap-2"
    >
      <CameraIcon className="w-5 h-5" />
      Try Again
    </button>
  </div>
);

export const IdleView = () => (
  <div className="w-full h-full flex flex-col items-center justify-center rounded-3xl bg-primary/20">
    <CameraIcon className="w-16 h-16 text-gray-400 mb-4" />
    <p className="text-gray-600 font-medium text-lg">Ready to start?</p>
    <p className="text-gray-500 text-sm mt-2">Click the play button below</p>
  </div>
);

export const ActiveVideoWrapper = ({ videoRef }) => {
  return (
    <div className="w-full h-full flex items-center justify-center rounded-3xl bg-primary/20 overflow-hidden">
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-full h-full object-cover rounded-3xl"
      />
    </div>
  );
};

export const ImageView = ({ imageSrc, highlightedCoordinates = [], imageRef, containerRef, isFromCamera = false }) => (
  <div 
    ref={containerRef}
    className="w-full h-full flex items-center justify-center rounded-3xl overflow-hidden relative"
    style={{ 
      backgroundColor: '#dde3ed',
      position: 'relative'
    }}
  >
    <img
      ref={imageRef}
      src={imageSrc}
      alt="Captured or uploaded"
      className={`rounded-3xl ${isFromCamera ? 'w-full h-full object-cover' : 'max-w-full max-h-full object-contain'}`}
      style={isFromCamera ? {
        width: '100%',
        height: '100%',
        objectFit: 'cover'
      } : {
        width: 'auto',
        height: 'auto',
        maxWidth: '100%',
        maxHeight: '100%',
        objectFit: 'contain'
      }}
    />
    {highlightedCoordinates && highlightedCoordinates.length > 0 && (
      <CoordinateHighlighter 
        points={highlightedCoordinates} 
        imageRef={imageRef} 
        containerRef={containerRef}
        isObjectCover={isFromCamera}
      />
    )}
  </div>
);
