"use server"

import { getClient } from "@/lib/Supabase/server";
import { validateEmail, validatePassword, validateConfirmPassword, validateFullname } from "@/utils/validators";
import { redirect } from "next/navigation";

export async function signUpAction(prevState, formData) {
  const email = formData.get("email");
  const fullname = formData.get("fullname");
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");

  const errors = {};

  const emailError = validateEmail(email);
  if (emailError) {
    errors.email = emailError;
  }

  const fullnameError = validateFullname(fullname);
  if (fullnameError) {
    errors.fullname = fullnameError;
  }

  const passwordError = validatePassword(password);
  if (passwordError) {
    errors.password = passwordError;
  }

  const confirmPasswordError = validateConfirmPassword(password, confirmPassword);
  if (confirmPasswordError) {
    errors.confirmPassword = confirmPasswordError;
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      values: {
        fullname,
        email,
        password,
        confirmPassword,
      }
    };
  }

  const supabase = await getClient();

  const { data: authData, error: signUpError } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullname,
      },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/api/auth/callback`,
    }
  });

  if (signUpError) {
    return {
      success: false,
      errors: { root: [signUpError.message] },
      values: {
        fullname,
        email,
        password,
        confirmPassword,
      }
    };
  }

  if (authData.user && authData.user.identities && authData.user.identities.length === 0) {
    return {
      success: false,
      errors: { email: ["An account with this email already exists"] },
      values: {
        fullname,
        email,
        password,
        confirmPassword,
      }
    };
  }

  redirect("/confirm-email");
}
