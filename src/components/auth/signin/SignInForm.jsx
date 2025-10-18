"use client";

import { EmailInput } from "@/shared/inputs/EmailInput";
import { PasswordInput } from "@/shared/inputs/PasswordInput";
import { SubmitButton } from "@/shared/buttons/SubmitButton";
import { signInAction } from "@/actions/auth/signin";
import { useActionState, useState, useEffect } from "react";

const initialState = {
  success: false,
  errors: {},
};

export function SignInForm() {
  const [formState, action] = useActionState(signInAction, initialState);
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

  const handlePasswordChange = () => {
    if (localErrors.password) {
      setLocalErrors((prev) => {
        const { password, ...rest } = prev;
        return rest;
      });
    }
  };

  return (
    <form action={action} className="flex flex-col gap-5">
      {localErrors?.root && (
        <div className="text-sm text-red-500 text-center">
          {localErrors.root[0]}
        </div>
      )}
      <div>
        <EmailInput name="email" onChange={handleEmailChange} />
        {localErrors?.email && (
          <p className="text-sm text-red-500 mt-1">{localErrors.email[0]}</p>
        )}
      </div>

      <div>
        <PasswordInput name="password" onChange={handlePasswordChange} />
        {localErrors?.password && (
          <p className="text-sm text-red-500 mt-1">{localErrors.password[0]}</p>
        )}
      </div>

      <SubmitButton
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
        label="Login"
        loadingLabel="Logging In..."
      />
    </form>
  );
}
