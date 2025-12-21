import EducationAndEmploymentCard from "@/components/profile/about/EduEmpCard";
import InterestsCard from "@/components/profile/about/InterestsCard";
import PersonalInfoCard from "@/components/profile/about/PersonalInfoCard";
import EducationAndEmploymentSkeleton from "@/components/skeletons/education-employment-skeleton";
import InterestsSkeleton from "@/components/skeletons/interests-skeleton";
import PersonalInfoSkeleton from "@/components/skeletons/personal-info-skeleton";
import { Suspense } from "react";

export default async function page() {
  return (
    <section
      id="Profile_Page"
      className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full"
    >
      <aside className="flex flex-col gap-8 w-full lg:w-[40%]">
        <Suspense fallback={<PersonalInfoSkeleton />}>
          <PersonalInfoCard />
        </Suspense>
      </aside>
      <main className="w-full lg:w-[60%] flex flex-col gap-8">
        <Suspense fallback={<InterestsSkeleton />}>
          <InterestsCard />
        </Suspense>
        <Suspense fallback={<EducationAndEmploymentSkeleton />}>
          <EducationAndEmploymentCard />
        </Suspense>
      </main>
    </section>
  );
}
