"use server";

import { getClient } from "@/lib/Supabase/server";
import { redirect } from "next/navigation";

export const signInWithOAuth = async (provider) => {
  const supabase = await getClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });

  console.log(data);

  if (error) {
    redirect("/auth-error");
  }

  if (data?.url) {
    redirect(data.url);
  }
};

export async function signInWithGoogleAction() {
  return await signInWithOAuth("google");
}