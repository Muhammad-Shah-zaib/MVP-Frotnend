"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ConfirmEmailContent } from "@/components/auth/confirm-email/ConfirmEmailContent";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function ConfirmEmailPage() {
  const [email, setEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    const storedEmail = sessionStorage.getItem("signup_email");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      router.push("/signin");
    }

    return () => {
      sessionStorage.removeItem("signup_email");
    };
  }, [router]);

  if (!email) {
    return null;
  }

  return (
    <div className="max-w-md w-full mx-auto mt-16 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm flex flex-col gap-8">
      <div className="space-y-2 text-center relative">
        <Link
          href="/signup"
          className="absolute left-0 top-0 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-100">
          Confirm Email
        </h1>
      </div>

      <ConfirmEmailContent email={email} />
    </div>
  );
}
