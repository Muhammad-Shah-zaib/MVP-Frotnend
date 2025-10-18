import { createClientForMiddleware } from "./server";

export async function updateSession(request) {
  const { client, response } = createClientForMiddleware(request);

  await client.auth.getUser(); // this update the session from cookies

  return response;
}
