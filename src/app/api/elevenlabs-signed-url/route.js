import { getElevenLabsSignedUrl } from "@/actions/elevenlabs";

export async function GET(req) {
  const result = await getElevenLabsSignedUrl();
  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}
