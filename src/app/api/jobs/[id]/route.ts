import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Job from '@/models/Job';
import Booking from '@/models/Booking';

const ALLOWED_STATUSES = ['assigned', 'en_route', 'diagnosing', 'repairing', 'completed'];
const ALLOWED_MEDIA_KEYS = ['beforePhoto', 'diagnosticVideo', 'afterPhoto'];
const ALLOWED_GRID_AUDIT_KEYS = ['heatExchanger', 'voltageStabilizer', 'wiringIntegrity'];
const ALLOWED_HEALTH_REPORT_KEYS = ['coilEfficiency', 'stabilizerOutput', 'wiringStatus'];

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;

    const job = await Job.findById(id).lean();
    if (!job) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    return NextResponse.json({ job: JSON.parse(JSON.stringify(job)) });
  } catch (error) {
    console.error('Job fetch error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await dbConnect();
    const { id } = await params;
    const body = await req.json();

    const update: Record<string, unknown> = {};

    // Status update validation
    if (body.status) {
      if (!ALLOWED_STATUSES.includes(body.status)) {
        return NextResponse.json({ error: 'Invalid status' }, { status: 400 });
      }
      update.status = body.status;

      if (body.status === 'completed') {
        update.completedAt = new Date();
      }
    }

    // Media update
    if (body.media && typeof body.media === 'object') {
      Object.entries(body.media).forEach(([key, value]) => {
        if (ALLOWED_MEDIA_KEYS.includes(key)) {
          update[`media.${key}`] = value;
        }
      });
    }

    // Grid audit update
    if (body.gridAudit && typeof body.gridAudit === 'object') {
      Object.entries(body.gridAudit).forEach(([key, value]) => {
        if (ALLOWED_GRID_AUDIT_KEYS.includes(key)) {
          update[`gridAudit.${key}`] = value;
        }
      });
    }

    // Health report update
    if (body.healthReport && typeof body.healthReport === 'object') {
      Object.entries(body.healthReport).forEach(([key, value]) => {
        if (ALLOWED_HEALTH_REPORT_KEYS.includes(key)) {
          update[`healthReport.${key}`] = value;
        }
      });
    }

    // Update job first
    const updatedJob = await Job.findByIdAndUpdate(
      id,
      { $set: update },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedJob) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Sync booking status after job update succeeds
    if (body.status) {
      await Booking.findByIdAndUpdate(updatedJob.bookingId, {
        status: body.status,
      });
    }

    return NextResponse.json({
      job: JSON.parse(JSON.stringify(updatedJob)),
    });
  } catch (error) {
    console.error('Job update error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
