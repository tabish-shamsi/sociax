import { UserPlus, UserStar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import User from "./User";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { friendsSuggestion } from "@/lib/friends-suggestion";

export default function FriendsSuggestion() {
  return (
    <Card className="gap-2 pb-2">
      <CardHeader>
        <CardTitle>Friends Suggestion</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {friendsSuggestion.map((friend) => (
          <div
            key={friend.name}
            className="flex items-center justify-between w-full text-sm border-t p-4"
          >
            <Link href={`/pages/${friend.name}`}>
              <User
                title={friend.name}
                subtitle={`${friend.friendsInCommon} friends in common`}
                avatarSrc={friend.avatar}
                size="10"
              />
            </Link>

            <Tooltip>
              <TooltipTrigger>
                <UserPlus
                  size={25}
                  className="transition-colors hover:text-primary cursor-pointer"
                />
              </TooltipTrigger>
              <TooltipContent side="top">Add Friend</TooltipContent>
            </Tooltip>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
