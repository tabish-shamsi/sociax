"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useThemeToggle } from "@/hooks/useThemeToggle";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { User, Settings, Moon, Sun, LogOut } from "lucide-react";

export default function UserDropdown() {
  const user = {
    name: "Tabish Ali Shamsi",
    role: "Web Developer",
    email: "tabish@example.com",
    avatar: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png",
  };

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  const { theme, toggleTheme } = useThemeToggle();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div className="flex items-center gap-2">
          <Avatar className="w-10 h-10">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="hidden md:flex flex-col">
            <span className="text-gray-200 font-semibold">{user.name}</span>
            <span className="text-gray-400 text-xs">{user.role}</span>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" className="w-56 mr-4">
        {/* User section */}
        <DropdownMenuLabel className="flex items-center gap-2">
          <Avatar>
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <span className="font-medium">{user.name}</span>
            <span className="text-xs text-muted-foreground">{user.email}</span>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Links */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link className="flex items-center gap-2" href="/profile">
              <User className="h-4 w-4" />
              Profile
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link className="flex items-center gap-2" href="/settings">
              <Settings className="h-4 w-4" />
              Settings
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>

        <DropdownMenuSeparator />

        {/* Dark Mode Toggle */}
        <DropdownMenuItem onClick={toggleTheme} className="flex items-center gap-2 cursor-pointer">
          {theme === "dark" ? (
            <>
              <Sun className="h-4 w-4" />
              Light Mode
            </>
          ) : (
            <>
              <Moon className="h-4 w-4" />
              Dark Mode
            </>
          )}
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        {/* Logout */}
        <DropdownMenuItem
          asChild
          className="text-red-600 flex items-center gap-2 cursor-pointer"
        >
          <Link href="/logout">
            <LogOut className="h-4 w-4" />
            Sign Out
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
