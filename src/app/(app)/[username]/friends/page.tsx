import CustomAvatarFallback from "@/components/global/CustomAvatarFallback";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { friends, user } from "@/lib/user";
import { MessageSquareText, Search, UserMinus, UserMinus2 } from "lucide-react";
import Image from "next/image";

export default function page() {
  return (
    <main id="Friends_Page" className="flex flex-col gap-8 w-full">
      <Card className="w-full">
        <CardContent className="flex flex-col sm:flex-row gap-2 items-center justify-between w-full">
          <CardTitle className="text-lg">
            {user.name.split(" ")[0]}'s Friends {`(${user.friends.length})`}
          </CardTitle>
          <div className="h-10 flex border border-border w-80 rounded-md overflow-hidden">
            <input
              type="text"
              placeholder="Search Friends..."
              className="border-none outline-none h-full w-full px-4"
            />
            <Button
              size="icon-sm"
              variant="secondary"
              className="h-10 w-10 flex items-center justify-center rounded-none bg-border"
            >
              <Search />
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
        {friends.map(
          ({
            avatar,
            name,
            cover, 
            birthplace,
            friendsCount,
            postsCount,
            followingCount,
          }) => (
            <Card
              key={name}
              className="gap-0 p-0 w-full overflow-hidden rounded-md"
            >
              <CardHeader className="relative">
                <div className="absolute top-0 left-0 h-30 w-full flex">
                  <Image
                    height={96}
                    width={96 * 3}
                    src={cover}
                    alt={name + "Cover"}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="absolute top-19 left-1/2 -translate-x-1/2 flex w-20 h-20 bg-card p-0.5 rounded-full overflow-hidden">
                  <Avatar className="w-full h-full object-cover">
                    <AvatarImage src={avatar} />
                    <CustomAvatarFallback name={name} />
                  </Avatar>
                </div>
              </CardHeader>

              <CardContent className="pt-38 pb-6">
                <div className="flex flex-col gap-4 items-center justify-center">
                  <div className="flex flex-col w-full text-center">
                    <h3 className="text-lg font-medium text-card-foreground -mb-1">
                      {name}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {birthplace}
                    </p>
                  </div>

                  <div className="flex items-center justify-center gap-8 w-full">
                    <div className="flex flex-col items-center justify-center">
                      <h4 className="text-base text-card-foreground font-bold">
                        {friendsCount}
                      </h4>
                      <p className="text-sm text-muted-foreground">Friends</p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <h4 className="text-base text-card-foreground font-bold">
                        {followingCount}
                      </h4>
                      <p className="text-sm text-muted-foreground">Following</p>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                      <h4 className="text-base text-card-foreground font-bold">
                        {postsCount}
                      </h4>
                      <p className="text-sm text-muted-foreground">Posts</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-center gap-6">
                    <button className="flex items-center justify-center h-12 w-12 bg-gray-500 text-white rounded-full cursor-pointer transition-colors hover:bg-gray-400">
                      <UserMinus className="md:h-5 md:w-5" />
                    </button>

                    <button className="flex items-center justify-center h-12 w-12 bg-violet-600 text-white rounded-full cursor-pointer transition-colors hover:bg-purple-500">
                      <MessageSquareText className="md:h-5 md:w-5" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        )}
      </div>
    </main>
  );
}
