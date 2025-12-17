import CustomAvatarFallback from "@/components/global/CustomAvatarFallback";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { user } from "@/lib/user";
import Link from "next/link";

export default function Friends() {
  return (
    <Card className="p-0 gap-0">
      <CardHeader className="gap-0 p-6">
        <CardTitle>Friends</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-6">
        <div className="flex flex-wrap items-center justify-center gap-4">
          {user.friends.map(({ avatar, name, username }) => (
            <Tooltip key={name}>
              <TooltipTrigger>
                <Link href={`/${username}`}>
                  <Avatar className="h-12 w-12">
                    <AvatarImage  src={avatar} alt={name} />
                    <CustomAvatarFallback name={name} />
                  </Avatar>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <div className="flex items-center gap-1.5">
                  <Avatar className="h-16 w-16">
                    <AvatarImage
                      src={avatar}
                      alt={name}
                    />
                    <CustomAvatarFallback name={name} />
                  </Avatar>
                  <div className="flex flex-col">
                    <h3 className="text-sm text-secondary  font-medium">{name}</h3>
                    <p className="text-sm text-muted">@{username}</p>
                  </div>
                </div>
              </TooltipContent>
            </Tooltip>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
