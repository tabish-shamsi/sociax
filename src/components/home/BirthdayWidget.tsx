import {
  Cake,
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Sun,
  Wind,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { stories } from "@/lib/stories";

export default function BirthdayWidget() {
  return (
    <div className="w-full relative z-1 rounded-xl shadow-sm overflow-hidden">
      <div className="bg-[url(/images/birthday-bg.jpg)] grayscale-100 absolute top-0 left-0 w-full h-full bg-cover -z-1" />
      <div className="absolute top-0 left-0 w-full h-full bg-[#b046ffe8] dark:bg-[#62298ce3] -z-1" />

      <div aria-label="content" className="flex flex-col p-6">
        <Cake size={35} className="mb-8 text-white" />

        <div className="flex flex-col gap-2 text-white">
          <Avatar className="h-12 w-12 border-2 border-white">
            <AvatarImage src={stories[2].user.profileImageUrl} />
            <AvatarFallback>MV</AvatarFallback>
          </Avatar>

          <span className="text-sm">Today is</span>
          <h4 className="text-2xl font-semibold">Maria Valentine's Birthday!</h4>

          <span className="text-sm">Leave her a message with your best wishes on her profile.</span>
        </div>
      </div>
    </div>
  );
}
