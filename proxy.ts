import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const BACKEND_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/api';

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (pathname.startsWith('/api/')) {
    const targetPath = pathname.replace(/^\/api/, '');
    const targetUrl = `${BACKEND_BASE}${targetPath}${search}`;

    const headers = new Headers(request.headers);
    headers.set('host', new URL(BACKEND_BASE).host);

    return NextResponse.rewrite(new URL(targetUrl), {
      request: { headers },
    });
  }

  return NextResponse.next();
}

export function middleware(request: NextRequest) {
  return proxy(request);
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)'],
};