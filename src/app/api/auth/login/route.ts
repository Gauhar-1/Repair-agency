import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/models/AdminUser';
import { signAccessToken, signRefreshToken } from '@/lib/auth';
import { checkRateLimit } from '@/lib/rateLimit';

export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1';
    
    if (!checkRateLimit(ip)) {
      return NextResponse.json({ error: 'Too many attempts. Try again in 15 minutes.' }, { status: 429 });
    }

    await dbConnect();

    const { username, password } = await req.json();

    if (!username || !password) {
      return NextResponse.json({ error: 'Username and password required' }, { status: 400 });
    }

    const user = await AdminUser.findOne({ username });

    if (!user) {
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    if (user.lockedUntil && user.lockedUntil > new Date()) {
      return NextResponse.json({ error: 'Account locked. Try again later.' }, { status: 403 });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid) {
      user.failedAttempts += 1;
      if (user.failedAttempts >= 5) {
        user.lockedUntil = new Date(Date.now() + 15 * 60 * 1000); // Lock for 15 minutes
      }
      await user.save();
      return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
    }

    // Reset failed attempts
    user.failedAttempts = 0;
    user.lockedUntil = null;

    const accessToken = await signAccessToken({ sub: user._id.toString(), role: 'admin' });
    const refreshToken = await signRefreshToken({ sub: user._id.toString() });

    // Store hash of refresh token
    user.refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await user.save();

    const response = NextResponse.json({ accessToken });

    response.cookies.set({
      name: 'accessToken',
      value: accessToken,
      httpOnly: true, // Prevents XSS attacks
      secure: process.env.NODE_ENV === 'production', // Only sends over HTTPS in prod
      sameSite: 'strict', // Prevents CSRF attacks
      maxAge: 15 * 60, // 15 minutes (short-lived for security)
      path: '/',
    });
    
    // Set refresh token cookie
    response.cookies.set({
      name: 'refreshToken',
      value: refreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
