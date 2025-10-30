"use server";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

export async function getElevenLabsSignedUrl() {
  try {
    const url = `${BACKEND_URL}/api/elevenlabs/get-signed-url`;
    console.log("Fetching ElevenLabs signed URL from:", url);
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    });

    console.log("RESPOSNE ->", response);

    if (!response.ok) {
      throw new Error(`Failed to fetch signed URL: ${response.status}`);
    }

    const data = await response.json();
    console.log("DATA -> ", data);

    return {
      success: true,
      signedUrl: data.signedUrl,
      agentId: data.agentId,
    };
  } catch (error) {
    console.error("Error fetching ElevenLabs signed URL:", error);

    return {
      success: false,
      error: error.message || "Failed to get signed URL",
    };
  }
}

export const uploadToServer = async (file, conversationId, userId) => {
  if (!file) return null;

  console.info("[Upload] uploading image to server", file);
  try {
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5005";
    const url = `${backendUrl.replace(/\/$/, "")}/upload_image`;
    const fd = new FormData();
    fd.append("image", file);

    const conv =
      conversationId ||
      (typeof window !== "undefined" && window.LMA_CONVERSATION_ID) ||
      null;
    if (!conv) {
      console.warn(
        "[Upload] No conversation_id available for upload; the server expects conversation_id in form-data"
      );
    } else {
      fd.append("conversation_id", conv);
    }

    const uid =
      userId || (typeof window !== "undefined" && window.LMA_USER_ID) || null;
    if (uid) fd.append("user_id", uid);

    const resp = await fetch(url, {
      method: "POST",
      body: fd,
    });

    if (!resp.ok) {
      console.error("[Upload] server returned error", resp.status);
      return null;
    }

    const data = await resp.json();
    console.info("[Upload] image uploaded to server", data);
    return data;
  } catch (err) {
    console.error("[Upload] failed to upload image to server", err);
    return null;
  }
};
