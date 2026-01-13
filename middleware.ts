import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Allow access to login and setup pages without authentication
  if (pathname === "/admin/login" || pathname === "/admin/setup") {
    return NextResponse.next();
  }
  
  // Check for admin session cookie on admin routes (except login)
  if (pathname.startsWith("/admin")) {
    const sessionCookie = request.cookies.get("admin_session");
    
    if (!sessionCookie) {
      // Redirect to login if no session
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
    
    // Verify session token (basic check)
    try {
      const sessionData = JSON.parse(
        Buffer.from(sessionCookie.value, "base64").toString()
      );
      
      if (!sessionData.authenticated || Date.now() > sessionData.expiresAt) {
        // Invalid or expired session
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    } catch {
      // Invalid session token
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
