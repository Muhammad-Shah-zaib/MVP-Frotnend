import { createBrowserClient } from "@supabase/ssr";
import { config } from "./config";

let clientInstance = null;

export function getClient() {
  if (!clientInstance) {
    clientInstance = createBrowserClient(config.supabaseUrl, config.supabaseAnonKey);
  }
  return clientInstance;
}

export const supabaseBrowser = getClient();
