# Supabase Singleton Service

Clean, scalable singleton implementation for Supabase in Next.js.

## Structure

```
src/lib/Supabase/
├── config.js          # Environment configuration
├── server.js          # Server-side singleton
├── client.js          # Browser-side singleton
├── middleware.js      # Middleware service
└── index.js           # Clean exports
```

## Server Usage

```javascript
import { supabaseServer } from "@/lib/Supabase/server";

export async function myServerAction() {
  const supabase = await supabaseServer.getClient();
  
  const { data, error } = await supabase.auth.getUser();
  
  return data;
}
```

## Client Usage

```javascript
import { supabaseBrowser } from "@/lib/Supabase/client";

export function MyComponent() {
  const handleClick = async () => {
    const { data } = await supabaseBrowser.auth.getUser();
    console.log(data);
  };
  
  return <button onClick={handleClick}>Get User</button>;
}
```

## Middleware

The middleware automatically refreshes tokens on every request.

```javascript
import { updateSession } from "@/lib/Supabase/middleware";

export async function middleware(request) {
  return await updateSession(request);
}
```

## Benefits

- Single instance per environment (server/browser)
- Automatic connection reuse
- Clean imports
- Scalable architecture
- No repeated client creation overhead

## How It Works

### Server Singleton
- Creates one instance per request context
- Reuses the same client for all server actions in that request
- Handles cookies automatically

### Browser Singleton
- Creates one instance for the entire app lifecycle
- All client components share the same connection
- Optimized for browser environment

### Middleware Singleton
- Separate instance for middleware context
- Handles token refresh transparently
- Updates cookies on every request
