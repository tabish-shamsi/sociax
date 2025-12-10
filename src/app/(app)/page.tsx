import WeatherWidget from "@/components/home/WeatherWidget";
import Calendar_Events from "@/components/home/Calendar_Events";
import PagesSuggestion from "@/components/global/PagesSuggestion";
import BirthdayWidget from "@/components/home/BirthdayWidget";
import ActivityCard from "@/components/home/ActivityCard";
import FriendsSuggestion from "@/components/global/FriendsSuggestion";
import Stories from "@/components/home/Stories";
import UploadPost from "@/components/home/UploadPost";
import { user } from "@/lib/user";

export default function HomePage() {
  return (
    <section id="Home_Page" className="flex gap-8 w-full">
      <aside className="flex flex-col gap-8 w-1/4 ">
        <WeatherWidget />
        <Calendar_Events />
        <PagesSuggestion />
      </aside>

      <main className="w-1/2 flex flex-col gap-8">
        <Stories />
        <UploadPost user={user} />
      </main>

      <aside className="flex flex-col gap-8 w-1/4">
        <BirthdayWidget />
        <ActivityCard />
        <FriendsSuggestion />
      </aside>
    </section>
  );
}
