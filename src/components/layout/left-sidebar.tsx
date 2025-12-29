"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { navItems } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export function LeftSidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const { username } = session?.user || {};

  return (
    <aside className="fixed top-16 left-0 hidden lg:flex flex-col items-center w-20 py-4 bg-card border-r h-screen">
      {navItems.map((item) => {
        const isActive =
          item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

        return (
          <Tooltip key={item.name}>
            <TooltipTrigger asChild>
              <Link
                href={item.href === "/profile" ? `/${username}` : item.href}
                className={cn(
                  "flex items-center justify-center w-12 h-12 mb-4 rounded-lg transition-colors hover:bg-secondary",
                  isActive
                    ? "bg-secondary text-primary"
                    : "text-card-foreground",
                )}
              >
                <item.icon className="w-6 h-6" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
              <span>{item.name}</span>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </aside>
  );
}
