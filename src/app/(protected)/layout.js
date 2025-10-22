import ChatHeader from "@/components/chat/header";
import { getClient } from "@/lib/Supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }) {
  const supabase = await getClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (!user || error) {
    redirect("/signin");
  }

  return (
    <div className="flex flex-col bg-gray-100 items-center justify-center w-full min-h-[90vh]">
      <div className="max-w-[400px] w-full">
        <ChatHeader />
      </div>
      <div className="sm:h-[95vh] h-[85vh] w-[400px] sm:overflow-visible overflow-hidden">{children}</div>
    </div>
  );
}
