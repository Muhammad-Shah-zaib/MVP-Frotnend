"use server";

import { getClient } from "@/lib/Supabase/server";
import { validatePassword } from "@/utils/validators";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { ROUTES } from "@/constants/routes";
import { COOKIE_NAMES } from "@/constants/cookies";

export async function resetPasswordAction(prevState, formData) {
  const password = formData.get("password");
  const confirmPassword = formData.get("confirmPassword");
  const errors = {};

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  const confirmPasswordError = validatePassword(confirmPassword);
  if (confirmPasswordError) errors.confirmPassword = confirmPasswordError;

  if (password && confirmPassword && password !== confirmPassword) {
    errors.confirmPassword = ["Passwords do not match"];
  }

  if (Object.keys(errors).length > 0) {
    return { 
      success: false, 
      errors,
      values: {}
    };
  }

  const supabase = await getClient();

  const { error } = await supabase.auth.updateUser({
    password: password,
  });

  if (error) {
    return {
      success: false,
      errors: { root: [error.message] },
      values: {}
    };
  }

  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAMES.PASSWORD_RESET_TOKEN);

  redirect(ROUTES.SIGNIN);
}
