import { createClientForMiddleware } from "@/lib/Supabase/server";
import { NextResponse } from "next/server";

export async function middleware(request) {
  const { client, response } = createClientForMiddleware(request);

  const {
    data: { user },
  } = await client.auth.getUser();

  const isProtectedRoute = request.nextUrl.pathname.startsWith("/chat");

  const isAuthRoute =
    request.nextUrl.pathname.startsWith("/signin") ||
    request.nextUrl.pathname.startsWith("/signup");

  if (user && isAuthRoute) {
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
