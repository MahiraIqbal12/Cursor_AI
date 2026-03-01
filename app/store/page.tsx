"use client";

import { motion } from "framer-motion";
import { CreditCard } from "lucide-react";

const products = [
  {
    id: "budgeting-spreadsheet-pro",
    name: "Budgeting Spreadsheet Pro",
    description: "Professional Excel/Sheets templates for tracking income, expenses, and savings goals.",
    price: "$29",
  },
  {
    id: "investment-tracker-toolkit",
    name: "Investment Tracker Toolkit",
    description: "Portfolio tracker, dividend calculator, and rebalancing templates.",
    price: "$49",
  },
];

export default function StorePage() {
  function handleCheckout(productId: string) {
    // Mock Stripe checkout placeholder - use createCheckoutSession in production
    console.log("Checkout placeholder:", productId);
    alert("Checkout is in test mode. Configure Stripe to enable payments.");
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Store</h1>
        <p className="mt-2 text-slate-400">Digital products to accelerate your finance journey</p>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          <motion.article
            key={product.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass-light flex flex-col rounded-2xl border border-white/10 p-6 transition hover:border-emerald-500/30"
          >
            <h2 className="text-xl font-semibold text-white">{product.name}</h2>
            <p className="mt-2 flex-1 text-slate-400">{product.description}</p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-2xl font-bold text-emerald-400">{product.price}</span>
              <button
                type="button"
                onClick={() => handleCheckout(product.id)}
                className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 font-medium text-white transition hover:bg-emerald-400"
              >
                <CreditCard size={18} />
                Buy (Test)
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
