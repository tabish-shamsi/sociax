"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SigninFormValues, signinSchema } from "@/schema/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { signIn, signOut } from "next-auth/react";
import { showErrorToast } from "@/lib/toast";
import { useRouter } from "next/navigation";

export default function SigninPage() {
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(signinSchema),
    defaultValues: {
      identifier: "",
      password: "",
    },
  });

  async function onSubmit(values: SigninFormValues) {
    const res = await signIn("credentials", {
      email: values.identifier,
      password: values.password,
      redirect: false,
    });

    if (res?.error) {
      showErrorToast("Invalid Credentials");
      return;
    }

    router.replace("/");
  }

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* ---------------- Left Section ---------------- */}
      <div className="relative hidden lg:flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 bg-[url('/images/signup-bg.jpg')] bg-cover bg-center" />
        <div className="absolute inset-0 bg-primary" />

        {/* Content */}
        <div className="relative z-10 max-w-xl text-white space-y-6 px-8">
          <h1 className="text-4xl font-bold leading-tight">
            Welcome to the Biggest <br /> Social Network in the World
          </h1>

          <p className="text-sm text-orange-100">
            We are the best and biggest social network with 5 billion active
            users all around the world. Share your thoughts, write blog posts,
            earn badges and much more!
          </p>

          <Button
            variant="outline"
            className="border-white text-white hover:bg-white hover:text-orange-500"
          >
            Register Now!
          </Button>
        </div>
      </div>

      {/* ---------------- Right Section ---------------- */}
      <div className="flex items-center justify-center px-4 py-12">
        <Card className="w-full max-w-md shadow-xl">
          <CardHeader>
            <CardTitle className="text-center text-xl">
              Login to your Account
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* Email */}
                <FormField
                  control={form.control}
                  name="identifier"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username / Email</FormLabel>
                      <FormControl>
                        <Input {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field} //type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button size="lg" type="submit" className="w-full">
                  Sign In
                </Button>

                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <Link
                    href="/sign-up  "
                    className="text-primary font-medium hover:underline"
                  >
                    Sign Up
                  </Link>
                </p>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
