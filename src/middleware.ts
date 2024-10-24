import { withAuth, type NextRequestWithAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

const publicRoutes = [
  '/',
  '/sign-in',
  '/sign-out',
  '/error',
];

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const path = request.nextUrl.pathname;

    const isPublicRoute = publicRoutes.some(route => path === route);

    const token = request.nextauth.token;

    if (token && (path === '/sign-in' || path === '/sign-up')) {
      return NextResponse.redirect(new URL('/dashboard', request.url));
    }

    if (isPublicRoute) {
      return NextResponse.next();
    }

    if (!token && !isPublicRoute) {
      const signInUrl = new URL('/sign-in', request.url);
      // store the attempted url and redirect after log in
      signInUrl.searchParams.set('callbackUrl', path);
      return NextResponse.redirect(signInUrl);
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: () => true,
    },
  }
);

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|_next/data|favicon.ico).*)',
  ],
};