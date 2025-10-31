import { createClientForMiddleware } from "@/lib/Supabase/server";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { client, response } = createClientForMiddleware(request);

  const {
    data: { user },
  } = await client.auth.getUser();

  const isProtectedRoute = request.nextUrl.pathname.startsWith("/chat");

  /*
    The reset password page will be accessible by the authenticated user
    only if they have a valid password reset token cookie
    So we dont need to put that in the isAuthRoute
  */

  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/signin") ||
    request.nextUrl.pathname.startsWith("/signup") ||
    request.nextUrl.pathname.startsWith("/confirm-email") ||
    request.nextUrl.pathname.startsWith("/forgot-password") ||
    request.nextUrl.pathname.startsWith("/auth-error");
    
  const isAuthCallback = 
    request.nextUrl.pathname.startsWith("/api/auth/confirm");

  if (user && isAuthRoute && !isAuthCallback) {
    return NextResponse.redirect(new URL("/chat", request.url));
  }

  if (!user && isProtectedRoute) {
    const redirectUrl = new URL("/signin", request.url);
    redirectUrl.searchParams.set("redirectTo", request.nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
