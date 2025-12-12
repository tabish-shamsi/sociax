"use client";

import CustomAvatarFallback from "@/components/global/CustomAvatarFallback";
import ProfileLink from "@/components/profile/ProfileLink";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { profileLinks } from "@/lib/profileNavLinks";
import { user } from "@/lib/user";
import {
  Camera,
  MapPin,
  MessageSquareText,
  Settings2,
  UserPlus2,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "../ui/button";

export default function ProfileHeader() {
  const [avatar, setAvatar] = useState(user.avatar || "");
  const [cover, setCover] = useState(user.cover || "");
  const [isFriendRequestSend, setIsFriendRequestSend] = useState(false);

  return (
    <Card className="gap-0 p-0 overflow-hidden w-full mb-8">
      <CardContent className="w-full p-0 relative">
        {/* COVER IMAGE */}
        <div className="w-full h-48 md:h-[230px] lg:h-[307px] xl:h-96">
          <Image
            height={192}
            width={192 * 3}
            src={user.cover}
            alt={user.name + "Cover"}
            className="w-full h-full object-cover"
          />
        </div>

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

              <button className="flex items-center justify-center h-12 w-12 bg-amber-500 text-white rounded-full cursor-pointer transition-colors hover:bg-amber-400">
                <Settings2 className="md:h-5 md:w-5" />
              </button>
            </div>
          </div>

          {/* AVATAR IMAGE */}
          <div className="absolute bottom-[154px] md:bottom-[74px] lg:bottom-[94px] xl:bottom-[104px] left-1/2 -translate-x-1/2 xl:h-56 lg:h-[179px] md:h-[134px] sm:h-28 h-[84px] xl:w-56 lg:w-[179px] md:w-[134px] sm:w-28 w-[84px] bg-card rounded-full p-1 overflow-hidden" >
            <Avatar className="w-full h-full">
              <AvatarImage src={user.avatar} />
              <CustomAvatarFallback name={user.name} />
            </Avatar>
          </div>

          {/* PROFILE LINKS FIRST HALF */}

          {profileLinks.slice(0, 2).map(({ name, href }) => (
            <Link
              href={href}
              className="hidden md:block text-gray-500 dark:text-gray-400 xl:text-xl lg:text-lg md:text-base font-medium transition-colors hover:text-card-foreground"
              key={name}
            >
              {name}
            </Link>
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

            <div className="flex items-center justify-center gap-3 mt-3 md:hidden">
              <Button size={"sm"} className="text-xs">
                <UserPlus2 /> Add Friend
              </Button>
              <Button size={"sm"} className="text-xs" variant="secondary">
                Message
              </Button>
            </div>
          </div>

          {/* PROFILE LINKS OTHER HALF */}

          {profileLinks.slice(2, 4).map(({ name, href }) => (
            <Link
              href={href}
              className="hidden md:block text-gray-500 dark:text-gray-400 xl:text-xl lg:text-lg md:text-base font-medium transition-colors hover:text-card-foreground"
              key={name}
            >
              {name}
            </Link>
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
