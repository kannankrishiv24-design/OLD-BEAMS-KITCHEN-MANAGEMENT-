import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const { data: { user } } = await supabase.auth.getUser();

  // Role-based route protection
  const path = request.nextUrl.pathname;
  
  // Public routes
  if (path === '/' || path.startsWith('/login') || path.startsWith('/manifest.json')) {
    if (user && (path === '/' || path.startsWith('/login'))) {
      // If logged in and trying to access home/login, redirect to their role dashboard
      const role = user.app_metadata?.user_role || 'kitchen_assistant';
      return NextResponse.redirect(new URL(`/dashboard/${role.replace('_', '-')}`, request.url));
    }
    return response;
  }

  // Protected routes
  if (!user) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Prevent users from accessing other roles' dashboards
  if (path.startsWith('/dashboard/')) {
    const role = user.app_metadata?.user_role || 'kitchen_assistant';
    const rolePathSegment = role.replace('_', '-');
    
    // Example: If a waiter tries to access /dashboard/manager, redirect them back to /dashboard/waiter
    if (!path.startsWith(`/dashboard/${rolePathSegment}`)) {
      return NextResponse.redirect(new URL(`/dashboard/${rolePathSegment}`, request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
