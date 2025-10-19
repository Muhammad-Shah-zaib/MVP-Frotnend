"use client";

import { useState, useEffect } from "react";
import { resendConfirmationEmail } from "@/actions/auth/resend-email";

export function ResendEmailButton({ email }) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [isResending, setIsResending] = useState(false);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  const handleResend = async () => {
    if (!email || timeLeft > 0 || isResending) return;

    setIsResending(true);
    const result = await resendConfirmationEmail(email);
    setIsResending(false);

    if (result.success) {
      setTimeLeft(60);
    }
  };

  const isDisabled = timeLeft > 0 || isResending || !email;

  return (
    <button
      onClick={handleResend}
      disabled={isDisabled}
      className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {isResending
        ? "Sending..."
        : timeLeft > 0
        ? `Resend Email (${timeLeft}s)`
        : "Resend Email"}
    </button>
  );
}
