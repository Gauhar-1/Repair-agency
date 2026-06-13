import mongoose, { Schema, models, model } from 'mongoose';

const JobSchema = new Schema(
  {
    bookingId: {
      type: Schema.Types.ObjectId,
      ref: 'Booking',
      required: true,
    },
    technicianId: {
      type: Schema.Types.ObjectId,
      ref: 'Technician',
      required: true,
    },
    status: {
      type: String,
      enum: ['assigned', 'en_route', 'diagnosing', 'repairing', 'completed'],
      default: 'assigned',
    },
    media: {
      beforePhoto: { type: String, default: null },
      diagnosticVideo: { type: String, default: null },
      afterPhoto: { type: String, default: null },
    },
    gridAudit: {
      heatExchanger: {
        type: String,
        enum: ['good', 'warning', 'critical', null],
        default: null,
      },
      voltageStabilizer: {
        type: String,
        enum: ['good', 'warning', 'critical', null],
        default: null,
      },
      wiringIntegrity: {
        type: String,
        enum: ['good', 'warning', 'critical', null],
        default: null,
      },
    },
    healthReport: {
      coilEfficiency: { type: Number, default: null },
      stabilizerOutput: {
        type: String,
        enum: ['stable', 'fluctuating', null],
        default: null,
      },
      wiringStatus: {
        type: String,
        enum: ['optimal', 'degraded', null],
        default: null,
      },
    },
    warranty: {
      active: { type: Boolean, default: false },
      activatedAt: { type: Date, default: null },
      expiresAt: { type: Date, default: null },
    },
    completedAt: { type: Date, default: null },
  },
  { timestamps: true }
);

const Job = models.Job || model('Job', JobSchema);
export default Job;
