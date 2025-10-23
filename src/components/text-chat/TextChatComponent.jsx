import React from "react";
import MediaContainer from "./MediaContainer";
import ChatContainer from "./ChatContainer";

const TextChatComponent = () => {
  return (
    <div className="flex flex-col gap-4 px-4 h-[85vh] ">
      <div className="h-[25%]">
        <MediaContainer />
      </div>
      <div className="h-[75%] overflow-auto">
        <ChatContainer />
      </div>
    </div>
  );
};

export default TextChatComponent;
