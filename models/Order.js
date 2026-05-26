import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema({
  orderNumber: { type: String, unique: true },
  customer: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
  },
  shippingAddress: {
    line1: { type: String, required: true },
    line2: String,
    city: { type: String, required: true },
    state: { type: String, required: true },
    pincode: { type: String, required: true },
  },
  items: [{
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
    productName: String,
    productImage: String,
    size: String,
    color: String,
    quantity: { type: Number, required: true },
    price: { type: Number, required: true },
    total: { type: Number, required: true },
  }],
  subtotal: { type: Number, required: true },
  shippingCharge: { type: Number, default: 0 },
  discount: { type: Number, default: 0 },
  total: { type: Number, required: true },
  paymentMethod: { 
    type: String, 
    enum: ['cod', 'online', 'upi'],
    default: 'cod'
  },
  paymentStatus: {
    type: String,
    enum: ['pending', 'paid', 'failed', 'refunded'],
    default: 'pending'
  },
  orderStatus: {
    type: String,
    enum: ['placed', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled', 'returned'],
    default: 'placed'
  },
  trackingNumber: { type: String },
  notes: { type: String },
  statusHistory: [{
    status: String,
    note: String,
    timestamp: { type: Date, default: Date.now }
  }],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

OrderSchema.pre('save', async function(next) {
  if (!this.orderNumber) {
    const count = await mongoose.models.Order.countDocuments();
    this.orderNumber = `SFH${String(count + 1001).padStart(5, '0')}`;
  }
  this.updatedAt = new Date();
  next();
});

export default mongoose.models.Order || mongoose.model('Order', OrderSchema);
