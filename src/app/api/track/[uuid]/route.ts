import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Job from '@/models/Job';
import Technician from '@/models/Technician';
import Feedback from '@/models/Feedback';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ uuid: string }> }
) {
  try {
    await dbConnect();

    const { uuid } = await params;

    const booking = await Booking.findOne({ trackingUuid: uuid }).lean();
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      );
    }

    const [job, technician, feedback] = await Promise.all([
      Job.findOne({ bookingId: booking._id }).lean(),
      booking.assignedTechnicianId
        ? Technician.findById(booking.assignedTechnicianId).lean()
        : Promise.resolve(null),
      Feedback.findOne({ bookingId: booking._id }).lean(),
    ]);

    // Serialize MongoDB documents
    const serialize = (doc: Record<string, unknown> | null) => {
      if (!doc) return null;
      return JSON.parse(JSON.stringify(doc));
    };

    return NextResponse.json({
      booking: serialize(booking as unknown as Record<string, unknown>),
      job: serialize(job as unknown as Record<string, unknown>),
      technician: serialize(technician as unknown as Record<string, unknown>),
      feedback: serialize(feedback as unknown as Record<string, unknown>),
    });
  } catch (error) {
    console.error('Tracking fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
