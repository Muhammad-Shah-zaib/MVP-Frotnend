"use server";

import { getClient } from "@/lib/Supabase/server";
import { validateFullname } from "@/utils/validators";

export async function updateFullNameAction(prevState, formData) {
  const fullName = formData.get("fullName");
  const errors = {};

  const validateError = validateFullname(fullName);

  if (validateError) {
    errors.fullName = [validateError];
    return {
      success: false,
      errors,
      values: { fullName },
    };
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
      values: { fullName },
    };
  }

  const supabase = await getClient();

  const { error } = await supabase.auth.updateUser({
    data: {
      full_name: fullName.trim(),
    },
  });

  if (error) {
    return {
      success: false,
      errors: { root: [error.message] },
      values: { fullName },
    };
  }

  return {
    success: true,
    message: "Full name updated successfully",
    values: { fullName },
  };
}
