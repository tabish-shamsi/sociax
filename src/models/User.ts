import mongoose from "mongoose";



export type Social = {
  _id: string;
  name: string;
  link: string;
}

export type PersonalInfo = {
  birthday: Date;
  gender: string;
  about_me?: string;
  birthplace?: string;
  occupation?: string;
  lives_in?: string;
  joined?: Date;
  status?: string;
  website?: string;
  socials: Social[];
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

  createdAt: Date;
  updatedAt: Date;
};

const socialSchema = new mongoose.Schema<Social>({
  name: String,
  link: String,
});

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
      about_me: String,
      birthplace: String,
      occupation: String,
      lives_in: String,
      status: String,
      joined: {
        type: Date,
        default: new Date(),
      },
      socials: [socialSchema],
    },
    verificationCode: String,
    verificationExpiry: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
