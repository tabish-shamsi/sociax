import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { verifyUserEmail } from "@/actions/verify-user";
import { sendEmail } from "@/actions/send-email";
import { showErrorToast, showSuccessToast } from "@/lib/toast";

export function useVerifyEmail() {
  const router = useRouter();
  const { data: session, update } = useSession();
  const user = session?.user;
  const [isVerifying, startVerifying] = useTransition();

  function verifyEmail(code: string) {
    startVerifying(async () => {
      const res = await verifyUserEmail({
        code,
        email: user?.email,
      });

      if (!res.success) {
        showErrorToast(res.message as string);
        return;
      }

      await update({
        ...session,
        user: {
          ...session?.user,
          verified: true
        }
      })
      showSuccessToast(res.message as string);
      router.replace("/");
    });
  }

  async function resendEmail() {
    if (!user?.email) return;

    const res = await sendEmail(user.email);
    res.success
      ? showSuccessToast(res.message)
      : showErrorToast(res.message);
  }

  return {
    verifyEmail,
    resendEmail,
    isVerifying,
  };
}
