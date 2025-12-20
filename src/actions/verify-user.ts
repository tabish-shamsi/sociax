"use server";

import { connectToDatabase } from "@/lib/db";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const verifyUserEmail = async ({
  code,
  email,
}: {
  code: string;
  email: string;
}) => {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });
    if (!user) return { message: "User not found", success: false };

    if (!user.verificationCode || !user.verificationExpiry)
      return {
        success: false,
        message: "Verification Code and Verification Expiry does not exists",
      };

    const isValid = bcrypt.compare(code, user.verificationCode);
    const isExpired = user.verificationExpiry < new Date();

    if (!isValid || isExpired)
      return { message: "Code is either invalid or expired", success: false };

    user.verified = true;
    user.verificationCode = undefined;
    user.verificationExpiry = undefined;
    await user.save();
    return { message: "Account has been verified!", success: true };
  } catch (error) {
    console.error(error);
    return { success: false, message: error };
  }
};
