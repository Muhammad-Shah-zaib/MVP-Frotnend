import { getClient } from "@/lib/Supabase/server";
import { cookies } from "next/headers";
import { COOKIE_NAMES, COOKIE_CONFIG } from "@/constants/cookies";
import { NextResponse } from "next/server";

export async function GET(request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get("code");

  if (code) {
    const supabase = await getClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (error) {
    return NextResponse.redirect(new URL("/auth-error", requestUrl.origin));
    }

    const cookieStore = cookies();
    const secret = process.env.COMPLETE_PROFILE_SECRET_KEY;
    cookieStore.set(COOKIE_NAMES.COMPLETE_PROFILE_SECRET_KEY, secret, {
      httpOnly: true,
      secure: true,
      sameSite: "lax",
      maxAge: COOKIE_CONFIG.COMPLETE_PROFILE_MAX_AGE,
      path: "/",
    });
    return NextResponse.redirect(new URL("/complete-profile", requestUrl.origin));
  }

  return NextResponse.redirect(new URL("/signin", requestUrl.origin));
}