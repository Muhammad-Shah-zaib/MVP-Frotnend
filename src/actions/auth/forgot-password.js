"use server";

import { getClient } from "@/lib/Supabase/server";
import { validateEmail } from "@/utils/validators";

export async function forgotPasswordAction(prevState, formData) {
  const email = formData.get("email");
  const errors = {};

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  if (Object.keys(errors).length > 0) {
    return { 
      success: false, 
      errors,
      values: { email }
    };
  }

  const supabase = await getClient();

  const { error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) {
    return {
      success: false,
      errors: { root: [error.message] },
      values: { email }
    };
  }

  return {
    success: true,
    errors: {},
    values: { email }
  };
}
