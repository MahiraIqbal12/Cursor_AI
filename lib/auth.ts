/**
 * Supabase Auth placeholder
 * Replace with actual Supabase client when keys are configured
 * Use env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

export type UserRole = "student" | "admin";

export const ADMIN_EMAILS: string[] = ["mahi.khuwaja@gmail.com"];

export async function getSession(): Promise<{ user: { id: string; email?: string } | null }> {
  // Placeholder - integrate Supabase auth
  return { user: null };
}

export async function signIn(email: string, password: string): Promise<{ error?: string }> {
  // Placeholder - Supabase signInWithPassword
  return {};
}

export async function signOut(): Promise<void> {
  // Placeholder - Supabase signOut
}

export function getRole(_userId: string): UserRole | null {
  // Placeholder - fetch from Supabase role table
  return "student";
}

export async function getUserRole(
  userId: string | null | undefined
): Promise<UserRole | null> {
  if (!userId) {
    return null;
  }

  // Placeholder - fetch role from Supabase or JWT claims using userId
  return getRole(userId);
}

export function hasRequiredRole(
  userRole: UserRole | null,
  allowedRoles: UserRole[]
): boolean {
  if (!userRole) {
    return false;
  }

  return allowedRoles.includes(userRole);
}

