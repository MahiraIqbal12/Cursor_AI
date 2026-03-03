import { DashboardSidebar } from "@/components/DashboardSidebar";
import { CreditCard } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

type PurchaseRow = {
  created_at: string | null;
  products: {
    id: string;
    title: string;
    slug: string | null;
    price: number | null;
  } | null;
};

export default async function DashboardPurchasesPage() {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  let purchases: PurchaseRow[] = [];

  if (session?.user) {
    const { data } = await supabase
      .from("purchases")
      .select("created_at, products ( id, title, slug, price )")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (Array.isArray(data)) {
      purchases = data as unknown as PurchaseRow[];
    }
  }

  return (
    <div className="flex min-h-screen">
      <DashboardSidebar />
      <div className="flex-1 p-6 lg:p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Purchases
          </h1>
          <p className="mt-1 text-slate-400">
            View your Nexus Finance toolkits and receipts.
          </p>
        </div>

        {purchases.length === 0 && (
          <p className="text-slate-400">No purchases yet.</p>
        )}

        {purchases.length > 0 && (
          <div className="space-y-4">
            {purchases.map((row) => {
              const product = row.products;
              if (!product) return null;

              const date =
                row.created_at &&
                !Number.isNaN(Date.parse(row.created_at))
                  ? new Date(row.created_at).toISOString().slice(0, 10)
                  : "";

              const amount =
                typeof product.price === "number"
                  ? `$${product.price.toFixed(0)}`
                  : "";

              return (
                <div
                  key={`${product.id}-${row.created_at ?? ""}`}
                  className="glass-light flex items-center justify-between rounded-xl border border-white/10 p-4"
                >
                  <div>
                    <p className="text-sm text-slate-400">{date}</p>
                    <p className="text-base font-semibold text-white">
                      {product.title}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-lg font-semibold text-emerald-400">
                      {amount}
                    </span>
                    <CreditCard className="text-emerald-500/80" size={22} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

