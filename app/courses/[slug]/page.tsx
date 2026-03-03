import Link from "next/link";

type PageParams = Promise<{ slug: string }>;

function formatSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default async function CourseDetailPage({
  params,
}: {
  params: PageParams;
}) {
  const { slug } = await params;
  const title = formatSlug(slug);

  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mb-6 text-sm text-emerald-400">
        <Link href="/courses" className="hover:underline">
          Courses
        </Link>
        <span className="mx-2 text-slate-500">/</span>
        <span className="text-slate-300">{title}</span>
      </div>

      <h1 className="text-3xl font-bold text-white sm:text-4xl">{title}</h1>
      <p className="mt-3 text-sm text-slate-400 break-all">Slug: {slug}</p>

      <div className="mt-8 rounded-2xl border border-white/10 bg-[#0f172a]/80 p-6">
        <p className="text-slate-300">
          This is a detailed view for the{" "}
          <span className="font-semibold text-emerald-400">{title}</span> course.
          In a full implementation, this page would show modules, progress, and
          resources for this specific course.
        </p>
      </div>
    </div>
  );
}

