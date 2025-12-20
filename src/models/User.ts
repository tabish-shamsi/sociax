import mongoose from "mongoose";

type PersonalInfo = {
  birthday: Date;
  gender: string;
};

export type User = {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  personalInfo: PersonalInfo;
  avatar: string;
  verified: boolean;
  verificationCode?: string;
  verificationExpiry?: Date;
};

const userSchema = new mongoose.Schema<User>(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
    },
    lastName: {
      type: String,
      required: true,
      trim: true,
    },
    username: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    avatar: { type: String },
    verified: {
      type: Boolean,
      default: false,
    },
    personalInfo: {
      gender: {
        type: String,
        required: true,
        trim: true,
      },
      birthday: {
        type: Date,
        required: true,
        trim: true,
      },
    },

    verificationCode: String,
    verificationExpiry: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
