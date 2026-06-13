import mongoose, { Schema, models, model } from 'mongoose';

const TechnicianSchema = new Schema(
  {
    name: { type: String, required: true },
    photo: { type: String, default: '/images/tech-default.jpg' },
    experience: { type: String, default: '5+ Years' },
    specializations: { type: [String], default: ['AC', 'Refrigerator'] },
    verified: { type: Boolean, default: true },
    rating: { type: Number, default: 4.8 },
  },
  { timestamps: true }
);

const Technician =
  models.Technician || model('Technician', TechnicianSchema);
export default Technician;
