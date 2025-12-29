import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Search } from "lucide-react";

export default function FriendsPage() {
  return (
    <section
      id="Profile_Page"
      className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full"
    >
      <aside className="flex flex-col  gap-8 lg:w-[35%] "></aside>

      <main className="w-full lg:w-[65%] flex flex-col gap-6 lg:gap-8">
        {
          // posts_.map((postData) => (
          //   <PostCard key={postData._id} post={postData} />
          // ))
        }
      </main>
    </section>
  );
}
