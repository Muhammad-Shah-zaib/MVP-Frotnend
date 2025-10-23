"use client";
import { Camera, Image, Mic, Send } from "lucide-react";
import { useState } from "react";

const SendQuery = () => {
  const [hasInputText, setHasInputText] = useState(false);

  const handleChange = (e) => {
    if (e.target.value.length > 0) {
      setHasInputText(true);
    } else {
      setHasInputText(false);
    }
  };

  return (
    <div className="w-[90%] mx-auto py-2 flex items-center">
      {/* INPUT FIELD */}

      {hasInputText && (
        <div>
          <Image className="pr-2 w-8 h-8 text-gray-600" />
        </div>
      )}
      <div
        id="input-ctn"
        className="grid backdrop-blur-sm transition duration-300 grid-cols-10 border border-gray-600 rounded-full px-4 py-2 w-full"
      >
        <input
          type="text"
          onChange={handleChange}
          className={`col-span-8 outline-none border-none focus:outline-none`}
          placeholder="Type here"
        />
        <div>
          <Mic className="ml-auto text-gray-600" />
        </div>

        {!hasInputText && (
          <div>
            <Camera className="ml-auto  text-gray-600" />
          </div>
        )}
        {hasInputText && (
          <div>
            <Send className="ml-auto  text-gray-900" />
          </div>
        )}
      </div>
      {/* Camera and mic button fixed at the end of the input field */}
    </div>
  );
};

export default SendQuery;
