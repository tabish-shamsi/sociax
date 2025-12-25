import LastUploadedImages from "@/components/last-uploaded-images";
import PersonalInfo from "@/components/personal-info"; 
import PersonalInfoSkeleton from "@/components/skeletons/personal-info-skeleton"; 
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
       <Suspense fallback={<div>Loading...</div>}> 
         <LastUploadedImages username={username} />
       </Suspense>
      </aside>

      <main className="w-full lg:w-[65%] flex flex-col gap-6 lg:gap-8">{
        // posts_.map((postData) => (
        //   <PostCard key={postData._id} post={postData} />
        // ))
      }</main>
    </section>
  );
}
