"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import { VerifyEmailFormValues, verifyEmailSchema } from "@/schema/auth";
import { useVerifyEmail } from "@/hooks/useVerifyEmail";

export default function VerifyEmailForm() {
  const { verifyEmail, resendEmail, isVerifying } = useVerifyEmail();

  const form = useForm<VerifyEmailFormValues>({
    resolver: zodResolver(verifyEmailSchema),
    defaultValues: { code: "" },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => verifyEmail(data.code))}
        className="space-y-6"
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <FormControl>
                <InputOTP
                  value={field.value}
                  onChange={field.onChange}
                  maxLength={6}
                >
                  <InputOTPGroup className="gap-2">
                    {[0, 1, 2].map((i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
                  </InputOTPGroup>

                  <InputOTPSeparator />

                  <InputOTPGroup className="gap-2">
                    {[3, 4, 5].map((i) => (
                      <InputOTPSlot key={i} index={i} />
                    ))}
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

        <Button type="submit" className="w-full" disabled={isVerifying}>
          {isVerifying ? <Loader2 className="animate-spin" /> : "Verify Email"}
        </Button>
      </form>
    </Form>
  );
}
