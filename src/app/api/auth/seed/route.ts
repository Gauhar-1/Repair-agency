import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongodb';
import AdminUser from '@/models/AdminUser';

export async function GET() {
  // Only allow in development
  if (process.env.NODE_ENV === 'production') {
    return NextResponse.json({ error: 'Not allowed in production' }, { status: 403 });
  }

  try {
    await dbConnect();

    const existingUser = await AdminUser.findOne({ username: 'admin' });
    if (existingUser) {
      return NextResponse.json({ message: 'Admin user already exists' });
    }

    const passwordHash = await bcrypt.hash('ArcticEdge2026!', 12);

    await AdminUser.create({
      username: 'admin',
      passwordHash,
    });

    return NextResponse.json({ message: 'Admin user created successfully', username: 'admin' });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
