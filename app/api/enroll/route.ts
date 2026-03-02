import { createClient } from "@/lib/supabase/server";

type EnrollResponse =
  | { success: true }
  | { success: false; duplicate?: boolean };

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return Response.json<EnrollResponse>(
      { success: false },
      { status: 401 }
    );
  }

  const body = (await request.json()) as { courseId?: string } | null;

  const courseId =
    typeof body?.courseId === "string" ? body.courseId.trim() : "";

  if (!courseId) {
    return Response.json<EnrollResponse>(
      { success: false },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("enrollments").insert({
    user_id: session.user.id,
    course_id: courseId,
  });

  if (error) {
    // Handle duplicate enrollment via unique constraint on (user_id, course_id)
    if (error.code === "23505") {
      return Response.json<EnrollResponse>(
        { success: false, duplicate: true },
        { status: 200 }
      );
    }

    console.error("[Enroll] Unexpected error", {
      code: error.code,
      message: error.message,
    });

    return Response.json<EnrollResponse>(
      { success: false },
      { status: 500 }
    );
  }

  return Response.json<EnrollResponse>({ success: true });
}

