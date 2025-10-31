"use server";

import { getClient } from "@/lib/Supabase/server";
import { redirect } from "next/navigation";

export const signInWithOAuth = async (provider, origin) => {
  const supabase = await getClient();

  // Prefer the origin passed from the client (window.location.origin). Fallback to NEXT_PUBLIC_SITE_URL.
  const base = (origin && String(origin).replace(/\/$/, "")) || process.env.NEXT_PUBLIC_SITE_URL;
  const redirectUrl = `${base}/api/auth/callback`;

  console.log("[SIGNIN-WITH-OAUTH] base URL:", base);
  console.log("[SIGNIN-WITH-OAUTH] redirect URL:", redirectUrl);
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
  console.log("[GOOGLE-SIGNIN-ACTION] origin:", origin);
  return await signInWithOAuth("google", origin);
}