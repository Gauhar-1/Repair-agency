import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';
import Booking from '@/models/Booking';

export async function GET(req: NextRequest) {
  try {
    await dbConnect();

    if (!Booking) {
      console.warn("Booking model not loaded");
    }

    const { searchParams } = new URL(req.url);
    const statusFilter = searchParams.get('status');

    let query: Record<string, unknown>;
    if (statusFilter === 'completed') {
      query = { status: 'completed' };
    } else {
      query = { status: { $ne: 'completed' } };
    }

    const jobs = await Job.find(query)
      .populate('bookingId')
      .sort({ createdAt: -1 })
      .lean();

    const jobsWithBookings = jobs.map((job: any) => {
      const booking = job.bookingId;
      job.bookingId = booking ? booking._id : null;
      return {
        ...JSON.parse(JSON.stringify(job)),
        booking: booking ? JSON.parse(JSON.stringify(booking)) : null,
      };
    });

    return NextResponse.json({ jobs: jobsWithBookings });
  } catch (error) {
    console.error('Jobs fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

