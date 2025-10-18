"use server"

import { validateEmail, validatePassword, validateConfirmPassword, validateFullname } from "@/utils/validators";

export async function signUpAction(prevState, formData) {
  await new Promise((resolve) => setTimeout(resolve, 2000))

  const email = formData.get("email")
  const fullname = formData.get("fullname")
  const password = formData.get("password")
  const confirmPassword = formData.get("confirmPassword")

  const errors = {}

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
      }
    }
  }

  return {
    success: true,
    values: {}
  }
}
