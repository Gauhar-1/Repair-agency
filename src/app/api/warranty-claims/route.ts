import { NextRequest, NextResponse } from 'next/server';
import mongoose from 'mongoose';
import dbConnect from '@/lib/mongodb';
import WarrantyClaim from '@/models/WarrantyClaim';
import Job from '@/models/Job';

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { jobId, bookingId, reason } = await req.json();

    if (!jobId || !bookingId || !reason) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Verify warranty is still active
    const job = await Job.findById(jobId);
    if (!job || !job.warranty?.active) {
      return NextResponse.json(
        { error: 'No active warranty found for this job' },
        { status: 400 }
      );
    }

    if (job.warranty.expiresAt && new Date(job.warranty.expiresAt) < new Date()) {
      return NextResponse.json(
        { error: 'Warranty period has expired' },
        { status: 400 }
      );
    }

    const existingClaim = await WarrantyClaim.findOne({ jobId });
    if (existingClaim) {
      return NextResponse.json(
        { error: 'A warranty claim already exists for this job' },
        { status: 409 }
      );
    }

    const claim = await WarrantyClaim.create({
      jobId,
      bookingId,
      reason,
      status: 'requested',
    });

    return NextResponse.json(
      { claim: JSON.parse(JSON.stringify(claim)) },
      { status: 201 }
    );
  } catch (error) {
    console.error('Warranty claim error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
export async function GET() {
  try {
    await dbConnect();
    
    // Check if Booking is loaded
    if (!mongoose.models.Booking) {
      require('@/models/Booking');
    }
    
    const claims = await WarrantyClaim.find()
      .populate('bookingId')
      .sort({ createdAt: -1 });

    return NextResponse.json({ claims });
  } catch (error) {
    console.error('Warranty claim fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
