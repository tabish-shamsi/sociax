import FriendsGrid from "@/components/friends/friends-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { getFriends, isRequestSent } from "@/data/friends";
import { getUserBasicInfo } from "@/data/user";
import { Search } from "lucide-react";

export default async function page({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const [user, friends] = await Promise.all([
    getUserBasicInfo(username)(),
    getFriends(username)(),
    isRequestSent(username)(),
  ]);

  return (
    <main id="Friends_Page" className="flex flex-col gap-8 w-full">
      <Card className="w-full">
        <CardContent className="flex flex-col sm:flex-row gap-2 items-center justify-between w-full">
          <CardTitle className="text-lg">
            {/* {user.name.split(" ")[0]}'s Friends {`(${user.friends.length})`} */}
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
      <FriendsGrid friends={friends} />
    </main>
  );
}
