"use server";

import { getClient } from "@/lib/Supabase/server";

export async function resendConfirmationEmail(email) {
  if (!email) {
    return {
      success: false,
      error: "Email is required",
    };
  }

  const supabase = await getClient();

  const { error } = await supabase.auth.resend({
    type: "signup",
    email,
    options: {
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    },
  });

  if (error) {
    return {
      success: false,
      error: error.message,
    };
  }

  return {
    success: true,
  };
}
