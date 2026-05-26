import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  password: { type: String, required: true },
  phone: { type: String },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  addresses: [{
    label: String,
    line1: String,
    line2: String,
    city: String,
    state: String,
    pincode: String,
    isDefault: Boolean,
  }],
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  isActive: { type: Boolean, default: true },
  createdAt: { type: Date, default: Date.now },
});

UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

UserSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

export default mongoose.models.User || mongoose.model('User', UserSchema);
