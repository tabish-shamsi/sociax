"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ChangeEmailFormValues,
  changeEmailSchema,
  verifyEmailSchema,
} from "@/schema/auth";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "next/navigation";
import { sendEmail } from "@/actions/send-email";
import { useSession } from "next-auth/react";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

export default function VerifyEmailPage() {
  const { data: session } = useSession();
  const user = session?.user;
  const [isChangingEmail, setIsChangingEmail] = useState(false);
  const router = useRouter();

  const handleVerify = async () => {};

  const form = useForm({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: {
      code: "",
    },
  });

  /* ------------------------Renderers------------------------ */
  function ChangeEmailForm() {
    const form = useForm({
      defaultValues: {
        email: "",
        confirmEmail: "",
      },
      resolver: zodResolver(changeEmailSchema),
    });

    async function changeEmail(data: ChangeEmailFormValues) {
      setIsChangingEmail(false);
    }

    return (
      <Dialog open={isChangingEmail} onOpenChange={setIsChangingEmail}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Change Email Address</DialogTitle>
          </DialogHeader>
          <Separator />

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(changeEmail)}
              className="space-y-6"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter New Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="confirmEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Email</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Change Email
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    );
  }

  async function resendEmail() {
    const res = await sendEmail(user.email);
    if (!res.success) {
      showErrorToast(res.message);
    } else {
      showSuccessToast(res.message);
    }
  }

  return (
    <>
      <div className="flex min-h-screen items-center justify-center bg-muted px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Verify your email</CardTitle>
            <CardDescription>
              We’ve sent a verification code to your email address.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleVerify)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="code"
                  render={({ field }) => (
                    <FormItem className="w-full flex flex-col items-center justify-center">
                      <FormControl>
                        <InputOTP
                          value={field.value}
                          onChange={field.onChange}
                          maxLength={6}
                        >
                          <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border">
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                          </InputOTPGroup>
                          <InputOTPSeparator />
                          <InputOTPGroup className="gap-2 *:data-[slot=input-otp-slot]:rounded-md *:data-[slot=input-otp-slot]:border ">
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                          </InputOTPGroup>
                        </InputOTP>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="button" variant="link" onClick={resendEmail}>
                  Resend
                </Button>

                <div className="flex items-center justify-center gap-4">
                  <Button
                    type="button"
                    variant="secondary"
                    className="text-sm w-1/2"
                    onClick={() => setIsChangingEmail(true)}
                  >
                    Change Email
                  </Button>
                  {/* <Button type="submit" className="w-1/2" disabled={loading}>
                    {loading ? "Verifying..." : "Verify Email"}
                  </Button> */}
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>

      <ChangeEmailForm />
    </>
  );
}
