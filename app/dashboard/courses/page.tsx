"use client";

import { motion } from "framer-motion";
import { Sidebar } from "@/components/Sidebar";
import { BookOpen } from "lucide-react";

const enrolledCourses = [
  { title: "Financial Literacy 101", progress: "60%" },
  { title: "Advanced Investing", progress: "30%" },
];

export default function DashboardCoursesPage() {
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
            My Courses
          </h1>
          <p className="mt-1 text-slate-400">
            Track your learning progress across Nexus Finance courses.
          </p>
        </motion.div>

        <div className="grid gap-6 sm:grid-cols-2">
          {enrolledCourses.map((course, index) => (
            <motion.div
              key={course.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-light rounded-xl border border-white/10 p-6"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">
                    {course.title}
                  </h2>
                  <p className="mt-1 text-sm text-slate-400">
                    Continue where you left off.
                  </p>
                </div>
                <BookOpen className="text-emerald-500/80" size={24} />
              </div>
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm text-slate-400">
                  <span>Progress</span>
                  <span className="font-semibold text-emerald-400">
                    {course.progress}
                  </span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-800">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-emerald-400"
                    style={{ width: course.progress }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

