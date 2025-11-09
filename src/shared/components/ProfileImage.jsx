"use client";

import React from "react";
import { User2 } from "lucide-react";

const ProfileImage = ({ profile_image, full_name, email }) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="flex justify-center flex-col gap-4 pt-8 pb-6 px-6">
      <div className="w-24 h-24 rounded-full bg-white shadow-md flex items-center justify-center flex-shrink-0 overflow-hidden">
        {profile_image && !imageError ? (
          <img
            src={profile_image}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <User2 className="w-12 h-12 text-gray-600" />
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="text-3xl text-gray-800">{full_name || email || "User"}</h3>
      </div>
    </div>
  );
};

export default ProfileImage;
