import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Feedback from '@/models/Feedback';
import Job from '@/models/Job';

export async function GET() {
  try {
    await dbConnect();

    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .lean();

    return NextResponse.json({
      feedbacks: JSON.parse(JSON.stringify(feedbacks)),
    });
  } catch (error) {
    console.error('Feedback fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const { jobId, bookingId, rating, comment, customerName, customerPhone } =
      await req.json();

    if (!jobId || !bookingId || !rating || !customerName || !customerPhone) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { error: 'Rating must be between 1 and 5' },
        { status: 400 }
      );
    }

    // Check if feedback already submitted for this job
    const existing = await Feedback.findOne({ jobId });
    if (existing) {
      return NextResponse.json(
        { error: 'Feedback already submitted for this job' },
        { status: 409 }
      );
    }

    // Create feedback entry
    const feedback = await Feedback.create({
      jobId,
      bookingId,
      rating,
      comment: comment || '',
      customerName,
      customerPhone,
    });

    // Activate warranty on the job now that feedback is submitted
    const now = new Date();
    const expires = new Date(now);
    expires.setDate(expires.getDate() + 30);

    await Job.findByIdAndUpdate(jobId, {
      $set: {
        'warranty.active': true,
        'warranty.activatedAt': now,
        'warranty.expiresAt': expires,
      },
    });

    return NextResponse.json(
      { feedback: JSON.parse(JSON.stringify(feedback)) },
      { status: 201 }
    );
  } catch (error) {
    console.error('Feedback creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
