"use client";

import { AlertCircle } from "lucide-react";
import Link from "next/link";

export function AuthErrorContent({ error, errorCode, errorDescription }) {
  const getErrorTitle = () => {
    switch (errorCode) {
      case "otp_expired":
        return "Link Expired";
      case "otp_disabled":
        return "Link Already Used";
      case "access_denied":
        return "Access Denied";
      default:
        return "Authentication Error";
    }
  };

  const getErrorMessage = () => {
    switch (errorCode) {
      case "otp_expired":
        return "Your password reset link has expired. Please request a new one.";
      case "otp_disabled":
        return "This link has already been used. Please request a new one if needed.";
      case "access_denied":
        return "The link is invalid or has expired. Please request a new password reset link.";
      default:
        return errorDescription || "An error occurred during authentication. Please try again.";
    }
  };

  const showRequestNewLink = ["otp_expired", "otp_disabled", "access_denied"].includes(errorCode);

  return (
    <div className="space-y-6">
      <div className="flex flex-col items-center gap-4 text-center">
        <div className="space-y-2">
          <h2 className="text-xl font-semibold text-red-600 dark:text-zinc-100">
            {getErrorTitle()}
          </h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 max-w-sm">
            {getErrorMessage()}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        {showRequestNewLink && (
          <Link
            href="/forgot-password"
            className="w-full py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors text-center"
          >
            Request New Link
          </Link>
        )}
        
        <Link
          href="/signin"
          className="w-full py-2.5 px-4 bg-zinc-100 hover:bg-zinc-200 dark:bg-zinc-800 dark:hover:bg-zinc-700 text-zinc-900 dark:text-zinc-100 font-medium rounded-lg transition-colors text-center"
        >
          Back to Sign In
        </Link>
      </div>
    </div>
  );
}
