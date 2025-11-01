"use server";

import { getClient } from "@/lib/Supabase/server";
import { redirect } from "next/navigation";

export const signInWithOAuth = async (provider, origin) => {
  const supabase = await getClient();

  const base = (origin && String(origin).replace(/\/$/, "")) || process.env.NEXT_PUBLIC_SITE_URL;
  const redirectUrl = `${base}/api/auth/callback`;

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: redirectUrl,
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

export async function signInWithGoogleAction(origin) {
  return await signInWithOAuth("google", origin);
}