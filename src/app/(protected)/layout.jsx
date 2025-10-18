import { getClient } from "@/lib/Supabase/server";
import { redirect } from "next/navigation";

export default async function ProtectedLayout({ children }) {
  const supabase = await getClient();
  
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (!user || error) {
    redirect('/signin');
  }
  
  return (
    <div className="min-h-screen">
      {children}
    </div>
  );
}
