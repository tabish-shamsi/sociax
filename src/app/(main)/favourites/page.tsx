import Favourites from "@/components/Favourites";
import FriendsSuggestion from "@/components/global/FriendsSuggestion";
import PagesSuggestion from "@/components/global/PagesSuggestion";
import PostCard from "@/components/global/PostCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { posts } from "@/lib/posts";
import { Star } from "lucide-react";

export default function FavPagesFeed() {
  /* ---------------------------- Renderers ---------------------------- */

  function CreatePageCard() {
    return (
      <div className="w-full h-56 bg-primary p-6 flex flex-col justify-center items-start rounded-md shadow-sm">
        <span className="text-sm text-white">Be like them and</span>
        <h2 className="text-2xl font-medium text-white mb-6">
          Start Your Own Favourite Page
        </h2>
        <Button variant="secondary">Start Now!</Button>
      </div>
    );
  }

  function FeedHeader() {
    return (
      <Card className="flex flex-row items-center justify-center h-20 overflow-hidden p-0 gap-0">
        <span className="h-20 w-20 flex items-center justify-center bg-gray-400 text-white">
          <Star />
        </span>
        <p className="flex-1 pl-6 text-muted-foreground">
          Here you'll see the latest updates from your favourite pages
        </p>
      </Card>
    );
  }

  function Feed() {
    return posts.map((post) => <PostCard key={post._id} post={post} />)
  }

  /* ---------------------------- Render ---------------------------- */
  return (
    <div className="mt-16 lg:mx-20 lg:p-8 lg:w-auto md:w-xl p-6 mx-auto">
      <section id="Home_Page" className="flex gap-4 lg:gap-8 w-full">
        <aside className="hidden lg:flex flex-col gap-8 xl:w-1/4 lg:w-[30%] ">
          <FriendsSuggestion />
          <PagesSuggestion />
        </aside>

        <main className="w-full lg:w-[70%] xl:w-1/2 flex flex-col gap-6 lg:gap-8">
          <FeedHeader />
          <Feed />
        </main>

        <aside className="hidden xl:flex flex-col gap-8 w-1/4">
          <CreatePageCard />
          <Favourites />
        </aside>
      </section>
    </div>
  );
}
