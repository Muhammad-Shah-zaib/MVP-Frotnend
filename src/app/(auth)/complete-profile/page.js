import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { COOKIE_NAMES } from "@/constants/cookies";
import { CompleteProfileForm } from "@/components/auth/complete-profile/CompleteProfileForm";
import { getClient } from "@/lib/Supabase/server";

export default async function CompleteProfilePage() {
  // Authentication check
  const supabase = await getClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();
  console.log("User :", user);

  if (error || !user) {
    redirect("/signin");
  }

  if (user.user_metadata?.profile_complete) {
    redirect("/chat");
  }

  // Secret key verification
  const cookieStore = await cookies();
  const secretCookie = cookieStore.get(
    COOKIE_NAMES.COMPLETE_PROFILE_SECRET_KEY
  )?.value;
  const secretKey = process.env.COMPLETE_PROFILE_SECRET_KEY;
  if (!secretCookie || secretCookie !== secretKey) {
    redirect("/signin");
  }

  // Get user email
  const email = user.email || "user@example.com";

  return (
    <div className="mx-auto mt-16 flex w-full max-w-md flex-col gap-8 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Complete your profile
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Just one more step to get started
        </p>
      </div>
      <CompleteProfileForm email={email} />
    </div>
  );
}
