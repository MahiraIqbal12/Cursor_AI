"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { Shield, Bell } from "lucide-react";

export default function DashboardSettingsPage() {
  const [emailUpdates, setEmailUpdates] = useState(true);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // Input validation placeholder: ensure preferences are valid before persisting
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Settings
          </h1>
          <p className="mt-1 text-slate-400">
            Manage notification and security preferences for your account.
          </p>
        </motion.div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-2xl border border-white/10 bg-[#0f172a]/80 p-6"
        >
          <div className="flex items-center gap-3">
            <Bell className="text-emerald-500/80" size={22} />
            <div>
              <h2 className="text-base font-semibold text-white">
                Notifications
              </h2>
              <p className="text-sm text-slate-400">
                Choose how you want to hear from Nexus Finance.
              </p>
            </div>
          </div>

          <label className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200">
            <span>Receive email updates about new content</span>
            <input
              type="checkbox"
              checked={emailUpdates}
              onChange={(event) => setEmailUpdates(event.target.checked)}
              className="h-4 w-4 accent-emerald-500"
            />
          </label>

          <div className="flex items-center gap-3 pt-4">
            <Shield className="text-emerald-500/80" size={22} />
            <div>
              <h2 className="text-base font-semibold text-white">
                Security overview
              </h2>
              <p className="text-sm text-slate-400">
                Session expiration and multi-factor authentication can be
                configured once integrated with your identity provider.
              </p>
            </div>
          </div>

          <button
            type="submit"
            className="mt-4 rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-400"
          >
            Save preferences
          </button>
        </form>
      </div>
    </div>
  );
}

