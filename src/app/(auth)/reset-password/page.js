import { ResetPasswordForm } from "@/components/auth/reset-password/ResetPasswordForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ROUTES } from "@/constants/routes";
import { COOKIE_NAMES } from "@/constants/cookies";

export default async function ResetPasswordPage() {
  const cookieStore = await cookies();
  const resetToken = cookieStore.get(COOKIE_NAMES.PASSWORD_RESET_TOKEN);
  const expectedToken = process.env.PASSWORD_RESET_SECRET_KEY;

  if (!resetToken || resetToken.value !== expectedToken) {
    redirect(ROUTES.SIGNIN);
  }

  return (
    <div className="sm:min-w-[400px] max-w-[400px] w-full p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col gap-8">
      <div className="space-y-2 text-center relative">
        <Link
          href={ROUTES.SIGNIN}
          className="absolute left-0 top-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Reset Password
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Enter your new password below. This page expires in 5 minutes.
        </p>
      </div>

      <ResetPasswordForm />
    </div>
  );
}
