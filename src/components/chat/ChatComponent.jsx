import MediaViewer from "./MediaViewer";
import CameraActions from "./CameraActions";
import ImageBillboard from "../ImageBillboard";

const ChatComponent = () => {
  return (
    <div className="w-full h-full relative">
      <ImageBillboard />
      <div className="flex flex-col w-full h-[78%] p-4 pt-0 pb-8">
        <MediaViewer />
      </div>
      <div className="h-[17%] w-full px-4">
        <CameraActions />
      </div>
    </div>
  );
};

export default ChatComponent;
