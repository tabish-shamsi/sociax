// lib/navigation.ts
import {
  Home,
  User,
  Heart,
  Users,
  Music,
  CloudSun,
  Calendar,
} from "lucide-react";

export const navItems = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    name: "Favourite Pages",
    href: "/favourites",
    icon: Heart,
  },
  {
    name: "Friends Groups",
    href: "/groups",
    icon: Users,
  },
  {
    name: "Music & Playlist",
    href: "/music",
    icon: Music,
  },
  {
    name: "Weather Widget",
    href: "/weather",
    icon: CloudSun,
  },
  {
    name: "Calendar & Events",
    href: "/calendar",
    icon: Calendar,
  },
];
