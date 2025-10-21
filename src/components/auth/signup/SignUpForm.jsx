"use client";

import { EmailInput } from "@/shared/inputs/EmailInput";
import { PasswordInput } from "@/shared/inputs/PasswordInput";
import { SubmitButton } from "@/shared/buttons/SubmitButton";
import { signUpAction } from "@/actions/auth/signup";
import { useActionState, useEffect } from "react";
import { FullnameInput } from "@/shared/inputs/FullnameInput";
import { EMPTY_STRING } from "@/constants/general";

export function SignUpForm() {
  const [formState, action] = useActionState(signUpAction, {
    errors: {},
    success: false,
    values: {}
  });
  const errors = formState?.errors || {};
  const values = formState?.values || {};

  useEffect(() => {
    if (values.email) {
      sessionStorage.setItem("signup_email", values.email);
    }
  }, [values.email]);

  return (
    <form action={action} className="flex flex-col gap-5">
      <div>
  <FullnameInput name="fullname" defaultValue={values.fullname || EMPTY_STRING} />
        {errors.fullname && (
          <p className="text-sm text-red-500 mt-1">{errors.fullname[0]}</p>
        )}
      </div>
      <div>
  <EmailInput name="email" defaultValue={values.email || EMPTY_STRING} />
        {errors.email && (
          <p className="text-sm text-red-500 mt-1">{errors.email[0]}</p>
        )}
      </div>

      <div>
        <PasswordInput name="password" />
        {errors.password && (
          <p className="text-sm text-red-500 mt-1">{errors.password[0]}</p>
        )}
      </div>

      <div>
        <PasswordInput name="confirmPassword" placeholder="Confirm Password" />
        {!errors.password && errors.confirmPassword && (
          <p className="text-sm text-red-500 mt-1">
            {errors.confirmPassword[0]}
          </p>
        )}
      </div>

      {errors.root && (
        <div className="text-sm text-red-500 text-center">{errors.root[0]}</div>
      )}

      <SubmitButton
        className="bg-blue-500 hover:bg-blue-600 text-white font-medium"
        label="Sign Up"
        loadingLabel="Creating Account..."
      />
    </form>
  );
}
