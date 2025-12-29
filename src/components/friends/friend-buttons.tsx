"use client";

import { UserCheck, UserMinus, UserMinus2, UserPlus2 } from "lucide-react";
import {
  acceptFriendRequest,
  cancelFriendRequest,
  removeFriend,
  sendFriendRequest,
} from "@/actions/friend";
import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { showErrorToast, showSuccessToast } from "@/lib/toast";
import { Friend } from "@/models/Friend";
import { Button } from "../ui/button";

export default function FriendButtons({
  size,
  pendingFriendRequest,
}: {
  size: "sm" | "lg";
  pendingFriendRequest?: Friend;
}) {
  const { username: recipent } = useParams();
  const { data: session } = useSession(); 
  const senderId = session?.user.id;

  const isFriendRequestSent =
    pendingFriendRequest &&
    pendingFriendRequest.requester === senderId &&
    pendingFriendRequest.status === "pending";
  const isFriendRequestReceived =
    pendingFriendRequest &&
    pendingFriendRequest.recipient === senderId &&
    pendingFriendRequest.status === "pending";

  const isFriend =
    pendingFriendRequest && pendingFriendRequest.status === "accepted";

  const sendRequest = async () => {
    const res = await sendFriendRequest(recipent as string);
    res.success ? showSuccessToast(res.message) : showErrorToast(res.message);
  };

  const cancelRequest = async () => {
    const res = await cancelFriendRequest(recipent as string);
    res.success ? showSuccessToast(res.message) : showErrorToast(res.message);
  };

  const acceptRequest = async () => {
    const res = await acceptFriendRequest(recipent as string);
    res.success ? showSuccessToast(res.message) : showErrorToast(res.message);
  };

  const remove = async () => {
    const res = await removeFriend(recipent as string);
    res.success ? showSuccessToast(res.message) : showErrorToast(res.message);
  };

  if (size === "lg") {
    if (isFriend) {
      return (
        <button
          onClick={remove}
          className="flex items-center justify-center h-12 w-12 bg-red-600 text-white rounded-full cursor-pointer transition-colors hover:bg-red-500"
        >
          <UserMinus className="md:h-5 md:w-5" />
        </button>
      );
    } else if (isFriendRequestReceived) {
      return (
        <button
          onClick={acceptRequest}
          className="flex items-center justify-center md:h-12 md:w-12 bg-green-500 text-white rounded-full cursor-pointer transition-colors hover:bg-green-400"
        >
          <UserCheck className="md:h-5 md:w-5" />
        </button>
      );
    } else if (isFriendRequestSent) {
      return (
        <button
          title="Cancel Request"
          onClick={cancelRequest}
          className="flex items-center justify-center md:h-12 md:w-12 bg-gray-500 text-white rounded-full cursor-pointer transition-colors hover:bg-gray-400"
        >
          <UserMinus2 className="md:h-5 md:w-5" />
        </button>
      );
    } else {
      return (
        <button
          onClick={sendRequest}
          className="flex items-center justify-center md:h-12 md:w-12 bg-cyan-500 text-white rounded-full cursor-pointer transition-colors hover:bg-cyan-400"
        >
          <UserPlus2 className="md:h-5 md:w-5" />
        </button>
      );
    }
  }

  if (size === "sm") {
    if (isFriend) {
      return (
        <Button onClick={remove} size="sm" className="text-xs">
          <UserMinus /> Remove Friend
        </Button>
      );
    } else if (isFriendRequestReceived) {
      return (
        <Button onClick={acceptRequest} size="sm" className="text-xs">
          <UserCheck /> Accept Request
        </Button>
      );
    } else if (isFriendRequestSent) {
      return (
        <Button onClick={cancelRequest} size="sm" className="text-xs">
          <UserMinus2 /> Cancel Request
        </Button>
      );
    } else {
      return (
        <Button onClick={sendRequest} size="sm" className="text-xs">
          <UserPlus2 /> Add Friend
        </Button>
      );
    }
  }
}
