"use client";

import { Ellipsis, MessageSquareText, Settings2 } from "lucide-react";
import { Button } from "../ui/button";
import { Friend } from "@/models/Friend";
import FriendButtons from "../friends/friend-buttons";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";

export default function ActionButtons({
  size,
  pendingFriendRequest,
}: {
  size: "sm" | "lg";
  pendingFriendRequest?: Friend;
}) {
  const { username } = useParams();
  const { data: currentUser } = useSession();

  const isOwnProfile = username === currentUser?.user.username ? true : false;

  if (isOwnProfile) return null;

  if (size === "lg") {
    return (
      <div className="absolute md:bottom-[74px] lg:bottom-[104px] xl:bottom-28 md:right-4 hidden md:block">
        <div className="flex items-center justify-center gap-3">
          <FriendButtons
            size="lg"
            pendingFriendRequest={pendingFriendRequest}
          />

          <button className="flex items-center justify-center h-12 w-12 bg-amber-500 text-white rounded-full cursor-pointer transition-colors hover:bg-amber-400">
            <Settings2 className="md:h-5 md:w-5" />
          </button>
        </div>
      </div>
    );
  }

  if (size === "sm")
    return (
      <div className="flex items-center justify-center gap-3 mt-3 md:hidden">
        <FriendButtons size="sm" pendingFriendRequest={pendingFriendRequest} />

        <Button size={"sm"} className="text-xs" variant="secondary">
          <MessageSquareText /> Message
        </Button>
        <Button variant="ghost" size="icon-sm">
          <Ellipsis />
        </Button>
      </div>
    );
}
