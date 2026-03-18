
// src/proxy.ts
import { NextRequest, NextResponse } from 'next/server';

export async function proxy(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/_next') || 
      request.nextUrl.pathname.startsWith('/api/health')) {
    return NextResponse.next();
  }

  console.log(`--> ${request.method} ${request.nextUrl.pathname}`);

  // body 로깅 (POST/PUT/PATCH일 때만)
  if (['POST', 'PUT', 'PATCH'].includes(request.method)) {
    try {
      const cloned = request.clone();
      const body = await cloned.json();
      console.log('Request body:', body);
    } catch {}
  }

  const response = NextResponse.next();
  console.log(response);
  // response body는 가로채기 어려움 → 대부분 Route Handler에서 직접 log
  return response;
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
