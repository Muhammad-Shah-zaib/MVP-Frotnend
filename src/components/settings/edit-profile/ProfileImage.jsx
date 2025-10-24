"use client";

import { useEffect, useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { User, Upload, Loader2 } from "lucide-react";
import { getClient } from "@/lib/Supabase/client";

const ProfileImageButtons = ({
  isEditing,
  selectedFile,
  isUploading,
  onEdit,
  onUpload,
  onSave,
  onCancel,
}) => {
  if (!isEditing) {
    return (
      <Button
        onClick={onEdit}
        variant="outline"
        className="rounded-full w-full"
        disabled={isUploading}
      >
        <Upload className="w-4 h-4 mr-2" />
        Edit Photo
      </Button>
    );
  }

  return (
    <div className="flex gap-2 w-full">
      <Button
        onClick={onUpload}
        variant="outline"
        className="rounded-full transition-all duration-300 ease-in-out flex-1"
        disabled={isUploading}
      >
        <Upload className="w-4 h-4 mr-2" />
        {selectedFile ? "Change Image" : "Upload"}
      </Button>

      <Button
        onClick={onSave}
        disabled={!selectedFile || isUploading}
        className="rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-all duration-300 ease-in-out overflow-hidden"
        style={{
          width: selectedFile ? "auto" : "0px",
          padding: selectedFile ? undefined : "0px",
          opacity: selectedFile ? 1 : 0,
          minWidth: selectedFile ? "80px" : "0px",
        }}
      >
        {isUploading ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Saving...
          </>
        ) : (
          "Save"
        )}
      </Button>

      <Button
        variant="ghost"
        className="text-gray-500 hover:text-red-500"
        onClick={onCancel}
        disabled={isUploading}
      >
        Cancel
      </Button>
    </div>
  );
};

const ProfileImage = () => {
  const supabase = getClient();

  const [user, setUser] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState(null);

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserAndImage = async () => {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error || !user) {
        console.error("Error fetching user:", error);
        return;
      }

      setUser(user);
      const metadataUrl = user.user_metadata?.profile_image || null;
      setImageUrl(metadataUrl);
    };

    fetchUserAndImage();
  }, [supabase]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setUploadError(null);

    const preview = URL.createObjectURL(file);
    setPreviewUrl(preview);
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleSave = async () => {
    if (!selectedFile || !user) return;

    try {
      setIsUploading(true);
      setUploadError(null);

      const fileName = `profile-${user.id}`;
      const bucketName =
        process.env.NEXT_PUBLIC_PROFILE_IMAGE_BUCKET_NAME || "profile-images";

      const { error: uploadError } = await supabase.storage
        .from(bucketName)
        .upload(fileName, selectedFile, { upsert: true });

      if (uploadError) throw uploadError;

      const { data: publicData } = supabase.storage
        .from(bucketName)
        .getPublicUrl(fileName);

      const publicUrl = publicData?.publicUrl;
      if (!publicUrl) throw new Error("Failed to get public URL");

      const { error: updateError } = await supabase.auth.updateUser({
        data: { profile_image: publicUrl },
      });

      if (updateError) throw updateError;

      setImageUrl(`${publicUrl}?t=${Date.now()}`);
      setIsEditing(false);
      setSelectedFile(null);
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    } catch (err) {
      console.error("Upload error:", err);
      setUploadError(err.message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedFile(null);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }
    setUploadError(null);
  };

  return (
    <div className="flex flex-col gap-4 items-center">
      <div className="w-[200px] h-[200px] overflow-hidden flex justify-center items-center rounded-full bg-gray-200 border-2 border-gray-300 relative">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Preview"
            className="w-full h-full object-cover"
          />
        ) : imageUrl ? (
          <img
            src={imageUrl}
            alt="Profile"
            className="w-full h-full object-cover"
          />
        ) : (
          <User className="w-[120px] h-[120px] text-gray-400" />
        )}

        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center rounded-full">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        )}
      </div>

      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />

      <div className="flex flex-col items-center gap-3 w-full max-w-md px-4">
        <ProfileImageButtons
          isEditing={isEditing}
          selectedFile={selectedFile}
          isUploading={isUploading}
          onEdit={() => setIsEditing(true)}
          onUpload={handleUploadClick}
          onSave={handleSave}
          onCancel={handleCancel}
        />

        {uploadError && (
          <p className="text-red-500 text-sm">{uploadError}</p>
        )}
      </div>
    </div>
  );
};

export default ProfileImage;