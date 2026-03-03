import { motion } from "framer-motion";
import { createClient } from "@/lib/supabase/server";
import { BuyButton } from "@/components/BuyButton";

type Product = {
  id: string;
  title: string;
  slug: string | null;
  description: string | null;
  price: number | null;
};

export default async function StorePage() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("products")
    .select("id, title, slug, description, price")
    .order("title", { ascending: true });

  const products: Product[] = Array.isArray(data) ? (data as Product[]) : [];

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      {/* <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 text-center"
      > */}
      <div className="mb-12 text-center">
        <h1 className="text-3xl font-bold text-white sm:text-4xl">Store</h1>
        <p className="mt-2 text-slate-400">
          Digital products to accelerate your finance journey
        </p>
      {/* </motion.div> */}
      </div>

      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product, i) => (
          // 
          <div key={product.id} className="glass-light flex flex-col rounded-2xl border border-white/10 p-6 transition hover:border-emerald-500/30">
            <h2 className="text-xl font-semibold text-white">
              {product.title}
            </h2>
            <p className="mt-2 flex-1 text-slate-400">
              {product.description ??
                "High-impact financial tools designed to give you clarity and control."}
            </p>
            <div className="mt-4 flex items-center justify-between">
              <span className="text-2xl font-bold text-emerald-400">
                {typeof product.price === "number"
                  ? `$${product.price.toFixed(0)}`
                  : "$0"}
              </span>
              <BuyButton productId={product.id} />
            </div>
          {/* </motion.article> */}
          </div>
        ))}

        {error && products.length === 0 && (
          <p className="text-slate-400">
            Products are temporarily unavailable. Please try again later.
          </p>
        )}
      </div>
    </div>
  );
}
