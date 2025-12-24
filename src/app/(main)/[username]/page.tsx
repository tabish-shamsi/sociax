import PostCard from "@/components/global/PostCard";
import PersonalInfo from "@/components/personal-info";
import PersonalInfoCard from "@/components/profile/about/PersonalInfoCard";
import Following from "@/components/profile/timeline/Following";
import Friends from "@/components/profile/timeline/Friends";
import LastPhotos from "@/components/profile/timeline/LastPhotos";
import PersonalInfoSkeleton from "@/components/skeletons/personal-info-skeleton";
import { posts, user } from "@/lib/user";
import { Post } from "@/types/Post";
import { Suspense } from "react";

export default async function ProfilePage({params}: {params: Promise<{username: string}>}) {  
  "use cache"
  const {username} = await params

  return (
    <section id="Profile_Page" className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full">
      <aside className="flex flex-col  gap-8 lg:w-[35%] ">
        <Suspense fallback={<PersonalInfoSkeleton />}>
          <PersonalInfo username={username} />
        </Suspense>
        {/* <LastPhotos />
        <Friends />
        <Following /> */}
      </aside>

      <main className="w-full lg:w-[65%] flex flex-col gap-6 lg:gap-8">{
        // posts_.map((postData) => (
        //   <PostCard key={postData._id} post={postData} />
        // ))
      }</main>
    </section>
  );
}
