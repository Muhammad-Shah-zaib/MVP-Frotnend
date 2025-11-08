import { getClient } from "@/lib/Supabase/server";
import SideNav from "@/shared/components/SideNav";
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
    <div className="flex flex-col bg-gray-100 items-center w-full min-h-[80vh]">
      <div className="h-full w-full max-w-[400px] sm:overflow-visible overflow-hidden">
        <SideNav user={user} />
        {children}
      </div>
    </div>
  );
}
