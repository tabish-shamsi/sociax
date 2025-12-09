"use client";

import { navItems } from "@/lib/navigation";
import { usePathname } from "next/navigation";

export default function PageTitle() {
  const pathname = usePathname();
  const title = navItems.filter((item) => {
    if (item.href === "/" ? pathname === "/" : pathname.startsWith(item.href)) {
      return item.name;
    }
  })[0].name  

  return (
    <h2 className="text-lg font-semibold text-gray-100 px-4 lg:px-8 hidden md:block">
      {title} Page
    </h2>
  );
}
