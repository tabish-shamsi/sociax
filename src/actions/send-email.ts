"use server";

import verifyUserEmail from "@/emails/verify-user";
import { connectToDatabase } from "@/lib/db";
import { createTransporter } from "@/lib/mailer";
import User from "@/models/User";
import { render } from "@react-email/components";
import bcrypt from "bcryptjs";

export async function sendEmail(email: string) {
  try {
    await connectToDatabase();
    const user = await User.findOne({ email });

    if (!user) return { success: false, message: "User not found" };

    const code = Math.floor(100000 + Math.random() * 900000).toString();
    const codeExpiry = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

    const transporter = await createTransporter();
    await transporter.sendMail({
      from: `"Sociax" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Verify your Sociax account",
      html: await render(
        verifyUserEmail({
          username: user.firstName,
          code: code,
        })
      ),
    });

    const hashedCode = await bcrypt.hash(code, 6);
    user.verificationCode = hashedCode;
    user.verificationExpiry = codeExpiry;

    await user.save();

    return { success: true, message: "Verification email sent successfully!" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Internet server error in send-email" };
  }
}
