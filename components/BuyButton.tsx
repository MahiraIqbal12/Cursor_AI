"use client";

import { CreditCard } from "lucide-react";

type BuyButtonProps = {
  productId: string;
};

export function BuyButton({ productId }: BuyButtonProps) {
  async function handleClick() {
    try {
      const res = await fetch("/api/purchase", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });

      if (res.status === 401) {
        window.location.href = "/login";
        return;
      }

      const data = (await res.json()) as
        | { success: true }
        | { error?: string };

      if ("success" in data && data.success) {
        alert("Test Purchase Successful.");
      } else if ("error" in data && data.error === "Already purchased") {
        alert("Already purchased.");
      } else {
        alert("Unable to complete purchase. Please try again.");
      }
    } catch {
      alert("Something went wrong. Please try again.");
    }
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className="flex items-center gap-2 rounded-xl bg-emerald-500 px-4 py-2 font-medium text-white transition hover:bg-emerald-400"
    >
      <CreditCard size={18} />
      Buy
    </button>
  );
}

