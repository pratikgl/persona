"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/app/home", label: "Home", icon: "⌂" },
  { href: "/app/people/new", label: "Add", icon: "+" },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-surface/80 backdrop-blur-lg safe-bottom md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center gap-0.5 px-4 py-1 text-xs transition-colors",
              item.href === "/app/people/new"
                ? "text-accent"
                : pathname === item.href
                  ? "text-foreground"
                  : "text-text-secondary"
            )}
          >
            <span className={cn("text-xl", item.href === "/app/people/new" && "flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-lg")}>
              {item.icon}
            </span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
