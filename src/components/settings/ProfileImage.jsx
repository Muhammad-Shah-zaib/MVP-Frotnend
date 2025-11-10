"use client";

import React from "react";
import { User2 } from "lucide-react";

const ProfileImage = ({ profile_image, full_name, email }) => {
  const [imageError, setImageError] = React.useState(false);

  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="flex items-center gap-3">
      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-200">
        {profile_image && !imageError ? (
          <img
            src={profile_image}
            alt="Profile"
            className="w-full h-full object-cover"
            onError={handleImageError}
          />
        ) : (
          <User2 className="w-5 h-5 text-gray-600" />
        )}
      </div>
      <div className="flex flex-col">
        <h3 className="text-sm font-medium text-gray-800">{full_name || "User"}</h3>
        <p className="text-xs text-gray-600">{email}</p>
      </div>
    </div>
  );
};

export default ProfileImage;