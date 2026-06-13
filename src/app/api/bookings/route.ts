import { NextRequest, NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';
import dbConnect from '@/lib/mongodb';
import Booking from '@/models/Booking';
import Job from '@/models/Job';
// Note: We removed the Technician import because we no longer auto-assign.

export async function POST(req: NextRequest) {
  try {
    await dbConnect();

    const body = await req.json();
    const { appliance, issues, scheduledDate, timeSlot, customer } = body;

    // Validate required fields
    if (!appliance || !issues?.length || !scheduledDate || !timeSlot || !customer?.name || !customer?.phone || !customer?.address) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const trackingUuid = uuidv4();

    // 1. Create booking in 'pending' state, unassigned.
    const booking = await Booking.create({
      trackingUuid,
      appliance,
      issues,
      scheduledDate: new Date(scheduledDate),
      timeSlot,
      customer,
      status: 'pending', // Corrected to match the new Admin workflow
      assignedTechnicianId: null, // Left null for the Admin to assign later
    });

    // 2. Create associated job in 'pending' state, removing deprecated fields.
    await Job.create({
      bookingId: booking._id,
      technicianId: null, // Left null for the Admin to assign later
      status: 'pending', // Corrected to match the 3-stage flow
      warranty: {
        active: false,
        activatedAt: null,
        expiresAt: null,
      },
      // Removed media, gridAudit, and healthReport as requested
    });

    return NextResponse.json(
      { trackingUuid, bookingId: booking._id.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error('Booking creation error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}