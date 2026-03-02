import { createClient } from "@/lib/supabase/server";

type PurchaseResponse =
  | { success: true }
  | { error: string };

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    return Response.json<PurchaseResponse>(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const body = (await request.json()) as { productId?: string } | null;
  const productId =
    typeof body?.productId === "string" ? body.productId.trim() : "";

  if (!productId) {
    return Response.json<PurchaseResponse>(
      { error: "Invalid product" },
      { status: 400 }
    );
  }

  const { error } = await supabase.from("purchases").insert({
    user_id: session.user.id,
    product_id: productId,
  });

  if (error) {
    // Handle unique constraint for duplicate purchase (e.g. 23505 in Postgres)
    if (error.code === "23505") {
      return Response.json<PurchaseResponse>(
        { error: "Already purchased" },
        { status: 200 }
      );
    }

    console.error("[Purchase] Unexpected error", {
      code: error.code,
      message: error.message,
    });

    return Response.json<PurchaseResponse>(
      { error: "Purchase failed" },
      { status: 500 }
    );
  }

  return Response.json<PurchaseResponse>({ success: true });
}

