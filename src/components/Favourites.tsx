import { pagesSuggestion } from "@/lib/page-suggestion";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Separator } from "./ui/separator";
import { Avatar, AvatarImage } from "./ui/avatar";
import CustomAvatarFallback from "./global/CustomAvatarFallback";
import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "./ui/tooltip";

export default function Favourites() {
  return (
    <Card className="gap-0 p-0">
      <CardContent className="px-0">
        <CardHeader className="gap-0 p-6">
          <CardTitle>Your Fav Pages (56)</CardTitle>
        </CardHeader>

        <Separator />

        <div className="flex flex-wrap items-center justify-center gap-4 w-full p-6 ">
          {pagesSuggestion.map(({ avatar, name, username }) => (
            <Tooltip key={username}>
              <TooltipTrigger>
                <Link href={`/${username}`}>
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={avatar} />
                    <CustomAvatarFallback name={name} />
                  </Avatar>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                View {name.split(" ")[0]}'s Profile
              </TooltipContent>
            </Tooltip>
          ))}

          <Tooltip>
            <TooltipTrigger>
              <Link
                href={`/`}
                className="flex items-center justify-center w-10 h-10 rounded-full bg-primary"
              >
                40+
              </Link>
            </TooltipTrigger>
            <TooltipContent>See All</TooltipContent>
          </Tooltip>
        </div>
      </CardContent>
    </Card>
  );
}
