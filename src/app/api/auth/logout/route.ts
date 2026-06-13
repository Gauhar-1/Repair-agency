import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/models/AdminUser';
import { verifyRefreshToken } from '@/lib/auth';

export async function POST(req: NextRequest) {
  try {
    const refreshToken = req.cookies.get('refreshToken')?.value;
    const response = NextResponse.json({ success: true });
    
    response.cookies.set({
      name: 'refreshToken',
      value: '',
      httpOnly: true,
      expires: new Date(0),
      path: '/',
    });

    if (refreshToken) {
      const payload = await verifyRefreshToken(refreshToken);
      if (payload && payload.sub) {
        await dbConnect();
        await AdminUser.findByIdAndUpdate(payload.sub, { refreshTokenHash: null });
      }
    }

    return response;
  } catch (error) {
    console.error('Logout error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
