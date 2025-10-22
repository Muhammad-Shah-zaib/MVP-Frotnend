"use client";

import MediaViewer from "./MediaViewer";
import CameraActions from "./CameraActions";

const ChatComponent = () => {
  return (
    <div className="w-full h-full">
      <div className="flex flex-col w-full h-[78%] p-4 pt-0 pb-8">
        <MediaViewer />
      </div>
      <div className="h-[19%] w-full px-4">
        <CameraActions />
      </div>
    </div>
  );
};

export default ChatComponent;
