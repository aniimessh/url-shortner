// middleware.ts (place this in the root of your project)

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;

  // If no token found, redirect to signup
  if (!token) {
    const signupUrl = new URL("/user-auth", request.url);

    return NextResponse.redirect(signupUrl);
  }

  // Token exists, allow the request to proceed
  return NextResponse.next();
}

// Configure which routes the middleware applies to
export const config = {
  matcher: ["/((?!user-auth|api|_next/static|_next/image|favicon.ico).*)"],
};
