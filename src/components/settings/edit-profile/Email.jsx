import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail } from "lucide-react";
import { getClient } from "@/lib/Supabase/server";

const Email = async () => {
  const supabase = await getClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div className="flex flex-col gap-2 w-full max-w-md">
      <Label className="text-lg text-gray-700 font-normal">Email:</Label>

      <div className="relative w-full">
        <Input
          value={user?.email || ""}
          readOnly
          className="pr-10 cursor-not-allowed bg-gray-100 text-gray-600"
        />
        <Mail
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4"
          aria-hidden="true"
        />
      </div>
    </div>
  );
};

export default Email;
