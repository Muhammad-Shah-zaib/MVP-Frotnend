"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { AuthErrorContent } from "@/components/auth/auth-error/AuthErrorContent";
import SpinnerOverlay from "@/shared/components/SpinnerOverlay";

function AuthErrorInner() {
  const searchParams = useSearchParams();
  const error = searchParams.get("error") || "unknown_error";
  const errorCode = searchParams.get("error_code") || "unknown";
  const errorDescription = searchParams.get("error_description") || "An error occurred";

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
          Authentication Error
        </h1>
      </div>

      <AuthErrorContent
        error={error}
        errorCode={errorCode}
        errorDescription={errorDescription}
      />
    </div>
  );
}

export default function AuthErrorPage() {
  return (
    <Suspense fallback={<SpinnerOverlay />}>
      <AuthErrorInner />
    </Suspense>
  );
}
