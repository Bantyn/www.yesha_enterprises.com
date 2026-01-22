import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Simple in-memory cache for maintenance status to reduce DB hits
// Note: This cache is per-instance/lambda, so might not be perfectly consistent immediately across all nodes, 
// but sufficient for maintenance mode.
let maintenanceCache = {
  isActive: false,
  lastCheck: 0
};

const CACHE_TTL = 60 * 1000; // 1 minute

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Bypass for admin, api, static files, and maintenance page itself
  if (
    pathname.startsWith('/admin') ||
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon.ico') ||
    pathname.startsWith('/images') ||
    pathname === '/maintenance'
  ) {
    return NextResponse.next();
  }

  // Check maintenance status
  // In a real edge middleware, connecting to MongoDB might be tricky without Data API.
  // We will attempt to fetch from our own API endpoint which runs in Node.
  // However, self-fetching can be problematic.
  
  // ALTERNATIVE: For now, we will skip the DB check in Middleware to ensure stability 
  // and avoiding Edge Runtime errors with MongoDB driver.
  // If the user strictly needs this, they should use a dedicated Edge store (Redis/Vercel Edge Config).
  
  // To strictly follow the plan, I would adding the check here.
  // But given I cannot guarantee MongoDB works in Edge Middleware in this environment:
  // I will check for a specific cookie "MAINTENANCE_MODE" or similar that could be set? 
  // No, that's easy to bypass.
  
  // Let's try to query the DB using a fetch to a simplified public endpoint?
  // We can't easily.
  
  // PLAN B: For this task, I will implement the maintenance check in the Root Layout 
  // (Server Component) as a redirect. It's safer for this stack.
  // I'll leave the middleware for other potential uses or strict rewrites if I can make it work later.
  
  // Pass the current URL to the layout via headers
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-url', request.url);
  requestHeaders.set('x-pathname', pathname);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: '/:path*',
};
