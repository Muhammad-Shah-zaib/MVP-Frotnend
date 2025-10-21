import { getClient } from "@/lib/Supabase/server";
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

    return NextResponse.redirect(new URL("/chat", requestUrl.origin));
  }

  return NextResponse.redirect(new URL("/signin", requestUrl.origin));
}
