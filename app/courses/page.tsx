import Link from "next/link";
import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/server";
import { EnrollButton } from "@/components/EnrollButton";

type Course = {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;
  price: number | null;
};

const COLOR_CLASSES = [
  {
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30",
  },
  {
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30",
  },
  {
    color: "from-emerald-500/20 to-emerald-600/10",
    border: "border-emerald-500/30",
  },
];

export default async function CoursesPage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("id, title, slug, description, price")
    .order("title", { ascending: true });

  const courses: Course[] = Array.isArray(data) ? (data as Course[]) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      > */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Courses</h1>
        <p className="mt-2 text-slate-400">Level up your financial knowledge</p>
      {/* </motion.div> */}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course, i) => {
          const colorSet = COLOR_CLASSES[i % COLOR_CLASSES.length];
          return (
            // <motion.article
            //   key={course.id}
            //   initial={{ opacity: 0, y: 20 }}
            //   animate={{ opacity: 1, y: 0 }}
            //   transition={{ delay: i * 0.1 }}
            //   whileHover={{ y: -4 }}
            //   className={`glass-light rounded-2xl border ${colorSet.border} p-6 transition hover:border-emerald-500/50`}
            // >
            <div key={course.id} className={`glass-light rounded-2xl border ${colorSet.border} p-6 transition hover:border-emerald-500/50`}>
              <div
                className={`mb-4 h-1 w-16 rounded-full bg-gradient-to-r ${colorSet.color}`}
              />
              <h2 className="text-xl font-semibold text-white">
                {course.title}
              </h2>
              <p className="mt-2 text-slate-400">
                {course.description ??
                  "Learn practical, real-world finance skills you can apply immediately."}
              </p>
              <Link
                href={`/courses/${course.slug ?? course.id}`}
                className="mt-2 inline-block text-sm text-slate-400 hover:text-slate-200"
              >
                View details
              </Link>
              <EnrollButton courseId={course.id} />
            {/* </motion.article> */}
            </div>
          );
        })}

        {error && courses.length === 0 && (
          <p className="text-slate-400">
            Courses are temporarily unavailable. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}
