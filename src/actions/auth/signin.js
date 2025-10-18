"use server";

import { getClient } from "@/lib/Supabase/server";
import { validateEmail, validatePassword } from "@/utils/validators";
import { redirect } from "next/navigation";

export async function signInAction(prevState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");
  const errors = {};

  const emailError = validateEmail(email);
  if (emailError) errors.email = emailError;

  const passwordError = validatePassword(password);
  if (passwordError) errors.password = passwordError;

  if (Object.keys(errors).length > 0) {
    return { success: false, errors };
  }

  const supabase = await getClient();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    console.error("Supabase login error:", error);
    return {
      success: false,
      errors: { root: [error.message] },
    };
  }

  redirect("/");
}
