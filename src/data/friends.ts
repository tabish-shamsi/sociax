import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import Friend from "@/models/Friend";
import { unstable_cache } from "next/cache";

export const isRequestSent = (username: string) =>
  unstable_cache(
    async () => {
      await connectToDatabase();
      const user = await User.findOne({ username }).select("_id");
      const request = await Friend.findOne({
        $or: [{ requester: user._id }, { recipient: user._id }],
      });

      if (!request) return {};

      return {
        requester: request.requester.toString(),
        recipient: request.recipient.toString(),
        status: request.status,
        requestedAt: request.requestedAt,
        respondedAt: request.respondedAt,
        createdAt: request.createdAt,
        updatedAt: request.updatedAt,
        _id: request._id.toString(),
      };
    },
    [`friends-${username}`],
    { tags: ["friends"] },
  );

export const getFriends = (username: string) =>
  unstable_cache(
    async () => {
      await connectToDatabase();

      const user = await User.findOne({ username }).select("_id");
      if (!user) return [];

      const friends = await Friend.find({
        $or: [{ requester: user._id }, { recipient: user._id }],
        status: "accepted",
      })
        .populate({
          path: "requester",
          select: "avatar cover firstName lastName username",
        })
        .populate({
          path: "recipient",
          select: "avatar cover firstName lastName username",
        })
        .lean();

      // Optional: return only the "other" user (not the current one)
      return friends.map((friend) => {
        const isRequester =
          friend.requester._id.toString() === user._id.toString();
        return isRequester ? friend.recipient : friend.requester;
      });
    },
    [`friends-${username}`],
    { tags: ["friends"] },
  );
