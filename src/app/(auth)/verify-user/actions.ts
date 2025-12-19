"use server";

import User from "@/models/User";
import { verifyEmailSchema } from "@/schema/auth";
import { getServerSession } from "next-auth";
import { treeifyError } from "zod";

export async function verifyUser(data: unknown) {
  const parsed = verifyEmailSchema.safeParse(data);
  if (!parsed.success) {
    return {
      errors: treeifyError(parsed.error), // structured field errors
    };
  }

  const session = await getServerSession();
  if (!session || !session.user) {
    return { success: false, message: "Please sign in to continue" };
  }

  const email = session.user.email

  const user = await User.findOne({ email });
  if (!user) {
    return { success: false, message: "User not found" };
  }

  
}
