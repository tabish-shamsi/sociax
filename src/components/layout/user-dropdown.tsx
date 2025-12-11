"use client";

import Link from "next/link";
import { useThemeToggle } from "@/hooks/useThemeToggle";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuGroup,
} from "@/components/ui/dropdown-menu";

import { UserIcon, Settings, Moon, Sun, LogOut } from "lucide-react";
import User from "../global/User";
import { user } from "@/lib/user";
import { Avatar, AvatarImage } from "../ui/avatar";
import CustomAvatarFallback from "../global/CustomAvatarFallback";

export default function UserDropdown() {
  const { theme, toggleTheme } = useThemeToggle();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <div>
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarImage src={""} alt={user.name} />
              <CustomAvatarFallback name={user.name} />
            </Avatar>

            <div className="hidden lg:flex flex-col">
              <h3 className="font-semibold text-white">
                {user.name}
              </h3>
              <span className="text-gray-300 text-sm">@{user.username}</span>
            </div>
          </div>
        </div>
      </DropdownMenuTrigger>

      <DropdownMenuContent side="bottom" className="w-56 mr-4 mt-6">
        {/* User section */}
        <DropdownMenuLabel className="flex items-center gap-2">
          <User
            title={user.name}
            subtitle={`@${user.username}`}
            avatarSrc={user.avatar}
            size="8"
          />
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* Links */}
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link className="flex items-center gap-2" href="/profile">
              <UserIcon className="h-4 w-4" />
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
        <DropdownMenuItem
          onClick={toggleTheme}
          className="flex items-center gap-2 cursor-pointer"
        >
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
