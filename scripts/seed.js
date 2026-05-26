// Run: node scripts/seed.js
// Seeds the database with sample products and admin user

const mongoose = require('mongoose');
require('dotenv').config({ path: '.env.local' });

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/sivakasi_fashion';

const sampleProducts = [
  {
    name: 'Rose Print Anarkali Kurti',
    slug: 'rose-print-anarkali-kurti',
    description: 'Elegant rose print Anarkali kurti made from premium cotton fabric. Perfect for casual and semi-formal occasions.',
    shortDescription: 'Premium cotton rose print Anarkali kurti',
    category: 'womens-kurtis',
    price: 549,
    originalPrice: 799,
    fabric: 'Pure Cotton',
    careInstructions: 'Hand wash cold, dry in shade',
    images: [{ url: 'https://via.placeholder.com/400x500/E91E63/white?text=Kurti+1', alt: 'Rose Print Kurti' }],
    sizes: [{ size: 'S', stock: 10 }, { size: 'M', stock: 15 }, { size: 'L', stock: 8 }, { size: 'XL', stock: 5 }],
    colors: [{ name: 'Rose Pink', hex: '#E91E63' }, { name: 'White', hex: '#FFFFFF' }],
    isActive: true, isFeatured: true, isNewArrival: true,
    seoTitle: 'Rose Print Anarkali Kurti Online | Sivakasi Fashion Hub',
    seoDescription: 'Buy beautiful rose print Anarkali kurti online. Premium cotton, comfortable fit. Free shipping above ₹599.',
    seoKeywords: ['anarkali kurti', 'rose print kurti', 'cotton kurti online', 'womens kurti sivakasi'],
  },
  {
    name: 'Floral Embroidered Cotton Kurti',
    slug: 'floral-embroidered-cotton-kurti',
    description: 'Beautiful floral embroidered kurti for festive occasions. Crafted with fine thread work on soft cotton.',
    shortDescription: 'Festive floral embroidered cotton kurti',
    category: 'womens-kurtis',
    price: 699,
    originalPrice: 999,
    fabric: 'Cotton with embroidery',
    careInstructions: 'Dry clean recommended',
    images: [{ url: 'https://via.placeholder.com/400x500/D4AF37/white?text=Kurti+2', alt: 'Embroidered Kurti' }],
    sizes: [{ size: 'S', stock: 8 }, { size: 'M', stock: 12 }, { size: 'L', stock: 10 }, { size: 'XL', stock: 6 }, { size: 'XXL', stock: 3 }],
    colors: [{ name: 'Gold', hex: '#D4AF37' }, { name: 'Green', hex: '#4CAF50' }],
    isActive: true, isFeatured: true, isBestseller: true,
    seoTitle: 'Floral Embroidered Kurti | Buy Online | Sivakasi Fashion Hub',
    seoDescription: 'Shop beautiful floral embroidered kurti. Perfect for festivals and parties. Premium quality, affordable price.',
    seoKeywords: ['embroidered kurti', 'festive kurti', 'floral kurti online'],
  },
  {
    name: 'Soft Cotton Nightie - Full Length',
    slug: 'soft-cotton-nightie-full-length',
    description: 'Ultra-soft pure cotton nightie for a restful and comfortable sleep. Breathable fabric keeps you cool all night.',
    shortDescription: 'Pure cotton full-length nightie for comfortable sleep',
    category: 'womens-nighties',
    price: 349,
    originalPrice: 499,
    fabric: 'Pure Cotton',
    careInstructions: 'Machine wash gentle cycle',
    images: [{ url: 'https://via.placeholder.com/400x500/FFB6A3/white?text=Nightie', alt: 'Cotton Nightie' }],
    sizes: [{ size: 'S', stock: 20 }, { size: 'M', stock: 25 }, { size: 'L', stock: 18 }, { size: 'XL', stock: 12 }, { size: 'XXL', stock: 8 }],
    colors: [{ name: 'Peach', hex: '#FFB6A3' }, { name: 'Blue', hex: '#90CAF9' }, { name: 'Pink', hex: '#F48FB1' }],
    isActive: true, isFeatured: true, isNewArrival: true,
    seoTitle: 'Cotton Nightie Online | Comfortable Nightwear | Sivakasi Fashion Hub',
    seoDescription: 'Buy comfortable pure cotton nighties online. Breathable, soft fabric. Available in multiple sizes and colors.',
    seoKeywords: ['cotton nightie online', 'womens nightwear', 'comfortable nightie india'],
  },
  {
    name: "Men's Premium Cotton Brief (Pack of 3)",
    slug: 'mens-premium-cotton-brief-pack-3',
    description: 'Premium quality cotton briefs for everyday comfort. Elastic waistband, breathable fabric, perfect fit.',
    shortDescription: 'Pack of 3 premium cotton briefs for men',
    category: 'mens-innerwear',
    price: 299,
    originalPrice: 399,
    fabric: '100% Combed Cotton',
    careInstructions: 'Machine wash warm',
    images: [{ url: 'https://via.placeholder.com/400x500/3A2A2A/white?text=Mens+Brief', alt: 'Mens Brief' }],
    sizes: [{ size: 'S', stock: 30 }, { size: 'M', stock: 40 }, { size: 'L', stock: 35 }, { size: 'XL', stock: 20 }, { size: 'XXL', stock: 10 }],
    colors: [{ name: 'White', hex: '#FFFFFF' }, { name: 'Black', hex: '#212121' }, { name: 'Navy', hex: '#1A237E' }],
    isActive: true, isFeatured: true, isBestseller: true,
    seoTitle: "Men's Cotton Brief Pack of 3 | Buy Online | Sivakasi Fashion Hub",
    seoDescription: "Shop premium men's cotton briefs online. Pack of 3, comfortable fit, breathable fabric. Best prices.",
    seoKeywords: ["mens briefs online", "cotton underwear men", "mens innerwear pack india"],
  },
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    const db = mongoose.connection.db;

    // Clear existing
    await db.collection('products').deleteMany({});
    console.log('🗑️  Cleared products');

    // Insert products
    await db.collection('products').insertMany(sampleProducts.map(p => ({
      ...p,
      totalStock: p.sizes.reduce((a, s) => a + s.stock, 0),
      rating: 0, reviewCount: 0, sold: 0, views: 0,
      createdAt: new Date(), updatedAt: new Date(),
    })));
    console.log(`✅ Inserted ${sampleProducts.length} sample products`);

    // Create admin user if not exists
    const bcrypt = require('bcryptjs');
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@sivakaasifashion.com';
    const adminPass = process.env.ADMIN_PASSWORD || 'Admin@123456';
    const existing = await db.collection('users').findOne({ email: adminEmail });
    if (!existing) {
      await db.collection('users').insertOne({
        name: 'Admin',
        email: adminEmail,
        password: await bcrypt.hash(adminPass, 12),
        role: 'admin',
        isActive: true,
        createdAt: new Date(),
      });
      console.log(`✅ Admin user created: ${adminEmail}`);
    } else {
      console.log(`ℹ️  Admin user already exists: ${adminEmail}`);
    }

    console.log('\n🎉 Database seeded successfully!');
    console.log(`   Admin Login: ${adminEmail} / ${adminPass}`);
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err);
    process.exit(1);
  }
}

seed();
