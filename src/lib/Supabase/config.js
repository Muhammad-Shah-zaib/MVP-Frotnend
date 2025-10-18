export const config = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
  supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
};

if (!config.supabaseUrl || !config.supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables");
}
