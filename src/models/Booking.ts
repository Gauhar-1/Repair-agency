import mongoose, { Schema, models, model } from 'mongoose';

const BookingSchema = new Schema(
  {
    trackingUuid: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    appliance: {
      type: String,
      enum: ['ac', 'refrigerator'],
      required: true,
    },
    issues: {
      type: [String],
      required: true,
    },
    scheduledDate: {
      type: Date,
      required: true,
    },
    timeSlot: {
      type: String,
      enum: ['morning', 'afternoon', 'evening'],
      required: true,
    },
    customer: {
      name: { type: String, required: true },
      phone: { type: String, required: true },
      address: { type: String, required: true },
    },
    status: {
      type: String,
      enum: [
        'pending',
        'confirmed',
        'assigned',
        'en_route',
        'diagnosing',
        'repairing',
        'completed',
      ],
      default: 'confirmed',
    },
    assignedTechnicianId: {
      type: Schema.Types.ObjectId,
      ref: 'Technician',
      default: null,
    },
  },
  { timestamps: true }
);

const Booking = models.Booking || model('Booking', BookingSchema);
export default Booking;
