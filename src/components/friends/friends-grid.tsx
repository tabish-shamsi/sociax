import { User } from "@/models/User";
import FriendCard from "./friend-card";

export default function FriendsGrid({ friends }: { friends: User[] }) {
  return (
    <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
      {friends.map((friend: User) => (
        <FriendCard key={friend._id.toString()} {...friend} />
      ))}
    </div>
  );
}
