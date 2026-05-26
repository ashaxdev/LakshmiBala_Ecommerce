import mongoose from 'mongoose';

const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  shortDescription: { type: String },
  category: { 
    type: String, 
    required: true,
    enum: ['womens-kurtis', 'womens-nighties', 'womens-innerwear', 'mens-innerwear']
  },
  subcategory: { type: String },
  price: { type: Number, required: true },
  originalPrice: { type: Number },
  discount: { type: Number, default: 0 },
  images: [{ 
    url: String, 
    publicId: String,
    alt: String 
  }],
  sizes: [{
    size: String,
    stock: { type: Number, default: 0 }
  }],
  colors: [{ 
    name: String, 
    hex: String 
  }],
  fabric: { type: String },
  careInstructions: { type: String },
  brand: { type: String, default: 'Sivakasi Fashion Hub' },
  tags: [String],
  seoTitle: { type: String },
  seoDescription: { type: String },
  seoKeywords: [String],
  isActive: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: false },
  isNewArrival: { type: Boolean, default: false },
  isBestseller: { type: Boolean, default: false },
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  totalStock: { type: Number, default: 0 },
  sold: { type: Number, default: 0 },
  views: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

ProductSchema.pre('save', function(next) {
  this.totalStock = this.sizes.reduce((acc, s) => acc + s.stock, 0);
  this.updatedAt = new Date();
  next();
});

ProductSchema.index({ name: 'text', description: 'text', tags: 'text' });
ProductSchema.index({ category: 1, isActive: 1 });
ProductSchema.index({ slug: 1 });

export default mongoose.models.Product || mongoose.model('Product', ProductSchema);
