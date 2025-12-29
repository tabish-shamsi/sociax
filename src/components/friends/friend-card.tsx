import Image from "next/image";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";
import CustomAvatarFallback from "../global/CustomAvatarFallback";
import { User } from "@/models/User";
import { Button } from "../ui/button";
import { Ellipsis, MessageSquareText } from "lucide-react";
import FriendButtons from "./friend-buttons";
import { isRequestSent } from "@/data/friends";
import { Friend } from "@/models/Friend";

export default async function FriendCard({
  avatar,
  cover,
  firstName,
  lastName,
  username,
}: User) {
  const pendingFriendRequest = (await isRequestSent(username)()) as Friend;

  return (
    <Card className="gap-0 p-0 w-full overflow-hidden rounded-md">
      <CardHeader className="relative">
        <div className="absolute top-0 left-0 h-30 w-full flex">
          {cover ? (
            <Image
              height={96}
              width={96 * 3}
              src={cover?.url}
              alt={"Freinds Cover"}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex justify-center pt-14 bg-gray-200">
              <p className="text-sm font-medium text-muted-foreground">
                No Cover Image Uploaded
              </p>
            </div>
          )}
        </div>

        <div className="absolute top-19 left-1/2 -translate-x-1/2 flex w-20 h-20 bg-card p-0.5 rounded-full overflow-hidden">
          <Avatar className="w-full h-full object-cover">
            <AvatarImage src={avatar?.url} />
            <CustomAvatarFallback name={`${firstName} ${lastName}`} />
          </Avatar>
        </div>
      </CardHeader>

      <CardContent className="pt-38 pb-6">
        <div className="flex flex-col gap-4 items-center justify-center">
          <div className="flex flex-col w-full text-center">
            <h3 className="text-lg font-medium text-card-foreground -mb-1">
              {`${firstName} ${lastName}`}
            </h3>
            <p className="text-sm text-muted-foreground">{username}</p>
          </div>

          <div className="flex items-center justify-center gap-3 mt-3">
            <FriendButtons
              size="sm"
              pendingFriendRequest={pendingFriendRequest}
            />

            <Button size={"sm"} className="text-xs" variant="secondary">
              <MessageSquareText /> Message
            </Button>
            <Button variant="ghost" size="icon-sm">
              <Ellipsis />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
