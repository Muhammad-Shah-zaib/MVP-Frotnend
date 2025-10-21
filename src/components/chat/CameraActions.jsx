import CameraButton from "./CameraButton";
import PlayButton from "./PlayButton";
import UploadButton from "./UploadButton";

const CameraActions = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-6">
      <UploadButton />
      <PlayButton />
      <CameraButton />
    </div>
  );
};

export default CameraActions;
