import { motion } from "framer-motion";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { BookOpen } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

type EnrolledCourse = {
  courses: {
    id: string;
    title: string;
    slug: string | null;
    description: string | null;
  } | null;
};

export default async function DashboardCoursesPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let enrolled: EnrolledCourse[] = [];

  if (session?.user) {
    const { data } = await supabase
      .from("enrollments")
      .select("courses ( id, title, slug, description )")
      .eq("user_id", session.user.id);

    if (Array.isArray(data)) {
      enrolled = data as unknown as EnrolledCourse[];
    }
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            My Courses
          </h1>
          <p className="mt-1 text-slate-400">
            Track your learning progress across Nexus Finance courses.
          </p>
        </div>

        {enrolled.length === 0 && (
          <p className="text-slate-400">No enrolled courses yet.</p>
        )}

        {enrolled.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2">
            {enrolled.map((row, index) => {
              const course = row.courses;
              if (!course) return null;
              return (
                // <<motion.div
                //   key={course.id}
                //   initial={{ opacity: 0, y: 20 }}
                //   animate={{ opacity: 1, y: 0 }}
                //   transition={{ delay: index * 0.1 }}
                //   className="glass-light rounded-xl border border-white/10 p-6"
                // >
                <div key={course.id} className="glass-light rounded-xl border border-white/10 p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-white">
                        {course.title}
                      </h2>
                      <p className="mt-1 text-sm text-slate-400">
                        {course.description ??
                          "You are enrolled in this course. New content will appear here as you progress."}
                      </p>
                    </div>
                    <BookOpen className="text-emerald-500/80" size={24} />
                  </div>
                {/* </motion.div> */}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

