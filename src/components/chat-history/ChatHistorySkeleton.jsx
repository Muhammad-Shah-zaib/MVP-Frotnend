import React from "react";

const SkeletonCard = () => {
  return (
    <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-200 animate-pulse">
      <div className="absolute top-2 right-2 w-7 h-7 bg-gray-300 rounded-full" />
    </div>
  );
};

const ChatHistorySkeleton = () => {
  return (
    <div className="grid grid-cols-2 gap-4 pb-4">
      {[...Array(6)].map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};

export default ChatHistorySkeleton;
