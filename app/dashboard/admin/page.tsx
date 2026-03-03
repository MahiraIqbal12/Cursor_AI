import { DashboardSidebar } from "@/components/DashboardSidebar";
import { createClient } from "@/lib/supabase/server";
import { ADMIN_EMAILS } from "@/lib/auth";

export default async function AdminPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  const email = session?.user?.email ?? "Unknown";
  const normalizedEmail = email.toLowerCase();
  const isAdmin = ADMIN_EMAILS.some(
    (adminEmail) => adminEmail.toLowerCase() === normalizedEmail
  );

  const roleLabel = isAdmin ? "Admin" : "User";

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Admin Control Panel
          </h1>
          <p className="mt-1 text-slate-400">
            Manage Nexus Finance at an administrative level.
          </p>
        </div>

        <div className="glass-light max-w-xl rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold text-white">
            Session Overview
          </h2>
          <dl className="mt-4 space-y-2 text-sm text-slate-300">
            <div className="flex justify-between">
              <dt className="text-slate-400">Email</dt>
              <dd className="font-medium text-emerald-400">{email}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-slate-400">Role</dt>
              <dd className="font-medium text-emerald-400">{roleLabel}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}

