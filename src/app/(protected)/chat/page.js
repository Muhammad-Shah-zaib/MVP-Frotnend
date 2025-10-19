import { getClient } from "@/lib/Supabase/server";
import { signOutAction } from "@/actions/auth/signout";

async function ChatPage() {
  const supabase = await getClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Chat Page</h1>
        <form action={signOutAction}>
          <button 
            type="submit"
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Sign Out
          </button>
        </form>
      </div>
      
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-6">
        <p className="font-semibold">✅ Protected Route - Authentication Successful!</p>
        <p className="text-sm mt-1">Only authenticated users can see this page.</p>
      </div>
      
      <div className="bg-white shadow rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="space-y-2">
          <div className="flex border-b pb-2">
            <span className="font-semibold w-40">User ID:</span>
            <span className="text-gray-700 font-mono text-sm">{user?.id}</span>
          </div>
          <div className="flex border-b pb-2">
            <span className="font-semibold w-40">Email:</span>
            <span className="text-gray-700">{user?.email}</span>
          </div>
          <div className="flex border-b pb-2">
            <span className="font-semibold w-40">Last Sign In:</span>
            <span className="text-gray-700">{new Date(user?.last_sign_in_at).toLocaleString()}</span>
          </div>
          <div className="flex pb-2">
            <span className="font-semibold w-40">Created At:</span>
            <span className="text-gray-700">{new Date(user?.created_at).toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
        <h3 className="font-semibold text-blue-900 mb-2">🧪 Test the Protection</h3>
        <p className="text-blue-800 text-sm mb-3">
          Try these tests to verify the authentication is working:
        </p>
        <ol className="list-decimal list-inside text-blue-800 text-sm space-y-2">
          <li>Click "Sign Out" - you should be redirected to /signin</li>
          <li>Try accessing /chat without signing in - you should be redirected</li>
          <li>Sign in again - you should be redirected back to /chat</li>
        </ol>
      </div>
    </div>
  )
}

export default ChatPage