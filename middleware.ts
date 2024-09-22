import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getSession, logout } from './lib/actions';

export async function middleware(request: NextRequest) {
  const session = await getSession();

  if (!session || !session.isLoggedIn) {
    return NextResponse.redirect(new URL(`${process.env.ROOT_URL}/login`, request.url));
  }

  // Prevent further checks if the request is already for the login page
  if (request.nextUrl.pathname === `${process.env.ROOT_URL}/login`) {
    return NextResponse.next(); // Allow the request to proceed to the login page
  }

  // Make a fetch request to the API route
  const apiUrl = new URL('/api/check-user', request.url);
  const apiResponse = await fetch(apiUrl.href, {
    headers: {
      cookie: request.headers.get('cookie') || '', // Forward the entire cookie header
    },
  });

  // Handle the response from the API
  if (apiResponse.status === 401 || apiResponse.status === 404) {
    const response = NextResponse.redirect(new URL(`${process.env.ROOT_URL}/login`, request.url));
    // Set headers to ensure no caching
    response.headers.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    return response;
  }

  if (apiResponse.ok) {
    return NextResponse.next(); // Proceed if everything is OK
  }

  return NextResponse.redirect(new URL(`${process.env.ROOT_URL}/error`, request.url)); // Redirect on unexpected errors
}

export const config = {
  matcher: ['/dashboard/:path*'],
}