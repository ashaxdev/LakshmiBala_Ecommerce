import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/Order';
import { requireAdmin, getTokenFromRequest, verifyToken } from '../../../lib/auth';

export default async function handler(req, res) {
  await dbConnect();

  if (req.method === 'POST') {
    try {
      const { customer, shippingAddress, items, subtotal, shippingCharge, total, paymentMethod, notes } = req.body;
      if (!customer?.name || !customer?.email || !customer?.phone) {
        return res.status(400).json({ error: 'Customer details required' });
      }
      const order = await Order.create({
        customer, shippingAddress, items, subtotal, shippingCharge, total, paymentMethod, notes,
        statusHistory: [{ status: 'placed', note: 'Order placed by customer' }],
      });
      return res.status(201).json(order);
    } catch (err) {
      return res.status(500).json({ error: err.message || 'Order creation failed' });
    }
  }

  if (req.method === 'GET') {
    const decoded = requireAdmin(req, res);
    if (!decoded) return;
    try {
      const { status, page = 1, limit = 20 } = req.query;
      const query = status ? { orderStatus: status } : {};
      const orders = await Order.find(query)
        .sort({ createdAt: -1 })
        .limit(Number(limit))
        .skip((Number(page) - 1) * Number(limit))
        .lean();
      const total = await Order.countDocuments(query);
      return res.status(200).json({ orders, total });
    } catch { return res.status(500).json({ error: 'Failed to fetch orders' }); }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
