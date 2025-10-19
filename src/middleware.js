import { createClientForMiddleware } from "@/lib/Supabase/server";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { client, response } = createClientForMiddleware(request);

  const {
    data: { user },
  } = await client.auth.getUser();

  console.warn("Middleware - User:", user);

  const isProtectedRoute = request.nextUrl.pathname.startsWith("/chat");

  const isResetPasswordRoute = request.nextUrl.pathname.startsWith("/reset-password");

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
