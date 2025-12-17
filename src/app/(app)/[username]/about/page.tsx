import EducationAndEmploymentCard from "@/components/profile/about/EducationAndEmploymentCard";
import HobbiesAndInterestsCard from "@/components/profile/about/HobbiesAndInterestsCard";
import PersonalInfoCard from "@/components/profile/about/PersonalInfoCard"; 

export default function page() {
  return (
    <section
      id="Profile_Page"
      className="flex flex-col lg:flex-row gap-4 lg:gap-8 w-full"
    >
      <aside className="flex flex-col gap-8 w-full lg:w-[40%]">
        <PersonalInfoCard />
      </aside>
      <main className="w-full lg:w-[60%] flex flex-col gap-8">
        <HobbiesAndInterestsCard />
        <EducationAndEmploymentCard />
      </main>
    </section>
  );
}
