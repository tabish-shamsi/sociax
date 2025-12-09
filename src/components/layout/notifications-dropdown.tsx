"use client";

import { BellRing } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
} from "@/components/ui/dropdown-menu";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { notifications } from "@/lib/notifications";
import { cn } from "@/lib/utils";

export default function NotificationsDropdown() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <BellRing className="text-white" />
      </DropdownMenuTrigger>

      <DropdownMenuContent className="p-0 mr-2 mt-6">
        <Card className="w-96 border-none shadow-none gap-2">
          <CardHeader className="flex items-center justify-between">
            <CardTitle className="gap-0">Notifications</CardTitle>
          </CardHeader>

          <CardContent className="flex flex-col gap-4 py-2 px-4">
            {notifications.map((notif) => (
              <div
                key={notif.id}
                className={cn(
                  "flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition",
                  !notif.isRead ? "bg-gray-100 dark:bg-gray-800" : ""
                )}
              >
                <Avatar className="w-10 h-10">
                  <AvatarImage src={notif.user.avatar} alt={notif.user.name} />
                  <AvatarFallback>
                    {notif.user.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 flex flex-col">
                  <span className="text-sm font-medium text-gray-800 dark:text-gray-100">
                    {notif.user.name}{" "}
                    <span className="font-normal text-gray-600 dark:text-gray-400">
                      {notif.message}
                    </span>
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {notif.date}
                  </span>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
