# 🌸 Sivakasi Fashion Hub — Full E-Commerce Website

A complete Next.js + MongoDB e-commerce store for women's kurtis, nighties, innerwear and men's innerwear — built for **Sivakasi, Virudhunagar District, Tamil Nadu**.

---

## ✨ Features

### 🛍️ Store (Customer-Facing)
- **Video Hero Section** — full-screen background video with overlay
- **Luxury UI Theme** — Soft Ivory, Rose Pink, Gold, Glassmorphism cards
- **Fonts** — Playfair Display + Poppins + Great Vibes
- **Category Pages** — Women's Kurtis, Nighties, Innerwear, Men's Innerwear
- **Product Pages** — image gallery, size/color selector, add to cart
- **Cart & Checkout** — multi-step checkout, COD/UPI/Card
- **Order Tracking** — order number, status history
- **Search** — full-text search across products
- **Mobile Responsive** — fully optimized for all devices
- **On-Page SEO** — meta tags, OG tags, schema.org, sitemap, robots.txt

### 🔐 Admin Panel (`/admin`)
- Secure JWT login
- **Dashboard** — revenue, orders, product stats, low stock alerts
- **Product Management** — add/edit/delete, image upload via Cloudinary, sizes, colors, SEO fields
- **Order Management** — view, update status, add tracking number
- **Customer List** — view all registered customers
- **Category Management**
- **Settings** — store info, shipping rules

---

## 🚀 Quick Start

### 1. Prerequisites
- Node.js 18+
- MongoDB (local or [MongoDB Atlas](https://mongodb.com/atlas))
- [Cloudinary](https://cloudinary.com) account (free tier works)

### 2. Install Dependencies
```bash
npm install
```

### 3. Configure Environment
Edit `.env.local` with your actual values:
```env
MONGODB_URI=mongodb://localhost:27017/sivakasi_fashion
JWT_SECRET=your_strong_random_secret_here
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
NEXT_PUBLIC_BASE_URL=http://localhost:3000
ADMIN_EMAIL=admin@sivakaasifashion.com
ADMIN_PASSWORD=Admin@123456
```

### 4. Seed Sample Data
```bash
node scripts/seed.js
```

### 5. Add Hero Video
Place your fashion video at:
```
public/videos/hero-fashion.mp4
```
See `public/videos/README.txt` for details.

### 6. Run Development Server
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) for the store.
Open [http://localhost:3000/admin](http://localhost:3000/admin) for the admin panel.

---

## 🌐 Production Deployment (Vercel — Recommended)

1. Push code to GitHub
2. Connect repo to [Vercel](https://vercel.com)
3. Add all `.env.local` variables in Vercel dashboard
4. Deploy — done!

Or deploy to any Node.js server:
```bash
npm run build
npm start
```

---

## 📁 Project Structure

```
sivakasi-store/
├── components/
│   ├── admin/          # Admin UI components
│   └── store/          # Store UI components (Navbar, Footer, ProductCard, Layout)
├── context/            # Cart context (React)
├── lib/                # MongoDB, Auth, Cloudinary utilities
├── models/             # Mongoose models (User, Product, Order, Category, Review)
├── pages/
│   ├── admin/          # Admin pages (dashboard, products, orders, categories)
│   ├── api/            # API routes (products, orders, auth)
│   ├── collections/    # Category listing pages
│   ├── product/        # Product detail pages
│   ├── cart.js         # Cart page
│   ├── checkout.js     # Checkout page
│   └── index.js        # Homepage
├── public/
│   ├── images/         # Place images here
│   └── videos/         # Place hero video here
├── scripts/
│   └── seed.js         # Database seeder
├── styles/
│   └── globals.css     # Global styles + theme variables
├── .env.local          # Environment variables (edit this!)
├── next.config.js
├── tailwind.config.js
└── package.json
```

---

## 🎨 Theme Colors

| Purpose    | Color         | Hex       |
|------------|---------------|-----------|
| Primary    | Hot Pink      | `#E91E63` |
| Secondary  | Gold          | `#D4AF37` |
| Background | Ivory         | `#FFF9F5` |
| Text       | Deep Brown    | `#3A2A2A` |
| Accent     | Floral Peach  | `#FFB6A3` |

---

## 📞 Support

Store: **Sivakasi Fashion Hub**  
Location: Sivakasi, Virudhunagar District, Tamil Nadu  
Built with ❤️ for online-only fashion retail
