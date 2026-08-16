import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const guestSession = request.cookies.get("guest-session")?.value;
  const authToken = request.cookies.get("auth-token")?.value;

  if (!guestSession && !authToken) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/tasks/:path*", "/projects/:path*"],
};