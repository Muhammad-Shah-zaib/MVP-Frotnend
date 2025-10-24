import { getClient } from "@/lib/Supabase/server";
import FullName from "./FullName";

const FullNameWrapper = async () => {
  const supabase = await getClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <FullName initialFullName={user?.user_metadata?.full_name || ""} />;
};

export default FullNameWrapper;
