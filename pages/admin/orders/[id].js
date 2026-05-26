import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiArrowLeft, FiSave } from 'react-icons/fi';

const STATUS_OPTIONS = ['placed','confirmed','processing','shipped','delivered','cancelled','returned'];

export default function OrderDetail({ order: initialOrder }) {
  const [order, setOrder] = useState(initialOrder);
  const [status, setStatus] = useState(initialOrder?.orderStatus || '');
  const [payStatus, setPayStatus] = useState(initialOrder?.paymentStatus || '');
  const [tracking, setTracking] = useState(initialOrder?.trackingNumber || '');
  const [note, setNote] = useState('');
  const [saving, setSaving] = useState(false);

  const handleUpdate = async () => {
    setSaving(true);
    try {
      const { data } = await axios.patch(`/api/orders/${order._id}`, {
        orderStatus: status, paymentStatus: payStatus, trackingNumber: tracking, note,
      });
      setOrder(data);
      toast.success('Order updated!');
      setNote('');
    } catch { toast.error('Update failed'); }
    finally { setSaving(false); }
  };

  if (!order) return <AdminLayout title="Order Not Found"><p>Order not found</p></AdminLayout>;

  return (
    <AdminLayout title={`Order ${order.orderNumber}`}>
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/orders" className="p-2 rounded-xl border border-gold/20 hover:border-primary hover:text-primary transition-colors">
          <FiArrowLeft size={18}/>
        </Link>
        <div>
          <h2 className="font-playfair text-xl font-bold text-text-dark">Order #{order.orderNumber}</h2>
          <p className="font-poppins text-xs text-gray-400">{new Date(order.createdAt).toLocaleString('en-IN')}</p>
        </div>
        <span className={`ml-auto badge ${order.orderStatus==='delivered'?'badge-green':order.orderStatus==='cancelled'?'badge-red':'badge-gold'}`}>
          {order.orderStatus}
        </span>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Items */}
          <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
            <h3 className="font-playfair font-bold text-text-dark mb-4">Order Items</h3>
            <div className="space-y-3">
              {order.items?.map((item, i) => (
                <div key={i} className="flex items-center gap-4 pb-3 border-b border-gray-50 last:border-0">
                  <img src={item.productImage || '/images/placeholder.jpg'} alt={item.productName}
                    className="w-14 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <p className="font-poppins text-sm font-semibold text-text-dark">{item.productName}</p>
                    <p className="font-poppins text-xs text-gray-400">
                      {item.size && `Size: ${item.size}`} {item.color && `• ${item.color}`} • Qty: {item.quantity}
                    </p>
                  </div>
                  <span className="font-poppins font-bold text-primary text-sm">₹{item.total?.toLocaleString()}</span>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 space-y-1">
              <div className="flex justify-between font-poppins text-sm text-gray-500"><span>Subtotal</span><span>₹{order.subtotal?.toLocaleString()}</span></div>
              <div className="flex justify-between font-poppins text-sm text-gray-500"><span>Shipping</span><span>{order.shippingCharge===0?'FREE':`₹${order.shippingCharge}`}</span></div>
              <div className="flex justify-between font-poppins font-bold text-base text-text-dark pt-2 border-t"><span>Total</span><span className="text-primary">₹{order.total?.toLocaleString()}</span></div>
            </div>
          </div>

          {/* Status history */}
          <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
            <h3 className="font-playfair font-bold text-text-dark mb-4">Status History</h3>
            <div className="space-y-3">
              {order.statusHistory?.map((h, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-2 h-2 rounded-full bg-primary mt-1.5 shrink-0"/>
                  <div>
                    <p className="font-poppins text-sm font-semibold text-text-dark capitalize">{h.status}</p>
                    {h.note && <p className="font-poppins text-xs text-gray-400">{h.note}</p>}
                    <p className="font-poppins text-xs text-gray-300">{new Date(h.timestamp).toLocaleString('en-IN')}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          {/* Customer */}
          <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
            <h3 className="font-playfair font-bold text-text-dark mb-4">Customer</h3>
            <p className="font-poppins font-semibold text-sm text-text-dark">{order.customer?.name}</p>
            <p className="font-poppins text-sm text-gray-500">{order.customer?.email}</p>
            <p className="font-poppins text-sm text-gray-500">{order.customer?.phone}</p>
            <hr className="my-3 border-gold/10"/>
            <p className="font-poppins text-xs font-semibold text-gray-400 mb-1">Shipping Address</p>
            <p className="font-poppins text-sm text-text-dark">
              {order.shippingAddress?.line1}<br/>
              {order.shippingAddress?.line2 && <>{order.shippingAddress.line2}<br/></>}
              {order.shippingAddress?.city}, {order.shippingAddress?.state}<br/>
              PIN: {order.shippingAddress?.pincode}
            </p>
          </div>

          {/* Update */}
          <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
            <h3 className="font-playfair font-bold text-text-dark mb-4">Update Order</h3>
            <div className="space-y-3">
              <div>
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Order Status</label>
                <select value={status} onChange={e=>setStatus(e.target.value)} className="luxury-input text-sm py-2">
                  {STATUS_OPTIONS.map(s=><option key={s} value={s} className="capitalize">{s}</option>)}
                </select>
              </div>
              <div>
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Payment Status</label>
                <select value={payStatus} onChange={e=>setPayStatus(e.target.value)} className="luxury-input text-sm py-2">
                  {['pending','paid','failed','refunded'].map(s=><option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Tracking Number</label>
                <input type="text" value={tracking} onChange={e=>setTracking(e.target.value)} className="luxury-input text-sm py-2" placeholder="Enter tracking no." />
              </div>
              <div>
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Note (optional)</label>
                <textarea value={note} onChange={e=>setNote(e.target.value)} rows={2} className="luxury-input text-sm py-2 resize-none" placeholder="Add a note..." />
              </div>
              <button onClick={handleUpdate} disabled={saving}
                className="w-full btn-primary py-2.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60">
                <FiSave size={15}/> {saving?'Saving...':'Update Order'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ req, params }) {
  const { verifyToken, getTokenFromRequest } = await import('../../../lib/auth');
  const token = getTokenFromRequest({ headers: req.headers });
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== 'admin') return { redirect: { destination: '/admin/login', permanent: false } };
  try {
    const { default: dbConnect } = await import('../../../lib/mongodb');
    const { default: Order } = await import('../../../models/Order');
    await dbConnect();
    const order = await Order.findById(params.id).lean();
    if (!order) return { notFound: true };
    return { props: { order: JSON.parse(JSON.stringify(order)) } };
  } catch { return { notFound: true }; }
}
