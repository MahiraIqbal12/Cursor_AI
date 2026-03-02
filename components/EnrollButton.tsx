"use client";

import { ArrowRight } from "lucide-react";

type EnrollButtonProps = {
  courseId: string;
};

export function EnrollButton({ courseId }: EnrollButtonProps) {
  async function handleClick() {
    try {
      const res = await fetch("/api/enroll", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ courseId }),
      });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      const data = (await res.json()) as {
        success: boolean;
        duplicate?: boolean;
      };

      if (data.success) {
        alert("Enrolled successfully in this course.");
      } else if (data.duplicate) {
        alert("Already enrolled in this course.");
      } else {
        alert("Unable to enroll. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="mt-4 flex items-center gap-2 text-emerald-400 transition hover:text-emerald-300"
    >
      Enroll now
      <ArrowRight size={16} />
    </button>
  );
}

