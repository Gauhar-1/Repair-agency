import mongoose, { Schema, models, model } from 'mongoose';

const WarrantyClaimSchema = new Schema(
  {
    jobId: {
      type: Schema.Types.ObjectId,
      ref: 'Job',
      required: true,
    },
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    reason: { type: String, required: true },
    status: {
      type: String,
      enum: ['requested', 'dispatched', 'resolved'],
      default: 'requested',
    },
  },
  { timestamps: true }
);

const WarrantyClaim =
  models.WarrantyClaim || model('WarrantyClaim', WarrantyClaimSchema);
export default WarrantyClaim;
