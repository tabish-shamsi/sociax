"use client"

import { MessageCircleMore } from "lucide-react";
import { DesktopSearchBar, MobileSearchBar } from "./search";
import NavMenuDrop from "./nav-dropdown";
import UserDropdown from "./user-dropdown";
import SiteLogo from "../global/logo";
import NotificationsDropdown from "./notifications-dropdown";
import PageTitle from "./PageTitle";

export default function TopHeader() {
  return (
    <header className="fixed top-0 left-0 h-16 w-full bg-gray-700 flex items-center justify-between pr-6 lg:pr-12 z-10">
      <div className="h-full flex items-center justify-center">
        <SiteLogo />
        <NavMenuDrop />
        <DesktopSearchBar />
        <PageTitle />
      </div>

      <div className="flex items-center justify-center gap-4 md:gap-6">
        <MobileSearchBar />
        <NotificationsDropdown />

        <div>
          <MessageCircleMore className="text-white" />
        </div>

        <UserDropdown />
      </div>
    </header>
  );
}
