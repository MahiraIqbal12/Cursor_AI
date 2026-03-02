import { Sidebar } from "@/components/Sidebar";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_EMAILS } from "@/lib/auth";

export async function DashboardSidebar() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const email = session?.user?.email ?? null;
  const normalizedEmail = email?.toLowerCase() ?? null;
  const isAdmin =
    !!normalizedEmail &&
    ADMIN_EMAILS.some(
      (adminEmail) => adminEmail.toLowerCase() === normalizedEmail
    );

  return <Sidebar isAdmin={isAdmin} />;
}

