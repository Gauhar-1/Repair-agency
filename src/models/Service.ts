import mongoose, { Schema, models, model } from 'mongoose';

const ServiceSchema = new Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    badge: { type: String, default: null },
    highlighted: { type: Boolean, default: false },
    features: { type: [String], default: [] },
    waiverNote: { type: String, default: null },
  },
  { timestamps: true }
);

const Service = models.Service || model('Service', ServiceSchema);
export default Service;
