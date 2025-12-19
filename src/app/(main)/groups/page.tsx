"use client";

import AddGroupDialog from "@/components/AddGroupDialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { Plus, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import z from "zod";

/* ---------------------------- Types ---------------------------- */
type Friend = {
  _id: string;
  avatar: string;
  name: string;
};
type Group = {
  _id: string;
  title: string;
  friends: Friend[];
  avatar: string;
};

/* ---------------------------- Static Data ---------------------------- */
const friends: Friend[] = [
  {
    _id: "friend_1",
    avatar: "https://i.pravatar.cc/150?img=1",
    name: "Ali Khan",
  },
  {
    _id: "friend_2",
    avatar: "https://i.pravatar.cc/150?img=2",
    name: "Sara Ahmed",
  },
  {
    _id: "friend_3",
    avatar: "https://i.pravatar.cc/150?img=3",
    name: "Hassan Raza",
  },
  {
    _id: "friend_4",
    avatar: "https://i.pravatar.cc/150?img=4",
    name: "Ayesha Malik",
  },
];

const initialGroups: Group[] = [
  {
    _id: "group_1",
    title: "Close Friends",
    avatar: "https://picsum.photos/seed/group1/200",
    friends: [friends[0], friends[1]],
  },
  {
    _id: "group_2",
    title: "Work Buddies",
    avatar: "https://picsum.photos/seed/group2/200",
    friends: [friends[2], friends[3]],
  },
  {
    _id: "group_3",
    title: "Gym Squad",
    avatar: "https://picsum.photos/seed/group3/200",
    friends: [friends[0], friends[2], friends[3]],
  },
];

export default function FriendsGroupPage() {
  const [groups, setGroups] = useState<Group[]>(initialGroups);

  /* ---------------------------- Schema ---------------------------- */
  const groupSchema = z.object({
    title: z
      .string()
      .min(5, "Group name must be atleast 5 characters")
      .max(230, "Group name cannot be larger than 230 characters"),
    avatar: z.string("Group avatar is required"),
  });

  /* ---------------------------- Renderers ---------------------------- */
  function Header() {
    return (
      <header className="h-96 w-full bg-[url(/images/calendar-bg.jpg)] bg-no-repeat bg-cover bg-center  relative z-1">
        <div className="absolute top-0 left-0 h-full w-full flex bg-blue-400 opacity-90 -z-1 " />

        <div className="w-full h-full flex items-center justify-center">
          <div className="w-3/4   text-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white">
              Manage Your Friend Groups
            </h1>
            <p className="text-xs md:text-sm lg:text-base text-gray-200 mt-4">
              Welcome to your friends groups! Do you wanna know what your close
              friends have been up to? Group will let you easily manage your
              friends and put them into categories so when you enter you'll only
              see a newsfeed of those friends that you placed inside the group.
              Just click on the plus button below and start now!
            </p>
          </div>
        </div>
      </header>
    );
  }

  function AddGroupCard() {
    return (
      <Dialog>
        <DialogTrigger>
          <div className="cursor-pointer w-full h-64 rounded-md border-2 border-dashed border-ring flex flex-col items-center justify-center">
            <span className="h-12 w-12 flex items-center justify-center bg-blue-400 text-white rounded-full">
              <Plus />
            </span>
            <h3 className="text-lg font-medium text-card-foreground mt-4">
              Create a Group
            </h3>
            <p className="text-sm text-muted-foreground">
              It only takes a few minutes
            </p>
          </div>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Create Friend Group</DialogHeader>
          <Separator />
        </DialogContent>
      </Dialog>
    );
  }

  function GroupCard(group: Group) {
    return (
      <Link href={""}>
        <Card className="w-full max-w-sm hover:shadow-lg transition">
          <CardHeader className="flex flex-col justify-center items-center gap-4">
            {/* Group Avatar */}
            <Avatar className="h-24 w-24">
              <AvatarImage src={group.avatar} alt={group.title} />
              <AvatarFallback>{group.title[0]}</AvatarFallback>
            </Avatar>

            {/* Group Info */}
            <div className="flex-1 text-center">
              <h3 className="text-base font-semibold">{group.title}</h3>
              <div className="flex items-center justify-center text-sm text-muted-foreground gap-1">
                <Users className="h-4 w-4" />
                {group.friends.length} Friends in the Group
              </div>
            </div>
          </CardHeader>

          <CardContent>
            {/* Friends Preview */}
            <div className="flex -space-x-3 w-full items-center justify-center">
              {group.friends.slice(0, 5).map((friend) => (
                <Avatar
                  key={friend._id}
                  className="border-2 border-background h-9 w-9"
                >
                  <AvatarImage src={friend.avatar} alt={friend.name} />
                  <AvatarFallback>{friend.name[0]}</AvatarFallback>
                </Avatar>
              ))}

              {group.friends.length > 5 && (
                <div className="h-9 w-9 flex items-center justify-center rounded-full bg-muted text-xs font-medium border-2 border-background">
                  +{group.friends.length - 5}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </Link>
    );
  }

  function Groups() {
    if (groups.length > 0) {
      return groups.map((group: Group) => (
        <GroupCard key={group._id} {...group} />
      ));
    }
  }

  /* ---------------------------- Render ---------------------------- */

  return (
    <section className="mt-16 lg:mx-20 lg:w-auto ">
      <Header />
      <main className="lg:p-8 p-6 ">
        {/* --------------------- Groups Card Grid ----------------------- */}
        <div className="grid w-full gap-8 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
          <AddGroupDialog
            friends={friends}
            onCreate={(values) => {
              setGroups((prev) => [
                ...prev,
                {
                  _id: crypto.randomUUID(),
                  title: values.title,
                  avatar: "https://picsum.photos/seed/newgroup/200",
                  friends: values.friends,
                },
              ]);
            }}
          />

          <Groups />
        </div>
      </main>
    </section>
  );
}
