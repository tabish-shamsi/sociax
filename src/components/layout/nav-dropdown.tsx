"use client"

import { navItems } from "@/lib/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { LayoutGrid } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import Link from "next/link";

export default function NavMenuDrop() {
  const pathname = usePathname()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer bg-primary h-full pr-4 lg:hidden">
        <LayoutGrid className="text-white" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-0 ml-4 lg:hidden">
        <Card className="w-80 border-none shadow-none">
          <CardHeader>
            <CardTitle>Navigation Menu</CardTitle>
          </CardHeader>

          <CardContent className="grid grid-cols-3 gap-4 py-2">
            {navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn("flex flex-col items-center gap-2 hover:text-primary transition-colors", isActive ? "text-primary": "")}
                >
                  <item.icon className="h-6 w-6" />
                  <span className="text-xs text-center">{item.name}</span>
                </Link>
              );
            })}
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
