import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import { Suggestion } from "@/types/Suggestion";
import { Avatar, AvatarImage } from "../ui/avatar";
import CustomAvatarFallback from "../global/CustomAvatarFallback";
import { Button } from "@/components/ui/button";

interface SuggestionProps {
  type: "friends" | "pages";
  accounts: Suggestion[];
}

export function SuggestionsSlider({ type, accounts }: SuggestionProps) {
  return (
    <div className="border p-8 rounded-xl w-full">
      <Carousel className="w-full">
        <CarouselContent>
          {accounts.map((account) => (
            <CarouselItem
              key={account.username}
              className="basis-full md:basis-1/2"
            >
              <Card className="p-6 gap-0 flex flex-col items-center text-center">
                <Avatar className="w-20 h-20 mb-4">
                  <AvatarImage src={account.avatar} />
                  <CustomAvatarFallback name={account.name} />
                </Avatar>

                <CardContent className="flex flex-col items-center space-y-1 not-first:">
                  <h3 className="font-semibold text-lg">{account.name}</h3>
                  <p className="text-sm text-gray-500">@{account.username}</p>

                  {type === "pages" && (
                    <p className="text-xs text-gray-400">
                      {account.pageType ?? "Page"}
                    </p>
                  )}

                  {account.friendsInCommon && (
                    <p className="text-xs text-gray-500">
                      {account.friendsInCommon} friends in common
                    </p>
                  )}

                  <div className="flex items-center gap-3 mt-4">
                    <Button className="px-4">
                      {type === "friends" ? "Add Friend" : "Follow"}
                    </Button>

                    <Button variant="secondary" className="px-4">
                      Remove
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
