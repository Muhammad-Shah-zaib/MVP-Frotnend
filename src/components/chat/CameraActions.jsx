import CameraButton from "./CameraButton";
import PlayButton from "./PlayButton";
import UploadButton from "./UploadButton";
import { getClient } from "@/lib/Supabase/server";

const CameraActions = async () => {
  const supabase = await getClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return (
    <div className="w-full h-full flex gap-6 items-center justify-center">
      <UploadButton userId={user.id} />
      <PlayButton />
      <CameraButton />
    </div>
  );
};

export default CameraActions;
