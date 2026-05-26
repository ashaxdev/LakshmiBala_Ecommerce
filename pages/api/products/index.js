import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';
import { requireAdmin } from '../../../lib/auth';
import formidable from 'formidable';
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

export const config = { api: { bodyParser: false } };

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function uploadToCloudinary(filePath) {
  const result = await cloudinary.uploader.upload(filePath, {
    folder: 'sivakasi-fashion',
    transformation: [{ width: 800, height: 1000, crop: 'fill', gravity: 'auto' }, { quality: 'auto' }],
  });
  return { url: result.secure_url, publicId: result.public_id };
}

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'GET') {
    try {
      const { category, featured, newArrival, search, limit = 20, page = 1 } = req.query;
      const query = { isActive: true };
      if (category && category !== 'all') query.category = category;
      if (featured === 'true') query.isFeatured = true;
      if (newArrival === 'true') query.isNewArrival = true;
      if (search) query.$text = { $search: search };

      const products = await Product.find(query)
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit))
        .lean();

      const total = await Product.countDocuments(query);
      return res.status(200).json({ products, total, pages: Math.ceil(total / limit) });
    } catch (err) {
      return res.status(500).json({ error: 'Failed to fetch products' });
    }
  }

  if (req.method === 'POST') {
    const decoded = requireAdmin(req, res);
    if (!decoded) return;

    const form = formidable({ multiples: true, keepExtensions: true });
    form.parse(req, async (err, fields, files) => {
      if (err) return res.status(400).json({ error: 'Form parse error' });

      try {
        const getField = (k) => Array.isArray(fields[k]) ? fields[k][0] : fields[k];

        const imageFiles = files.images ? (Array.isArray(files.images) ? files.images : [files.images]) : [];
        const uploadedImages = await Promise.all(
          imageFiles.map(async (f) => {
            const result = await uploadToCloudinary(f.filepath);
            try { fs.unlinkSync(f.filepath); } catch {}
            return result;
          })
        );

        const slug = getField('slug') || getField('name')?.toLowerCase().replace(/[^a-z0-9]+/g, '-');
        let finalSlug = slug;
        let count = 1;
        while (await Product.findOne({ slug: finalSlug })) {
          finalSlug = `${slug}-${count++}`;
        }

        const product = await Product.create({
          name: getField('name'),
          slug: finalSlug,
          description: getField('description'),
          shortDescription: getField('shortDescription'),
          category: getField('category'),
          price: Number(getField('price')),
          originalPrice: Number(getField('originalPrice')) || undefined,
          fabric: getField('fabric'),
          careInstructions: getField('careInstructions'),
          brand: getField('brand') || 'Sivakasi Fashion Hub',
          sizes: JSON.parse(getField('sizes') || '[]'),
          colors: JSON.parse(getField('colors') || '[]'),
          images: uploadedImages,
          seoTitle: getField('seoTitle'),
          seoDescription: getField('seoDescription'),
          seoKeywords: JSON.parse(getField('seoKeywords') || '[]'),
          isActive: getField('isActive') !== 'false',
          isFeatured: getField('isFeatured') === 'true',
          isNewArrival: getField('isNewArrival') === 'true',
          isBestseller: getField('isBestseller') === 'true',
        });

        return res.status(201).json(product);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message || 'Failed to create product' });
      }
    });
    return;
  }

  res.status(405).json({ error: 'Method not allowed' });
}
