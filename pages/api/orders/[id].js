import dbConnect from '../../../lib/mongodb';
import Order from '../../../models/Order';
import { requireAdmin } from '../../../lib/auth';

export default async function handler(req, res) {
  await dbConnect();
  const { id } = req.query;

  if (req.method === 'GET') {
    const decoded = requireAdmin(req, res);
    if (!decoded) return;
    try {
      const order = await Order.findById(id).populate('items.product', 'name images').lean();
      if (!order) return res.status(404).json({ error: 'Order not found' });
      return res.status(200).json(order);
    } catch { return res.status(500).json({ error: 'Server error' }); }
  }

  if (req.method === 'PATCH') {
    const decoded = requireAdmin(req, res);
    if (!decoded) return;
    try {
      const { orderStatus, trackingNumber, note, paymentStatus } = req.body;
      const order = await Order.findById(id);
      if (!order) return res.status(404).json({ error: 'Not found' });
      if (orderStatus) {
        order.orderStatus = orderStatus;
        order.statusHistory.push({ status: orderStatus, note: note || `Status updated to ${orderStatus}` });
      }
      if (trackingNumber) order.trackingNumber = trackingNumber;
      if (paymentStatus) order.paymentStatus = paymentStatus;
      await order.save();
      return res.status(200).json(order);
    } catch { return res.status(500).json({ error: 'Update failed' }); }
  }

  res.status(405).json({ error: 'Method not allowed' });
}
