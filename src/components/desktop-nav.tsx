"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { logout } from "@/actions/auth";

export function DesktopNav({ userName }: { userName: string }) {
  const pathname = usePathname();

  return (
    <aside className="hidden md:flex md:w-56 md:flex-col md:border-r md:border-border md:bg-surface md:px-3 md:py-6">
      <div className="mb-8 px-3">
        <h1 className="font-serif text-xl">Persona</h1>
      </div>

      <nav className="flex flex-1 flex-col gap-1">
        <Link
          href="/app/home"
          className={cn(
            "rounded-xl px-3 py-2.5 text-sm font-medium transition-colors",
            pathname === "/app/home"
              ? "bg-accent-light text-accent"
              : "text-text-secondary hover:bg-accent-light/50"
          )}
        >
          Home
        </Link>
        <Link
          href="/app/people/new"
          className="rounded-xl px-3 py-2.5 text-sm font-medium text-text-secondary transition-colors hover:bg-accent-light/50"
        >
          + Add someone
        </Link>
      </nav>

      <div className="mt-auto border-t border-border pt-4">
        <p className="px-3 text-sm text-text-secondary">{userName}</p>
        <form action={logout}>
          <button
            type="submit"
            className="mt-2 w-full rounded-xl px-3 py-2 text-left text-sm text-text-secondary transition-colors hover:bg-accent-light/50"
          >
            Log out
          </button>
        </form>
      </div>
    </aside>
  );
}
