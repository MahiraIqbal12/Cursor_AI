"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { BookOpen, TrendingUp, CreditCard } from "lucide-react";

interface DashboardStats {
  coursesEnrolled: number;
  purchases: number;
  progress: number;
}

export function DashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    coursesEnrolled: 0,
    purchases: 0,
    progress: 0
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const supabase = createClient();
        
        // Get current user session
        const { data: { session } } = await supabase.auth.getSession();
        if (!session?.user) return;

        const userId = session.user.id;

        // Fetch courses enrolled count
        const { count: coursesCount } = await supabase
          .from("enrollments")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId);

        // Fetch purchases count
        const { count: purchasesCount } = await supabase
          .from("purchases")
          .select("*", { count: "exact", head: true })
          .eq("user_id", userId);

        // Fetch progress percentage
        const { data: progressData } = await supabase
          .from("course_progress")
          .select("progress")
          .eq("user_id", userId)
          .single();

        setStats({
          coursesEnrolled: coursesCount || 0,
          purchases: purchasesCount || 0,
          progress: progressData?.progress || 0
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, []);

  const formatNumber = (num: number) => num.toLocaleString();
  const formatProgress = (num: number) => `${Math.round(num)}%`;

  const statCards = [
    {
      label: "Courses Enrolled",
      value: stats.coursesEnrolled,
      format: formatNumber,
      icon: BookOpen
    },
    {
      label: "Progress",
      value: stats.progress,
      format: formatProgress,
      icon: TrendingUp
    },
    {
      label: "Purchases",
      value: stats.purchases,
      format: formatNumber,
      icon: CreditCard
    }
  ];

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {statCards.map((card, i) => {
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
            <motion.p
              key={card.value}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="mt-2 text-2xl font-bold text-white"
            >
              {isLoading ? "0" : card.format(card.value)}
            </motion.p>
          </motion.div>
        );
      })}
    </div>
  );
}