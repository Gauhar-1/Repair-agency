import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyAccessToken } from '@/lib/auth';

export const config = {
  matcher: ['/admin/:path*', '/api/jobs/:path*', '/api/bookings/:path*'],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Let auth routes pass through seamlessly
  if (pathname.startsWith('/admin/login') || pathname.startsWith('/api/auth/')) {
    return NextResponse.next();
  }

  // ==========================================
  // THE FIX: Check Cookies first, Header second
  // ==========================================
  // 1. Read the HttpOnly cookie set by our secure login route
  let token = request.cookies.get('accessToken')?.value;

  // 2. Fallback for external API calls that might still use the Authorization header
  if (!token) {
    const authHeader = request.headers.get('authorization');
    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    }
  }

  // If absolutely no token is found, kick them out
  if (!token) {
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized - No Token' }, { status: 401 });
    }
    const loginUrl = new URL('/admin/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  try {
    // Verify the JWT payload
    const payload = await verifyAccessToken(token);

    if (!payload || payload.role !== 'admin') {
      throw new Error('Invalid Role or Payload');
    }

    // Token is valid and user is an admin. Let them pass.
    return NextResponse.next();
    
  } catch (error) {
    // If token verification fails (expired or tampered with), redirect to login
    if (pathname.startsWith('/api/')) {
      return NextResponse.json({ error: 'Unauthorized - Invalid Token' }, { status: 401 });
    }
    const loginUrl = new URL('/admin/login', request.url);
    
    // Optional: Clear the invalid cookie to prevent redirect loops
    const response = NextResponse.redirect(loginUrl);
    response.cookies.delete('accessToken');
    
    return response;
  }
}
