import PersonalInfo from "@/components/personal-info"; 
import EducationAndEmploymentSkeleton from "@/components/skeletons/education-employment-skeleton";
import InterestsSkeleton from "@/components/skeletons/interests-skeleton";
import PersonalInfoSkeleton from "@/components/skeletons/personal-info-skeleton";
import Interests from "@/components/interests/index";
import { Suspense } from "react";
import EducationAndEmployment from "@/components/education-employment";

export default async function ProfilePageAbout({ params }: { params: Promise<{ username: string }> }) {
  const { username } = await params

  return (
    <section
      id="Profile_Page"
      className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full"
    >
      <aside className="flex flex-col gap-8 w-full lg:w-[40%]">
        <Suspense fallback={<PersonalInfoSkeleton />}>
          <PersonalInfo username={username} />
        </Suspense>
      </aside>
      <main className="w-full lg:w-[60%] flex flex-col gap-8">
        <Suspense fallback={<InterestsSkeleton />}>
          <Interests username={username} />
        </Suspense>
        <Suspense fallback={<EducationAndEmploymentSkeleton />}>
          <EducationAndEmployment username={username} />
        </Suspense>
      </main>
    </section>
  );
}
