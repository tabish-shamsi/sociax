"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { profileLinks } from "@/lib/profileNavLinks";
import { user } from "@/lib/user";
import {
  Camera,
  CircleMinus,
  Ellipsis,
  Link2,
  MapPin,
  MessageSquareText,
  Settings2,
  UserPlus2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import HandleAvatar from "./HandleAvatar";
import HandleCover from "./HandleCover";

export default function ProfileHeader() {
  return (
    <Card className="gap-0 p-0 overflow-hidden w-full mb-8">
      <CardContent className="w-full p-0 relative">
        {/* COVER IMAGE */}
        <HandleCover />

        <div className="flex flex-col md:flex-row lg:flex items-center justify-center lg:gap-16 md:gap-8  md:py-6 xl:gap-20 lg:px-8 lg:py-10 relative p-4">
          {/* ACTION BUTTONS FOR LARGE AND MEDIUM DEVICES */}
          <div className="absolute md:bottom-[74px] lg:bottom-[104px] xl:bottom-28 md:right-4 hidden md:block">
            <div className="flex items-center justify-center gap-3">
              <button className="flex items-center justify-center md:h-12 md:w-12 bg-cyan-500 text-white rounded-full cursor-pointer transition-colors hover:bg-cyan-400">
                <UserPlus2 className="md:h-5 md:w-5" />
              </button>

              <button className="flex items-center justify-center h-12 w-12 bg-violet-600 text-white rounded-full cursor-pointer transition-colors hover:bg-purple-500">
                <MessageSquareText className="md:h-5 md:w-5" />
              </button>

              <ActionDropdown>
                <button className="flex items-center justify-center h-12 w-12 bg-amber-500 text-white rounded-full cursor-pointer transition-colors hover:bg-amber-400">
                  <Settings2 className="md:h-5 md:w-5" />
                </button>
              </ActionDropdown>
            </div>
          </div>

          {/* AVATAR IMAGE */}
          <HandleAvatar />

          {/* PROFILE LINKS FIRST HALF */}

          {profileLinks.slice(0, 2).map(({ name, href }) => (
            <ProfileLink name={name} href={href} key={name} />
          ))}

          {/* BASIC INFO LIKE NAME, LOCATION OR TYPE OF PAGE */}

          <div className="flex flex-col items-center justify-center">
            <div className="flex flex-col items-center justify-center">
              <h3 className="xl:text-2xl lg:text-xl  text-lg  font-bold text-card-foreground">
                {user.name}
              </h3>
              <p className="text-gray-500 xl:text-base lg:text-sm text-xs dark:text-gray-400 flex items-center justify-center gap-1">
                <MapPin className="h-3 md:h-4.5 w-3 md:w-4.5 " />
                {/* TODO: check if it's page then show user.pageType */}
                <span>{user.location}</span>
              </p>
            </div>

            {/* ACTION BUTTONS FOR SMALL DEVICES */}
            <div className="flex items-center justify-center gap-3 mt-3 md:hidden">
              <Button size={"sm"} className="text-xs">
                <UserPlus2 /> Add Friend
              </Button>
              <Button size={"sm"} className="text-xs" variant="secondary">
                Message
              </Button>

              <ActionDropdown>
                <Button variant="ghost" size="icon-sm">
                  <Ellipsis />
                </Button>
              </ActionDropdown>
            </div>
          </div>

          {/* PROFILE LINKS OTHER HALF */}

          {profileLinks.slice(2, 4).map(({ name, href }) => (
            <ProfileLink name={name} href={href} key={name} />
          ))}

          {/* PROFILE LINKS NAV FOR SMALLER DEVICES */}

          <Separator className="my-4 md:hidden" />
          {/* Profile Links for smaller devices */}
          <div className="flex items-center justify-center gap-6 md:hidden">
            {profileLinks.map(({ name, href }) => (
              <ProfileLink name={name} href={href} key={name} mobile={true} />
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function ActionDropdown({ children }: { children: React.ReactNode }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <DropdownMenuItem>
          <Link2 /> Copy Profile Link
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500 hover:text-red-600!">
          <CircleMinus className="text-red-500 hover:text-red-600" /> Block
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

interface ProfileLinkProps {
  href: string;
  name: string;
  mobile?: boolean;
}

function ProfileLink({ href: link, name, mobile }: ProfileLinkProps) {
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
