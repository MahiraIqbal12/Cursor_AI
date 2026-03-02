import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

// Rate limit placeholder - implement with Redis/Upstash in production
const RATE_LIMIT_WINDOW_MS = 60000;
const RATE_LIMIT_MAX_REQUESTS = 100;

// Brute force mitigation placeholder:
// In production: track failed login attempts with Redis,
// apply exponential backoff, lock account after threshold.

export async function proxy(request: NextRequest) {
  const response = NextResponse.next();

  // Initialize Supabase server client using request cookies
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
      },
    }
  );

  // Check session securely via Supabase
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  // Protect dashboard routes
  if (isDashboard && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Role-based protection placeholder:
  // In production:
  // - Extract role from session.user.user_metadata.role
  // - Restrict admin-only routes accordingly

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};