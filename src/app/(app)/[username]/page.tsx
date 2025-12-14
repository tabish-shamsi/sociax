import ProfileIntro from "@/components/profile/ProfileIntro";

export default function ProfilePage() {
  return (
    <section id="Profile_Page" className="flex gap-4 lg:gap-8 w-full">
      <aside className="hidden lg:flex flex-col gap-8 xl:w-1/4 lg:w-[30%] ">
        <ProfileIntro />
      </aside>

      <main className="w-full lg:w-[70%] xl:w-1/2 flex flex-col gap-6 lg:gap-8"></main>

      <aside className="hidden xl:flex flex-col gap-8 w-1/4"></aside>
    </section>
  );
}
