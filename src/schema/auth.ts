import * as z from "zod";

export const signupSchema = z.object({
  firstName: z
    .string()
    .min(2, "First name must be at least 2 characters")
    .max(50),

  lastName: z
    .string()
    .min(2, "Last name must be at least 2 characters")
    .max(50),

  username: z
    .string()
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(
      /^[a-zA-Z0-9._]+$/,
      "Username can only contain letters, numbers, dots, and underscores"
    )
    .refine(
      (value) => !value.startsWith(".") && !value.endsWith("."),
      "Username cannot start or end with a dot"
    ),

  email: z.email("Please enter a valid email address"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number"),

  birthday: z.string().refine((value) => {
    const birthDate = new Date(value);
    const age = new Date().getFullYear() - birthDate.getFullYear();
    return age >= 13;
  }, "You must be at least 13 years old"),

  gender: z.string().min(1, "Gender is required"),
});

export type SignupFormValues = z.infer<typeof signupSchema>;

export const signinSchema = z.object({
  identifier: z.string(),
  password: z.string(),
});

export type SigninFormValues = z.infer<typeof signinSchema>;

export const changeEmailSchema = z
  .object({
    email: z.email("Invalid email address").min(1, "Email is required"),

    confirmEmail: z
      .email("Invalid email address")
      .min(1, "Confirm email is required"),
  })
  .refine((data: any) => data.email === data.confirmEmail, {
    message: "Emails do not match",
    path: ["confirmEmail"], // show error under confirmEmail field
  });

export type ChangeEmailFormValues = z.infer<typeof changeEmailSchema>;

export const verifyEmailSchema = z.object({
  code: z.string().min(6, "Verification code is required"),
});

export type VerifyEmailFormValues = z.infer<typeof verifyEmailSchema>;
