"use server";

import { revalidateTag } from "next/cache";
import { CHAT_SESSION_TABLE } from "@/constants/models";
import { getClient } from "@/lib/Supabase/server";

export const deleteSession = async (sessionId) => {
  const supabase = await getClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data, error } = await supabase
    .from(CHAT_SESSION_TABLE)
    .delete()
    .eq("id", sessionId);

  if (error) {
    console.error("[Delete Session] Error:", error);

    return {
      success: false,
      error: error.message,
    };
  }

  if (user) {
    revalidateTag(`chat-sessions-${user.id}`);
  }

  return {
    success: true,
    data: data,
  };
};
