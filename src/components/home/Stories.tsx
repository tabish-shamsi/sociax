import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { stories as storiesData } from "@/lib/stories";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import Link from "next/link";
export default function Stories() {
  const sortedStories = [...storiesData].sort((a, b) => {
    const aHasUnwatched = a.stories.some((s) => !s.isWatched);
    const bHasUnwatched = b.stories.some((s) => !s.isWatched);

    // If both same, keep original order
    if (aHasUnwatched === bHasUnwatched) return 0;

    // Users with unwatched stories come first
    return aHasUnwatched ? -1 : 1;
  });
  return (
    <Card className="lg:hidden">
      <CardContent>
        <Carousel className="w-full">
          <CarouselContent>
            <CarouselItem className="flex items-center justify-center cursor-pointer basis-1/5 h-20">
              <Link
                href="/stories/create"
                className="flex justify-center cursor-pointer relative"
              >
                <Avatar className="w-16 h-16 ring-2 ring-offset-2 rounded-full ring-gray-300 dark:ring-gray-700 ring-offset-gray-50 dark:ring-offset-gray-900">
                  <AvatarImage
                    src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png"
                    alt="Kuch bhi"
                  />
                  <AvatarFallback>TA</AvatarFallback>
                </Avatar>

                <span className="absolute -bottom-1 right-1.5 w-6 h-6 rounded-full flex items-center justify-center bg-muted-foreground">
                  <Plus size={15} className="text-muted" />
                </span>
              </Link>
            </CarouselItem>

            {sortedStories.map(({ user, stories }) => {
              const hasUnwatched = stories.some((s) => !s.isWatched);
              const initials = user.name
                .split(" ")
                .map((n) => n[0])
                .join("");

              return (
                <CarouselItem
                  key={user._id}
                  className="flex items-center justify-center cursor-pointer basis-1/5 h-20"
                >
                  <Avatar
                    className={cn(
                      "w-16 h-16 ring-2 ring-offset-2 rounded-full",
                      hasUnwatched
                        ? "ring-blue-500 ring-offset-gray-50 dark:ring-offset-gray-900"
                        : "ring-gray-300 dark:ring-gray-700"
                    )}
                  >
                    <AvatarImage src={user.profileImageUrl} alt={user.name} />
                    <AvatarFallback>{initials}</AvatarFallback>
                  </Avatar>
                </CarouselItem>
              );
            })}
          </CarouselContent>
        </Carousel>
      </CardContent>
    </Card>
  );
}
