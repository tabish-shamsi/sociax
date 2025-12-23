"use server";

import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import { signupSchema } from "@/schema/auth";
import { treeifyError } from "zod";
import bcrypt from "bcryptjs";

export const signupUser = async (data: unknown) => {
  const parsed = signupSchema.safeParse(data);

  if (!parsed.success) {
    return {
      errors: treeifyError(parsed.error), // structured field errors
    };
  }

  const { username, email, password, gender, birthday, firstName, lastName } =
    parsed.data;

  await connectToDatabase();

  const existingUser = await User.findOne({
    $or: [{ username }, { email }],
  });

  if (existingUser) {
    return {
      errors: {
        username:
          existingUser.username === username
            ? { _errors: ["Username is already taken"] }
            : undefined,
        email:
          existingUser.email === email
            ? { _errors: ["Email is already registered"] }
            : undefined,
      },
    };
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await User.create({
    firstName,
    lastName,
    email,
    username,
    password: hashedPassword,
    personalInfo: { gender, birthday: new Date(birthday) },
  });
  
  return { success: true, message: "User Registered Successfully!" };
};
