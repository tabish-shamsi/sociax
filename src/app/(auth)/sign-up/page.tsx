"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, signupSchema } from "@/schema/auth";
import { useState, useTransition } from "react";
import { signupUser } from "./actions";
import { showSuccessToast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { sendEmail } from "@/actions/send-email";
import Form from "@/components/global/Form";
import { InputField } from "@/components/global/InputField";
import InputDate from "@/components/global/InputDate";
import { InputSelect } from "@/components/global/InputSelect";
import { genders } from "@/lib/genders";
import SubmitButton from "@/components/global/SubmitButton";
import AuthLeft from "@/components/global/AuthLeft";

export default function SignupPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter(); 

  const form = useForm({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      birthday: "",
      gender: "",
    },
  });

  async function onSubmit(values: SignupFormValues) {
    startTransition(async () => {
      const res = await signupUser(values);

      if (res?.errors) {
        Object.entries(res.errors).forEach(([key, value]) => {
          if (key === "_errors") return; // skip root
          if (value?._errors?.length) {
            form.setError(key as keyof SignupFormValues, {
              message: value._errors[0],
            });
          }
        });
        return;
      }

      showSuccessToast(res.message);
      signIn("credentials", {
        email: values.email,
        password: values.password,
      });
      await sendEmail(values.email)
      router.replace("/verify-user");
    });
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* ---------------- Left Section ---------------- */}
      <AuthLeft />

      {/* ---------------- Right Section ---------------- */}
      <div className="flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Register to Sociax
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Form form={form} handleSubmit={onSubmit} >
              <div className="space-y-4">
                <div className="flex w-full items-center justify-center gap-3">
                  <InputField control={form.control} name="firstName" label="First Name" />
                  <InputField control={form.control} name="lastName" label="Last Name" />
                </div>
                <InputField control={form.control} name="username" label="Username" />
                <InputField control={form.control} name="email" label="Email" type="email" />
                <InputField control={form.control} name="password" label="Password" type="password" />
                <InputDate control={form.control} name="birthday" label="Date Of Birth" />
                <InputSelect control={form.control} name="gender" label="Gender" options={genders} />

                <SubmitButton isLoading={isPending} className="w-full">Complete Signup</SubmitButton>

                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="text-primary font-medium hover:underline"
                  >
                    Sign In
                  </Link>
                </p>
              </div>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 