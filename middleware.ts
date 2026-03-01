import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Rate limit placeholder - implement with Redis/Upstash in production
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX_REQUESTS = 100;

// Brute force mitigation: track failed auth attempts per IP
// In production: use Redis, exponential backoff, CAPTCHA after N failures

export function middleware(request: NextRequest) {
  // Secure headers - add via next.config headers in production
  const response = NextResponse.next();

  // Role protection placeholder for /dashboard
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");
  // Auth check: use process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY placeholder
  // In production: verify JWT from Supabase, check session
  const isAuthenticated = request.cookies.get("nexus-auth")?.value === "true";

  if (isDashboard && !isAuthenticated) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
