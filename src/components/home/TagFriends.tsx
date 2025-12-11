"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CircleMinus, UserPlus } from "lucide-react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Link from "next/link";

interface TaggedFriend {
  name: string;
  username: string;
}

interface TagFriendsProps {
  taggedFriends: TaggedFriend[];
  setTaggedFreinds: Function;
}

export default function TagFriends({
  taggedFriends,
  setTaggedFreinds,
}: TagFriendsProps) {
  const [open, setOpen] = useState<boolean>(false);

  const handleTagging = (clickedFriend: { name: string; username: string }) => {
    const isTagged = taggedFriends.some(
      ({ username }) => username === clickedFriend.username
    );
    let newTaggedFriends;
    if (isTagged) {
      newTaggedFriends = taggedFriends.filter(
        ({ username }) => username !== clickedFriend.username
      );
    } else {
      newTaggedFriends = [
        ...taggedFriends,
        { name: clickedFriend.name, username: clickedFriend.username },
      ];
    }

    setTaggedFreinds(newTaggedFriends);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <Tooltip>
        <TooltipTrigger asChild>
          <PopoverTrigger className="text-blue-600 h-12 w-12 rounded-xl transition-colors hover:bg-secondary flex items-center justify-center cursor-pointer">
            <UserPlus />
          </PopoverTrigger>
        </TooltipTrigger>
        <TooltipContent>Tag Friends</TooltipContent>
      </Tooltip>
      <PopoverContent
        className="border-input w-full min-w-[var(--radix-popper-anchor-width)] p-0"
        align="start"
      >
        <Command className="w-64">
          <CommandInput placeholder="Search Your friends" />
          <CommandList>
            <CommandEmpty>No Friends Found</CommandEmpty>
            <CommandGroup>
              {Friends.map((friend) => (
                <CommandItem
                  key={friend.name}
                  value={friend.username}
                  onSelect={() => handleTagging(friend)}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-2">
                      <Avatar>
                        <AvatarImage src={friend.avatar} />
                        <AvatarFallback>
                          {friend.name.split(" ")[0].charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <h3 className="font-semibold">{friend.name}</h3>
                    </div>

                    {taggedFriends.some(({ username }) => {
                      return username === friend.username;
                    }) && <CircleMinus className="text-red-400" />}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

export function TaggedFriends({
  taggedFriends,
}: {
  taggedFriends: TaggedFriend[];
}) {
  if (taggedFriends.length > 0)
    return (
      <div className="text-sm flex flex-wrap gap-1 font-semibold">
        {taggedFriends.map(({ name, username }) => (
          <Link
            key={username}
            className="text-primary font-semibold hover:underline"
            href={`/profile/${username}`}
          >
            {name}
          </Link>
        ))}
      </div>
    );
}

var Friends = [
  {
    name: "Emily Carter",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&w=200&q=60",
    username: "emilycarter",
    friendsInCommon: 8,
  },
  {
    name: "Michael Turner",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&w=200&q=60",
    username: "michaelturner",
    friendsInCommon: 3,
  },
  {
    name: "Sophia Reyes",
    avatar:
      "https://images.unsplash.com/photo-1520813792240-56fc4a3765a7?auto=format&w=200&q=60",
    username: "sophiareyes",
    friendsInCommon: 5,
  },
  {
    name: "Daniel Brooks",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&w=200&q=60",
    username: "danielbrooks",
    friendsInCommon: 12,
  },
  {
    name: "Ava Mitchell",
    avatar:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&w=200&q=60",
    username: "avamitchell",
    friendsInCommon: 2,
  },
  {
    name: "Lucas Bennett",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&w=200&q=60",
    username: "lucasbennett",
    friendsInCommon: 9,
  },
  {
    name: "Chloe Hart",
    avatar:
      "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&w=200&q=60",
    username: "chloehart",
    friendsInCommon: 4,
  },
  {
    name: "Ethan Price",
    avatar:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&w=200&q=60",
    username: "ethanprice",
    friendsInCommon: 7,
  },
  {
    name: "Isabella Flores",
    avatar:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&w=200&q=60",
    username: "isabellaflores",
    friendsInCommon: 6,
  },
  {
    name: "Oliver Hayes",
    avatar:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&w=200&q=60",
    username: "oliverhayes",
    friendsInCommon: 11,
  },
];
