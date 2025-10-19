import { getClient } from "@/lib/Supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ROUTES } from "@/constants/routes";
import { COOKIE_NAMES, COOKIE_CONFIG } from "@/constants/cookies";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const token_hash = searchParams.get("token_hash");
  const type = searchParams.get("type");
  const next = searchParams.get("next") || ROUTES.RESET_PASSWORD;
  const error = searchParams.get("error");
  const error_code = searchParams.get("error_code");
  const error_description = searchParams.get("error_description");

  if (error || error_code) {
    const errorParams = new URLSearchParams({
      error: error || "unknown_error",
      error_code: error_code || "unknown",
      error_description: error_description || "An error occurred",
    });
    redirect(`${ROUTES.AUTH_ERROR}?${errorParams.toString()}`);
  }

  if (token_hash && type) {
    const supabase = await getClient();
    
    const { error: verifyError } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    });


    if (!verifyError) {
      const cookieStore = await cookies();
      const resetToken = process.env.PASSWORD_RESET_SECRET_KEY;
      
      cookieStore.set(COOKIE_NAMES.PASSWORD_RESET_TOKEN, resetToken, {
        httpOnly: true,
        secure:true,
        sameSite: "lax",
        maxAge: COOKIE_CONFIG.PASSWORD_RESET_MAX_AGE,
        path: "/",
      });

      redirect(next);
    }

    const errorParams = new URLSearchParams({
      error: "verification_failed",
      error_code: verifyError.code || "unknown",
      error_description: verifyError.message || "Failed to verify token",
    });

    redirect(`${ROUTES.AUTH_ERROR}?${errorParams.toString()}`);
  }

  redirect(ROUTES.SIGNIN);
}
