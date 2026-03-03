
import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardStats } from "@/components/DashboardStats";


// Role-based placeholder - in production fetch from auth
const role = "student";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-6 lg:p-8">
        {/* <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        > */} <div className="mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-slate-400">
          Welcome back { (role as string) === "admin" ? " (Admin)" : "" }
          </p>
          </div>
        {/* </motion.div> */}

        <DashboardStats />
      </div>
    </div>
  );
}
