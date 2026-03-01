"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { BookOpen, ShoppingBag } from "lucide-react";

export default function Home() {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] via-[#0f172a] to-emerald-950/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.15)_0%,_transparent_50%)]" />

      <section className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8 lg:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Master Finance.{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
              Own Your Future.
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="mt-6 text-lg text-slate-400 sm:text-xl"
          >
            Learn financial literacy, invest smarter, and build lasting wealth
            with our courses and toolkits.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              href="/courses"
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-4 font-semibold text-white transition hover:bg-emerald-400 sm:w-auto"
            >
              <BookOpen size={20} />
              Start Learning
            </Link>
            <Link
              href="/store"
              className="flex w-full items-center justify-center gap-2 rounded-xl border border-emerald-500/50 bg-emerald-500/10 px-6 py-4 font-semibold text-emerald-400 transition hover:bg-emerald-500/20 sm:w-auto"
            >
              <ShoppingBag size={20} />
              Shop Toolkits
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </div>
  );
}
