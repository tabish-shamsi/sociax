"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SignupFormValues, signupSchema } from "@/schema/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { genders } from "@/lib/genders";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { useState, useTransition } from "react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { signupUser } from "./actions";
import { showSuccessToast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { sendEmail } from "@/actions/send-email";

export default function SignupPage() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const [openCalendar, setOpenCalendar] = useState(false);

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
              Register to Sociax
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <Form {...form}>
              <form
                className="space-y-4"
                onSubmit={form.handleSubmit(onSubmit)}
              >
                {/* Name */}
                <div className="flex  w-full gap-3">
                  {/* First Name */}
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>First Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Last Name */}
                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Last Name</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Username */}
                <FormField
                  control={form.control}
                  name="username"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Username</FormLabel>
                      <FormControl>
                        <Input type="username" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input type="email" {...field} />
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
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Birthday */}
                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Date of Birth</FormLabel>
                      <FormControl>
                        <Popover
                          open={openCalendar}
                          onOpenChange={setOpenCalendar}
                        >
                          <PopoverTrigger asChild>
                            <Button
                              variant="ghost"
                              className={cn(
                                "w-full justify-between font-normal border",
                                fieldState.error
                                  ? "border-destructive"
                                  : " border-input"
                              )}
                            >
                              {field.value
                                ? format(field.value, "PPP")
                                : "Select date"}
                              <ChevronDownIcon className="h-4 w-4 opacity-50" />
                            </Button>
                          </PopoverTrigger>

                          <PopoverContent
                            className="w-auto overflow-hidden p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={new Date(field.value)}
                              onSelect={(date) => {
                                field.onChange(date?.toISOString());
                                setOpenCalendar(false);
                              }}
                              captionLayout="dropdown"
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field, fieldState }) => (
                    <FormItem>
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger
                            className={cn(
                              "w-full",
                              fieldState.error
                                ? "border-destructive"
                                : "border-input"
                            )}
                          >
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent>
                            {genders.map((value) => (
                              <SelectItem key={value} value={value}>
                                {value}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button size="lg" type="submit" className="w-full">
                  {isPending ? "Loading..." : "Complete Registration!"}
                </Button>

                <p className="text-sm text-muted-foreground">
                  Already have an account?{" "}
                  <Link
                    href="/sign-in"
                    className="text-primary font-medium hover:underline"
                  >
                    Sign In
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
