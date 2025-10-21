import { SignInForm } from "@/components/auth/signin/SignInForm";
import { GoogleSignInButton } from "@/components/auth/shared/GoogleSignInButton";
import { DividerWithText } from "@/components/auth/shared/DividerWithText";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="max-w-md w-full mx-auto mt-16 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col gap-8">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Welcome to Artsensei
        </h1>
      </div>

      <GoogleSignInButton />

      <DividerWithText />

      <SignInForm />

      <div className="w-full text-center text-sm text-zinc-500 dark:text-zinc-400">
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="text-blue-600 hover:underline dark:text-blue-400"
        >
          Sign up
        </Link>
      </div>
    </div>
  );
}
