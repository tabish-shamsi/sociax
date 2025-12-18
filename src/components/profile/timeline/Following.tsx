import { ChevronDown, CircleMinus, HeartMinus, UserStar } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { pagesSuggestion } from "@/lib/page-suggestion";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import CustomAvatarFallback from "@/components/global/CustomAvatarFallback";
import { user } from "@/lib/user";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Following() {
  return (
    <Card className="gap-2 pb-2">
      <CardHeader>
        <CardTitle>Favourite Pages</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        {user.friends.map((page) => (
          <div
            key={page.name}
            className="flex items-center justify-between w-full text-sm border-t p-4"
          >
            <Link
              href={`/pages/${page.name}`}
              className="flex items-center justify-center gap-2 "
            >
              <Avatar>
                <AvatarImage src={page.avatar} />
                <CustomAvatarFallback name={page.name} />
              </Avatar>

              <div className="flex flex-col">
                <h3 className="font-medium text-card-foreground">
                  {page.name}
                </h3>
                <p className="text-sm text-muted-foreground">@{page.username}</p>
              </div>
            </Link>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline">
                  Following <ChevronDown />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem><HeartMinus /> Unfollow</DropdownMenuItem>
                <DropdownMenuItem><CircleMinus /> Block</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
