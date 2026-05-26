import dbConnect from '../../../lib/mongodb';
import Product from '../../../models/Product';
import { requireAdmin } from '../../../lib/auth';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const product = await Product.findById(id).lean();
      if (!product) return res.status(404).json({ error: 'Not found' });
      return res.status(200).json(product);
    } catch { return res.status(500).json({ error: 'Server error' }); }
  }

  if (req.method === 'PATCH' || req.method === 'PUT') {
    const decoded = requireAdmin(req, res);
    if (!decoded) return;
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, { new: true });
      return res.status(200).json(product);
    } catch { return res.status(500).json({ error: 'Update failed' }); }
  }

  if (req.method === 'DELETE') {
    const decoded = requireAdmin(req, res);
    if (!decoded) return;
    try {
      await Product.findByIdAndDelete(id);
      return res.status(200).json({ message: 'Deleted' });
    } catch { return res.status(500).json({ error: 'Delete failed' }); }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
