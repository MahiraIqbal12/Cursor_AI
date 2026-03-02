"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Send, X } from "lucide-react";

const DEFAULT_MESSAGE =
  "Welcome to Nexus Finance. I am your AI assistant. How can I help you today?";

type Message = { role: "user" | "assistant"; content: string };

type ChatApiResponse = {
  success: boolean;
  data?: { content: string } | null;
  error?: { code?: string; message: string } | null;
};

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: DEFAULT_MESSAGE },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function handleSend(e: React.FormEvent) {
    e.preventDefault();
    const trimmed = input.trim();
    if (!trimmed || loading) return;

    setInput("");
    setMessages((m) => [...m, { role: "user", content: trimmed }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed, history: messages }),
      });
      const data: ChatApiResponse = await res.json();

      if (!res.ok || !data.success || !data.data?.content) {
        const fallback =
          data.error?.message ||
          "I'm having trouble responding right now. Please try again.";

        setMessages((previous) => [
          ...previous,
          { role: "assistant", content: fallback },
        ]);
        return;
      }

      setMessages((previous) => [
        ...previous,
        { role: "assistant", content: data.data?.content ?? "No response." },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Unable to reach the AI. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <motion.button
        type="button"
        aria-label="Open AI Tutor"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30 transition hover:bg-emerald-400"
        onClick={() => setOpen(true)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageCircle size={24} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6"
          >
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              transition={{ type: "spring", damping: 25 }}
              className="glass relative flex h-[70vh] max-h-[600px] w-full max-w-md flex-col rounded-2xl border border-white/10 shadow-2xl"
            >
              <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
                <span className="font-semibold text-emerald-400">AI Tutor</span>
                <button
                  type="button"
                  aria-label="Close chat"
                  className="rounded-lg p-2 text-slate-400 hover:bg-white/5 hover:text-white"
                  onClick={() => setOpen(false)}
                >
                  <X size={20} />
                </button>
              </div>

              <div
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-4 space-y-4"
              >
                {messages.map((msg, i) => (
                  <div
                    key={i}
                    className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[85%] rounded-2xl px-4 py-2 ${
                        msg.role === "user"
                          ? "bg-emerald-500/20 text-emerald-100"
                          : "glass-light text-slate-200"
                      }`}
                    >
                      {msg.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="glass-light rounded-2xl px-4 py-2 text-slate-400">
                      Thinking...
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSend} className="border-t border-white/10 p-4">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask a question..."
                    className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-slate-100 placeholder-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
                    maxLength={2000}
                  />
                  <button
                    type="submit"
                    disabled={loading}
                    className="rounded-xl bg-emerald-500 px-4 py-2 text-white transition hover:bg-emerald-400 disabled:opacity-50"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
