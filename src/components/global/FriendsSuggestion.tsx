import { UserPlus, UserStar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import User from "./User";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

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

var friendsSuggestion = [
  {
    name: "Emily Carter",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&w=200&q=60",
    username: "@emilycarter",
    friendsInCommon: 8,
  },
  {
    name: "Michael Turner",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&w=200&q=60",
    username: "@michaelturner",
    friendsInCommon: 3,
  },
  {
    name: "Sophia Reyes",
    avatar:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&w=200&q=60",
    username: "@sophiareyes",
    friendsInCommon: 5,
  },
  {
    name: "Daniel Brooks",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&w=200&q=60",
    username: "@danielbrooks",
    friendsInCommon: 12,
  },
  {
    name: "Ava Mitchell",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&w=200&q=60",
    username: "@avamitchell",
    friendsInCommon: 2,
  },
  {
    name: "Lucas Bennett",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&w=200&q=60",
    username: "@lucasbennett",
    friendsInCommon: 9,
  },
  {
    name: "Chloe Hart",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&w=200&q=60",
    username: "@chloehart",
    friendsInCommon: 4,
  },
  {
    name: "Ethan Price",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=200&q=60",
    username: "@ethanprice",
    friendsInCommon: 7,
  },
  {
    name: "Isabella Flores",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&w=200&q=60",
    username: "@isabellaflores",
    friendsInCommon: 6,
  },
  {
    name: "Oliver Hayes",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&w=200&q=60",
    username: "@oliverhayes",
    friendsInCommon: 11,
  },
];
