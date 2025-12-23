"use client"

import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ProfileLinkProps {
    href: string;
    name: string;
    mobile?: boolean;
}

export default function ProfileLink({ href: link, name, mobile }: ProfileLinkProps) {
    const user = useSession().data?.user
    const pathname = usePathname();
    const href = `/${user.username}${link}`;
    const isActive = pathname === href;

    return (
        <Link
            href={href}
            className={cn(
                "xl:text-xl lg:text-lg md:text-base text-sm font-medium transition-colors hover:text-card-foreground",
                isActive ? "text-card-foreground" : "text-gray-500 dark:text-gray-400",
                mobile ? "block md:hidden" : "hidden md:block "
            )}
            key={name}
        >
            {name}
        </Link>
    );
}
