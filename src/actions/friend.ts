"use server";

import { getUserSession } from "@/data/get-user-session";
import { connectToDatabase } from "@/lib/db";
import Friend from "@/models/Friend";
import User from "@/models/User";
import { revalidateTag } from "next/cache";

export const sendFriendRequest = async (username: string) => {
  try {
    await connectToDatabase();
    const recipient = await User.findOne({ username }).select("_id");
    if (!recipient) {
      throw new Error("User not found");
    }

    const recipentId = recipient._id;
    const { id: requesterId } = await getUserSession();

    const newRequest = await Friend.create({
      requester: requesterId,
      recipient: recipentId,
    });

    revalidateTag(`friends`, "");
    return { success: true, message: "Friend request sent!" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong while sending friend request.",
    };
  }
};

export const cancelFriendRequest = async (username: string) => {
  try {
    await connectToDatabase();
    const recipient = await User.findOne({ username }).select("_id");
    if (!recipient) {
      throw new Error("User not found");
    }

    const recipentId = recipient._id;
    const { id: requesterId } = await getUserSession();

    const newRequest = await Friend.findOneAndDelete({
      requester: requesterId,
      recipient: recipentId,
    });

    revalidateTag(`friends`, "");
    return { success: true, message: "Friend request cancled!" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong while sending friend request.",
    };
  }
};

export const acceptFriendRequest = async (username: string) => {
  try {
    const { id: recipientId } = await getUserSession(); // recipientID = the one who is accepting the request

    const requester = await User.findOne({ username }).select("_id").lean();

    const requesterId = requester?._id; // requesterID = the one who sent the request

    if (!requesterId) {
      throw new Error("User not found");
    }

    const friendRequest = await Friend.findOneAndUpdate(
      { requester: requesterId, recipient: recipientId },
      { status: "accepted" },
    );

    revalidateTag(`friends`, "");
    return { success: true, message: "Friend request accpeted!" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong while sending friend request.",
    };
  }
};

export const removeFriend = async (username: string) => {
  try {
    const { id: recipientId } = await getUserSession(); // recipientID = the one who is accepting the request

    const requester = await User.findOne({ username }).select("_id").lean();

    const requesterId = requester?._id; // requesterID = the one who sent the request

    if (!requesterId) {
      throw new Error("User not found");
    }

    const friendRequest = await Friend.findOneAndDelete({
      requester: requesterId,
      recipient: recipientId,
    });

    revalidateTag(`friends`, "");
    return { success: true, message: "Removed friend!" };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Something went wrong while sending friend request.",
    };
  }
};
