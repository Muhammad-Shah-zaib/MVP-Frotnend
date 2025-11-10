"use client";

import { useEffect } from 'react';

const CoordinateHighlighter = ({ points = [], imageRef = null, containerRef = null, isObjectCover = false }) => {
  useEffect(() => {
    if (points && points.length > 0) {
      console.log('🎯 CoordinateHighlighter: Rendering points:', points);
      console.log('🎯 Image ref available:', !!imageRef?.current);
      console.log('🎯 Container ref available:', !!containerRef?.current);
      console.log('🎯 Object fit mode:', isObjectCover ? 'cover' : 'contain');
    }
  }, [points, imageRef, containerRef, isObjectCover]);

  if (!points || points.length === 0) {
    return null;
  }

  if (!imageRef?.current || !containerRef?.current) {
    return null;
  }

  const image = imageRef.current;
  const container = containerRef.current;

  const naturalWidth = image.naturalWidth;
  const naturalHeight = image.naturalHeight;
  const displayedWidth = image.offsetWidth;
  const displayedHeight = image.offsetHeight;

  console.log('🎯 Image dimensions - Natural:', naturalWidth, 'x', naturalHeight, 'Displayed:', displayedWidth, 'x', displayedHeight);

  let effectiveDisplayWidth = displayedWidth;
  let effectiveDisplayHeight = displayedHeight;
  let cropOffsetX = 0;
  let cropOffsetY = 0;

  if (isObjectCover) {
    // For object-cover, the image fills the container by cropping
    // The displayed dimensions are the container dimensions
    // No letterbox/pillarbox offsets needed
    effectiveDisplayWidth = displayedWidth;
    effectiveDisplayHeight = displayedHeight;
  } else {
    // For object-contain, calculate letterbox/pillarbox offsets
    const naturalAspectRatio = naturalWidth / naturalHeight;
    const displayAspectRatio = displayedWidth / displayedHeight;

    if (naturalAspectRatio > displayAspectRatio) {
      const scaleFactor = displayedWidth / naturalWidth;
      effectiveDisplayHeight = naturalHeight * scaleFactor;
      cropOffsetY = (displayedHeight - effectiveDisplayHeight) / 2;
    } else {
      const scaleFactor = displayedHeight / naturalHeight;
      effectiveDisplayWidth = naturalWidth * scaleFactor;
      cropOffsetX = (displayedWidth - effectiveDisplayWidth) / 2;
    }
  }

  const scaleX = effectiveDisplayWidth / naturalWidth;
  const scaleY = effectiveDisplayHeight / naturalHeight;

  const imageRect = image.getBoundingClientRect();
  const containerRect = container.getBoundingClientRect();
  const imageOffsetX = imageRect.left - containerRect.left;
  const imageOffsetY = imageRect.top - containerRect.top;

  return (
    <div className="absolute top-0 left-0 w-full h-full pointer-events-none z-[1000] overflow-visible">
      {points.map((point, index) => {
        if (!Array.isArray(point) || point.length !== 2 || typeof point[0] !== 'number' || typeof point[1] !== 'number') {
          console.warn('🎯 Invalid point data:', point);
          return null;
        }

        const [x, y] = point;
        const displayX = x * effectiveDisplayWidth + cropOffsetX;
        const displayY = y * effectiveDisplayHeight + cropOffsetY;

        console.log(`🎯 Point ${index}: Normalized (${x}, ${y}) -> Display (${displayX + imageOffsetX}, ${displayY + imageOffsetY})`);

        return (
          <div
            key={`point-${index}`}
            className="absolute pointer-events-none -translate-x-1/2 -translate-y-1/2 animate-[pointAppear_0.8s_cubic-bezier(0.25,0.8,0.25,1)]"
            style={{
              left: `${displayX + imageOffsetX}px`,
              top: `${displayY + imageOffsetY}px`,
            }}
          >
            <div 
              className="w-[34px] h-[34px] bg-transparent border-[2.1px] border-white/95 rounded-full absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2] will-change-transform"
              style={{
                boxShadow: '0 0 8px rgba(255, 255, 255, 0.6), 0 0 16px rgba(255, 255, 255, 0.3), 0 0 24px rgba(255, 255, 255, 0.15), inset 0 0 2px rgba(255, 255, 255, 0.3)',
                WebkitFontSmoothing: 'antialiased',
                MozOsxFontSmoothing: 'grayscale',
                backfaceVisibility: 'hidden'
              }}
            />
          </div>
        );
      })}
    </div>
  );
};

export default CoordinateHighlighter;
