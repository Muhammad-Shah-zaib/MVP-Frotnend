"use client";

import { PasswordInput } from "@/shared/inputs/PasswordInput";
import { SubmitButton } from "@/shared/buttons/SubmitButton";
import { resetPasswordAction } from "@/actions/auth/reset-password";
import { useActionState, useState, useEffect } from "react";

const initialState = {
  success: false,
  errors: {},
  values: {}
};

export function ResetPasswordForm() {
  const [formState, action] = useActionState(resetPasswordAction, initialState);
  const [localErrors, setLocalErrors] = useState({});

  useEffect(() => {
    if (formState.errors) {
      setLocalErrors(formState.errors);
    }
  }, [formState.errors]);

  const handlePasswordChange = () => {
    if (localErrors.password) {
      setLocalErrors((prev) => {
        const { password, ...rest } = prev;
        return rest;
      });
    }
  };

  const handleConfirmPasswordChange = () => {
    if (localErrors.confirmPassword) {
      setLocalErrors((prev) => {
        const { confirmPassword, ...rest } = prev;
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
        <PasswordInput 
          name="password" 
          placeholder="New password"
          onChange={handlePasswordChange} 
        />
        {localErrors?.password && (
          <p className="text-sm text-red-500 mt-1">{localErrors.password[0]}</p>
        )}
      </div>

      <div>
        <PasswordInput 
          name="confirmPassword" 
          placeholder="Confirm new password"
          onChange={handleConfirmPasswordChange} 
        />
        {localErrors?.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">{localErrors.confirmPassword[0]}</p>
        )}
      </div>

      <SubmitButton
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
        label="Reset Password"
        loadingLabel="Resetting..."
      />
    </form>
  );
}
