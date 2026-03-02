"use client";

import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { CreditCard } from "lucide-react";

const purchases = [
  {
    name: "Budgeting Spreadsheet Pro",
    date: "2026-02-10",
    amount: "$29",
  },
  {
    name: "Investment Tracker Toolkit",
    date: "2026-02-18",
    amount: "$49",
  },
];

export default function DashboardPurchasesPage() {
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
            Purchases
          </h1>
          <p className="mt-1 text-slate-400">
            View your Nexus Finance toolkits and receipts.
          </p>
        </motion.div>

        <div className="space-y-4">
          {purchases.map((purchase, index) => (
            <motion.div
              key={`${purchase.name}-${purchase.date}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-light flex items-center justify-between rounded-xl border border-white/10 p-4"
            >
              <div>
                <p className="text-sm text-slate-400">{purchase.date}</p>
                <p className="text-base font-semibold text-white">
                  {purchase.name}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-lg font-semibold text-emerald-400">
                  {purchase.amount}
                </span>
                <CreditCard className="text-emerald-500/80" size={22} />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

