"use server";

import { revalidateTag } from "next/cache";
import { getClient } from "@/lib/Supabase/server";

export async function updateCoverImage(sessionId, coverImageUrl) {
  try {
    const supabase = await getClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from("chat_sessions")
      .update({ cover_image: coverImageUrl })
      .eq("id", sessionId)
      .select()
      .single();

    if (error) {
      console.error("[Update Cover Image] Error:", error);
      return {
        success: false,
        error: error.message,
      };
    }

    if (user) {
      revalidateTag(`chat-sessions-${user.id}`);
    }

    console.log("[Update Cover Image] Success:", data.id);
    return {
      success: true,
      session: data,
    };
  } catch (err) {
    console.error("[Update Cover Image] Unexpected error:", err);
    return {
      success: false,
      error: err.message,
    };
  }
}
