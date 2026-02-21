import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Routes that ONLY non-logged-in users can access
const AUTH_ROUTES = ["/sign-up", "/login"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwtToken")?.value;
  const { pathname } = request.nextUrl;

  const isAuthRoute = AUTH_ROUTES.includes(pathname);

  // ✅ Logged in + trying to access login/signup → redirect to home
  if (token && isAuthRoute) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // ✅ Not logged in + trying to access any non-auth route → redirect to signup
  if (!token && !isAuthRoute) {
    return NextResponse.redirect(new URL("/sign-up", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
