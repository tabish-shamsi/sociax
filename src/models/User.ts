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

export type Interests = {
  hobbies?: string;
  favourite_tv_shows?: string;
  favourite_movies?: string;
  favourite_games?: string;
  favourite_music_artists?: string;
  favourite_books?: string;
  favourite_writers?: string;
  other_interests?: string;
};

export type Education_Employment = {
  title: string;
  timestamp: string;
  description: string;
}

export type User = {
  _id: mongoose.Types.ObjectId;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  personalInfo: PersonalInfo;
  avatar: {
    fileId: string;
    url: string;
  };
  cover: {
    fileId: string;
    url: string;
  };
  verified: boolean;
  interests: Interests;
  education_employment: Education_Employment[];

  verificationCode?: string;
  verificationExpiry?: Date;

  createdAt: Date;
  updatedAt: Date;
};

const socialSchema = new mongoose.Schema<Social>({
  name: String,
  link: String,
});

const education_employmentSchema = new mongoose.Schema<Education_Employment>({
  title: String,
  timestamp: String,
  description: String,
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
    avatar: {
      fileId: String,
      url: String
    },
    cover: {
      fileId: String,
      url: String
    },
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
        default: Date.now(),
      },
      socials: [socialSchema],
    },
    interests: {
      hobbies: String,
      favourite_tv_shows: String,
      favourite_movies: String,
      favourite_games: String,
      favourite_music_artists: String,
      favourite_books: String,
      favourite_writers: String,
      other_interests: String,
    },
    education_employment: [education_employmentSchema],
    verificationCode: String,
    verificationExpiry: Date,
  },
  { timestamps: true }
);

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
