import mongoose from 'mongoose';

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String },
  image: { url: String, publicId: String },
  parent: { type: String, default: null },
  isActive: { type: Boolean, default: true },
  sortOrder: { type: Number, default: 0 },
  seoTitle: String,
  seoDescription: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Category || mongoose.model('Category', CategorySchema);
