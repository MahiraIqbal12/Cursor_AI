"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const loggedOutLinks = [
  { href: "/", label: "Home" },
  { href: "/login", label: "Login" },
];

const loggedInLinks = [
  { href: "/courses", label: "Courses" },
  { href: "/store", label: "Store" },
  { href: "/dashboard", label: "Dashboard" },
];

export function Navbar() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const supabase = createClient();

    // Check initial auth state
    supabase.auth.getUser().then(({ data: { user } }) => {
      setIsAuthenticated(!!user);
      setIsLoading(false);
    });

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      setIsLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/"); // redirect after logout
  };

  const handleProtectedClick = (href: string) => {
    if (!isAuthenticated) {
      router.push(`/login?redirectTo=${encodeURIComponent(href)}`);
    } else {
      router.push(href);
    }
    setOpen(false);
  };

  if (isLoading) {
    return (
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="sticky top-0 z-50 w-full glass border-b border-white/5"
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" className="text-xl font-bold text-emerald-400">
            Nexus Finance
          </Link>
          <div className="hidden md:flex md:items-center md:gap-8">
            <div className="h-4 w-16 bg-slate-600 rounded animate-pulse"></div>
          </div>
        </nav>
      </motion.header>
    );
  }

  const currentNavLinks = isAuthenticated ? loggedInLinks : loggedOutLinks;

  return (
    <motion.header
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-50 w-full glass border-b border-white/5"
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/" className="text-xl font-bold text-emerald-400">
          Nexus Finance
        </Link>

        <div className="hidden md:flex md:items-center md:gap-8">
          {currentNavLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-slate-300 transition-colors hover:text-emerald-400"
            >
              {link.label}
            </Link>
          ))}
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="text-slate-300 transition-colors hover:text-emerald-400"
            >
              Logout
            </button>
          )}
        </div>

        <button
          type="button"
          aria-label="Toggle menu"
          className="md:hidden rounded-lg p-2 text-slate-300 hover:bg-white/5"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {open && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-light border-t border-white/5 md:hidden"
        >
          <div className="flex flex-col gap-2 px-4 py-4">
            {currentNavLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleProtectedClick(link.href)}
                className="rounded-lg px-4 py-2 text-slate-300 hover:bg-white/5 hover:text-emerald-400"
              >
                {link.label}
              </button>
            ))}
            {isAuthenticated && (
              <button
                onClick={handleLogout}
                className="rounded-lg px-4 py-2 text-slate-300 hover:bg-white/5 hover:text-emerald-400"
              >
                Logout
              </button>
            )}
          </div>
        </motion.div>
      )}
    </motion.header>
  );
}