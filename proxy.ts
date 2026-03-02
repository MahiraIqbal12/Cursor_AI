import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { ADMIN_EMAILS } from "@/lib/auth";

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

  const pathname = request.nextUrl.pathname;
  const isDashboard = pathname.startsWith("/dashboard");
  const isAdminRoute = pathname.startsWith("/dashboard/admin");

  // Protect all dashboard routes
  if (isDashboard && !session) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const email = session?.user?.email ?? null;
  const normalizedEmail = email?.toLowerCase() ?? null;
  const isAdmin =
    !!normalizedEmail &&
    ADMIN_EMAILS.some(
      (adminEmail) => adminEmail.toLowerCase() === normalizedEmail
    );

  // Protect /dashboard/admin for admin-only access
  if (isAdminRoute && !isAdmin) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*"],
};