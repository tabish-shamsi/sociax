import mongoose from "mongoose";

export enum FriendshipStatus {
  PENDING = "pending",
  ACCEPTED = "accepted",
  BLOCKED = "blocked",
  DECLINED = "declined"
}

export type Friend = {
  _id: mongoose.Types.ObjectId;
  requester: mongoose.Types.ObjectId; // User who sent the friend request
  recipient: mongoose.Types.ObjectId; // User who received the friend request
  status: FriendshipStatus;
  requestedAt: Date;
  respondedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
};

const friendSchema = new mongoose.Schema<Friend>(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    recipient: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: {
      type: String,
      enum: Object.values(FriendshipStatus),
      default: FriendshipStatus.PENDING,
      required: true,
    },
    requestedAt: {
      type: Date,
      default: Date.now,
      required: true,
    },
    respondedAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index to prevent duplicate friend requests
friendSchema.index({ requester: 1, recipient: 1 }, { unique: true });


const Friend = mongoose.models.Friend || mongoose.model("Friend", friendSchema);
export default Friend;