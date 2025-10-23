import React from 'react';

const AssistantMessage = ({ content }) => {
  return (
    <div className="flex justify-start mb-4">
      <div className="text-gray-800 px-4 py-3 max-w-[75%] break-words">
        {content}
      </div>
    </div>
  );
};

export default AssistantMessage;