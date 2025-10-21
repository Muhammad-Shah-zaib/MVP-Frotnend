"use client";

import { EmailInput } from "@/shared/inputs/EmailInput";
import { SubmitButton } from "@/shared/buttons/SubmitButton";
import { forgotPasswordAction } from "@/actions/auth/forgot-password";
import { useActionState, useState, useEffect } from "react";
import { EMPTY_STRING } from "@/constants/general";

const initialState = {
  success: false,
  errors: {},
  values: {}
};

export function ForgotPasswordForm() {
  const [formState, action] = useActionState(forgotPasswordAction, initialState);
  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    if (formState.errors) {
      setLocalErrors(formState.errors);
    }
  }, [formState.errors]);

  const handleEmailChange = () => {
    if (localErrors.email) {
      setLocalErrors((prev) => {
        const { email, ...rest } = prev;
        return rest;
      });
    }
  };

  const values = formState?.values || {};

  return (
    <form action={action} className="flex flex-col gap-5">
      {formState.success && (
        <div className="text-sm text-green-600 dark:text-green-400 text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
          Password reset link has been sent to your email
        </div>
      )}

      {localErrors?.root && (
        <div className="text-sm text-red-500 text-center">
          {localErrors.root[0]}
        </div>
      )}

      <div>
        <EmailInput name="email" onChange={handleEmailChange} defaultValue={values.email || EMPTY_STRING} />
        {localErrors?.email && (
          <p className="text-sm text-red-500 mt-1">{localErrors.email[0]}</p>
        )}
      </div>

      <SubmitButton
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
        label="Send Reset Link"
        loadingLabel="Sending..."
      />
    </form>
  );
}
