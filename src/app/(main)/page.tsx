import WeatherWidget from "@/components/home/WeatherWidget";
import Calendar_Events from "@/components/home/Calendar_Events";
import PagesSuggestion from "@/components/global/PagesSuggestion";
import BirthdayWidget from "@/components/home/BirthdayWidget";
import ActivityCard from "@/components/home/ActivityCard";
import FriendsSuggestion from "@/components/global/FriendsSuggestion";
import Stories from "@/components/home/Stories";
import CreatePost from "../../components/home/CreatePost";
import Feed from "@/components/home/Feed"; 

export default async function HomePage() { 
  return (
    <div className="mt-16 lg:mx-20 lg:p-8 lg:w-auto md:w-xl p-6 mx-auto">
      <section id="Home_Page" className="flex gap-4 lg:gap-8 w-full">
        <aside className="hidden lg:flex flex-col gap-8 xl:w-1/4 lg:w-[30%] ">
          <WeatherWidget />
          <Calendar_Events />
          <PagesSuggestion />
        </aside>

        <main className="w-full lg:w-[70%] xl:w-1/2 flex flex-col gap-6 lg:gap-8">
          <Stories />
          <CreatePost />
          <Feed />
        </main>

        <aside className="hidden xl:flex flex-col gap-8 w-1/4">
          <BirthdayWidget />
          <ActivityCard />
          <FriendsSuggestion />
        </aside>
      </section>
    </div>
  );
}
