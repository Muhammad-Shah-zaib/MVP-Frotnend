import { ForgotPasswordForm } from "@/components/auth/forgot-password/ForgotPasswordForm";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function ForgotPasswordPage() {
  return (
    <div className="max-w-md w-full mx-auto mt-16 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col gap-8">
      <div className="space-y-2 text-center relative">
        <Link
          href="/signin"
          className="absolute left-0 top-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Forgot Password
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          Enter your email address and we&apos;ll send you a link to reset your password
        </p>
      </div>

      <ForgotPasswordForm />

      <div className="w-full text-center text-sm text-zinc-500 dark:text-zinc-400">
        Remember your password?{" "}
        <Link
          href="/signin"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Sign in
        </Link>
      </div>
    </div>
  );
}
