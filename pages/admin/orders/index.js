import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiEye, FiSearch } from 'react-icons/fi';

const STATUS_COLORS = {
  placed: 'badge-gold', confirmed: 'badge-pink',
  processing: 'bg-blue-100 text-blue-700 border border-blue-300',
  shipped: 'bg-purple-100 text-purple-700 border border-purple-300',
  delivered: 'badge-green', cancelled: 'badge-red', returned: 'badge-red',
};

export default function AdminOrders({ orders: initial = [] }) {
  const [orders, setOrders] = useState(initial);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  const filtered = orders.filter(o => {
    const s = search.toLowerCase();
    const matchSearch = !s || o.orderNumber?.toLowerCase().includes(s) || o.customer?.name?.toLowerCase().includes(s) || o.customer?.phone?.includes(s);
    const matchStatus = statusFilter === 'all' || o.orderStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  return (
    <AdminLayout title="Orders">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-playfair text-xl font-bold text-text-dark">All Orders</h2>
          <p className="font-poppins text-xs text-gray-400">{orders.length} total orders</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl p-4 border border-gold/10 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search by order no, name, phone..." className="luxury-input pl-9 py-2.5 text-sm" />
        </div>
        <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}
          className="luxury-input text-sm py-2.5 w-full sm:w-48">
          <option value="all">All Status</option>
          {['placed','confirmed','processing','shipped','delivered','cancelled'].map(s => (
            <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase()+s.slice(1)}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gold/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Order No','Customer','Items','Total','Payment','Status','Date',''].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-poppins text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length > 0 ? filtered.map(o => (
                <tr key={o._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-poppins text-xs font-bold text-primary">{o.orderNumber}</td>
                  <td className="px-4 py-3">
                    <p className="font-poppins text-xs font-semibold text-text-dark">{o.customer?.name}</p>
                    <p className="font-poppins text-xs text-gray-400">{o.customer?.phone}</p>
                  </td>
                  <td className="px-4 py-3 font-poppins text-xs text-gray-500">{o.items?.length} item(s)</td>
                  <td className="px-4 py-3 font-poppins text-sm font-bold text-text-dark">₹{o.total?.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <span className="font-poppins text-xs uppercase text-gray-500">{o.paymentMethod}</span>
                    <br/>
                    <span className={`font-poppins text-xs font-semibold ${o.paymentStatus==='paid'?'text-green-600':o.paymentStatus==='failed'?'text-red-500':'text-orange-500'}`}>{o.paymentStatus}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`badge text-xs ${STATUS_COLORS[o.orderStatus]||'badge-gold'}`}>{o.orderStatus}</span>
                  </td>
                  <td className="px-4 py-3 font-poppins text-xs text-gray-400">
                    {new Date(o.createdAt).toLocaleDateString('en-IN')}
                  </td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/orders/${o._id}`} className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-primary/10 transition-colors inline-flex">
                      <FiEye size={15}/>
                    </Link>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={8} className="text-center py-12 font-poppins text-sm text-gray-400">No orders found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ req }) {
  const { verifyToken, getTokenFromRequest } = await import('../../../lib/auth');
  const token = getTokenFromRequest({ headers: req.headers });
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== 'admin') return { redirect: { destination: '/admin/login', permanent: false } };
  try {
    const { default: dbConnect } = await import('../../../lib/mongodb');
    const { default: Order } = await import('../../../models/Order');
    await dbConnect();
    const orders = await Order.find().sort({ createdAt: -1 }).lean();
    return { props: { orders: JSON.parse(JSON.stringify(orders)) } };
  } catch { return { props: { orders: [] } }; }
}
