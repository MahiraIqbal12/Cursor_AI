"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const courses = [
  {
    id: "financial-literacy-101",
    title: "Financial Literacy 101",
    description: "Build a solid foundation in budgeting, saving, and understanding money.",
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30",
  },
  {
    id: "advanced-investing",
    title: "Advanced Investing",
    description: "Learn portfolio management, asset allocation, and long-term wealth building.",
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30",
  },
  {
    id: "credit-debt-mastery",
    title: "Credit & Debt Mastery",
    description: "Master credit scores, debt payoff strategies, and financial freedom.",
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30",
  },
];

export default function CoursesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      >
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Courses</h1>
        <p className="mt-2 text-slate-400">Level up your financial knowledge</p>
      </motion.div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => (
          <motion.article
            key={course.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className={`glass-light rounded-2xl border ${course.border} p-6 transition hover:border-emerald-500/50`}
          >
            <div className={`mb-4 h-1 w-16 rounded-full bg-gradient-to-r ${course.color}`} />
            <h2 className="text-xl font-semibold text-white">{course.title}</h2>
            <p className="mt-2 text-slate-400">{course.description}</p>
            <Link
              href={`/courses/${course.id}`}
              className="mt-4 flex items-center gap-2 text-emerald-400 transition hover:text-emerald-300"
            >
              Enroll now
              <ArrowRight size={16} />
            </Link>
          </motion.article>
        ))}
      </div>
    </div>
  );
}
