"use server";

import { getClient } from "@/lib/Supabase/server";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const supabase = await getClient();

  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Sign out error:", error);
    return {
      success: false,
      error: error.message,
    };
  }

  redirect("/signin");
}
