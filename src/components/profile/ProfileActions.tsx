"use client";

import { MessageSquareText, Settings2, UserPlus2 } from "lucide-react";

export function DesktopProfileActions() {
  return (
    <div className="absolute md:bottom-[74px] lg:bottom-[104px] xl:bottom-28 md:right-4 hidden md:block">
      <div className="flex items-center justify-center gap-3">
        <button className="flex items-center justify-center md:h-12 md:w-12 bg-cyan-500 text-white rounded-full cursor-pointer transition-colors hover:bg-cyan-400">
          <UserPlus2 className="md:h-5 md:w-5" />
        </button>

        <button className="flex items-center justify-center h-12 w-12 bg-violet-600 text-white rounded-full cursor-pointer transition-colors hover:bg-purple-500">
          <MessageSquareText className="md:h-5 md:w-5" />
        </button>

        <button className="flex items-center justify-center h-12 w-12 bg-amber-500 text-white rounded-full cursor-pointer transition-colors hover:bg-amber-400">
          <Settings2 className="md:h-5 md:w-5" />
        </button>
      </div>
    </div>
  );
}

export function MobileProfileActions() {
  return <p></p>;
}
