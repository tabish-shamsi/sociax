"use client";

import { useState } from "react";
import { stories as storiesData } from "@/lib/stories";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Plus } from "lucide-react";

export function StoriesSidebar() {
  const [openStoryId, setOpenStoryId] = useState<string | null>(null);

  const handleClick = (userId: string) => {
    setOpenStoryId(userId);
    console.log("Open story for user:", userId);
  };

  const sortedStories = [...storiesData].sort((a, b) => {
    const aHasUnwatched = a.stories.some((s) => !s.isWatched);
    const bHasUnwatched = b.stories.some((s) => !s.isWatched);

    // If both same, keep original order
    if (aHasUnwatched === bHasUnwatched) return 0;

    // Users with unwatched stories come first
    return aHasUnwatched ? -1 : 1;
  });

  return (
    <aside className="fixed top-16 right-0 hidden lg:flex flex-col w-20 py-4 bg-card border-l h-screen">
      <div className="flex flex-col gap-4 px-2">
        <Link
          href="/stories/create"
          className="flex justify-center cursor-pointer relative"
        >
          <Avatar className="w-10 h-10 ring-2 ring-offset-2 rounded-full ring-gray-300 dark:ring-gray-700 ring-offset-gray-50 dark:ring-offset-gray-900">
            <AvatarImage
              src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png"
              alt="Kuch bhi"
            />
            <AvatarFallback>TA</AvatarFallback>
          </Avatar>

          <span className="absolute -bottom-1 right-1.5 w-4 h-4 rounded-full flex items-center justify-center bg-white">
            <Plus />
          </span>
        </Link>

        {sortedStories.map(({ user, stories }) => {
          const hasUnwatched = stories.some((s) => !s.isWatched);
          const initials = user.name
            .split(" ")
            .map((n) => n[0])
            .join("");

          return (
            <div
              key={user._id}
              className="flex justify-center cursor-pointer"
              onClick={() => handleClick(user._id)}
            >
              <Avatar
                className={cn(
                  "w-10 h-10 ring-2 ring-offset-2 rounded-full",
                  hasUnwatched
                    ? "ring-blue-500 ring-offset-gray-50 dark:ring-offset-gray-900"
                    : "ring-gray-300 dark:ring-gray-700"
                )}
              >
                <AvatarImage src={user.profileImageUrl} alt={user.name} />
                <AvatarFallback>{initials}</AvatarFallback>
              </Avatar>
            </div>
          );
        })}
      </div>
    </aside>
  );
}
