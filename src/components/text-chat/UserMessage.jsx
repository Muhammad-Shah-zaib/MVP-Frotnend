import React from 'react';

const UserMessage = ({ content }) => {
  return (
    <div className="flex justify-end mb-4">
      <div className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg shadow-sm max-w-[75%] break-words">
        {content}
      </div>
    </div>
  );
};

export default UserMessage;