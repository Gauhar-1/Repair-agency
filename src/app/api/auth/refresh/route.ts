import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/models/AdminUser';
import { signAccessToken, signRefreshToken, verifyRefreshToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;

    if (!refreshToken) {
      return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
    }

    const payload = await verifyRefreshToken(refreshToken);

    if (!payload || !payload.sub) {
      return NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }

    await dbConnect();
    const user = await AdminUser.findById(payload.sub);

    if (!user || !user.refreshTokenHash) {
      return NextResponse.json({ error: 'User not found or session revoked' }, { status: 401 });
    }

    const isValid = await bcrypt.compare(refreshToken, user.refreshTokenHash);

    if (!isValid) {
      // Possible token reuse / hijack attempt. Revoke all sessions.
      user.refreshTokenHash = null;
      await user.save();
      return NextResponse.json({ error: 'Invalid refresh token. Session revoked.' }, { status: 401 });
    }

    const newAccessToken = await signAccessToken({ sub: user._id.toString(), role: 'admin' });
    const newRefreshToken = await signRefreshToken({ sub: user._id.toString() });

    user.refreshTokenHash = await bcrypt.hash(newRefreshToken, 10);
    await user.save();

    const response = NextResponse.json({ accessToken: newAccessToken });
    
    response.cookies.set({
      name: 'refreshToken',
      value: newRefreshToken,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60,
      path: '/',
    });

    return response;

  } catch (error) {
    console.error('Refresh token error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
