"use client";

import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { BookOpen, TrendingUp, CreditCard } from "lucide-react";

// Role-based placeholder - in production fetch from auth
const role = "student";

const overviewCards = [
  { label: "Courses Enrolled", value: "3", icon: BookOpen },
  { label: "Progress", value: "42%", icon: TrendingUp },
  { label: "Purchases", value: "2", icon: CreditCard },
];

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 p-6 lg:p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-slate-400">
            Welcome back{role === "admin" ? " (Admin)" : ""}
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {overviewCards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-light rounded-xl border border-white/10 p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">{card.label}</span>
                  <Icon className="text-emerald-500/80" size={24} />
                </div>
                <p className="mt-2 text-2xl font-bold text-white">{card.value}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
