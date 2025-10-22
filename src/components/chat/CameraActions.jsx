import CameraButton from "./CameraButton";
import PlayButton from "./PlayButton";
import UploadButton from "./UploadButton";

const CameraActions = () => {
  return (
    <div className="w-full h-full flex gap-6 items-center justify-center">
      <UploadButton />
      <PlayButton />
      <CameraButton />
    </div>
  );
};

export default CameraActions;
