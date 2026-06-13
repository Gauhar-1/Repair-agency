import mongoose, { Schema, models, model } from 'mongoose';

const AdminUserSchema = new Schema(
  {
    username: { type: String, required: true, unique: true },
    passwordHash: { type: String, required: true },
    refreshTokenHash: { type: String, default: null },
    failedAttempts: { type: Number, default: 0 },
    lockedUntil: { type: Date, default: null },
  },
  { timestamps: true }
);

const AdminUser = models.AdminUser || model('AdminUser', AdminUserSchema);
export default AdminUser;
