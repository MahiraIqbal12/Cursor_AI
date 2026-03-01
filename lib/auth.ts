/**
 * Supabase Auth placeholder
 * Replace with actual Supabase client when keys are configured
 * Use env: NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

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

export function getRole(_userId: string): "student" | "admin" | null {
  // Placeholder - fetch from Supabase role table
  return "student";
}
