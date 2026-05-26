import AdminLayout from '../../components/admin/AdminLayout';
import Link from 'next/link';
import { FiPackage, FiShoppingBag, FiUsers, FiDollarSign, FiArrowUp, FiArrowDown, FiEye } from 'react-icons/fi';

const statusColors = {
  placed: 'badge-gold',
  confirmed: 'badge-pink',
  processing: 'bg-blue-100 text-blue-700 border-blue-300',
  shipped: 'bg-purple-100 text-purple-700 border-purple-300',
  delivered: 'badge-green',
  cancelled: 'badge-red',
};

export default function AdminDashboard({ stats = {}, recentOrders = [], lowStock = [] }) {
  const cards = [
    {
      title: 'Total Revenue',
      value: `₹${(stats.revenue || 0).toLocaleString()}`,
      icon: FiDollarSign,
      change: '+12.5%',
      up: true,
      color: 'from-primary to-rose-pink',
      bg: 'bg-red-50',
    },
    {
      title: 'Total Orders',
      value: stats.orders || 0,
      icon: FiShoppingBag,
      change: '+8.2%',
      up: true,
      color: 'from-secondary to-yellow-400',
      bg: 'bg-yellow-50',
    },
    {
      title: 'Products',
      value: stats.products || 0,
      icon: FiPackage,
      change: `${stats.lowStockCount || 0} low stock`,
      up: false,
      color: 'from-purple-500 to-violet-500',
      bg: 'bg-purple-50',
    },
    {
      title: 'Customers',
      value: stats.customers || 0,
      icon: FiUsers,
      change: '+5 this week',
      up: true,
      color: 'from-green-500 to-emerald-500',
      bg: 'bg-green-50',
    },
  ];

  return (
    <AdminLayout title="Dashboard">
      {/* Welcome */}
      <div className="mb-8">
        <h2 className="font-playfair text-2xl font-bold text-text-dark mb-1">Good morning! 👋</h2>
        <p className="font-poppins text-sm text-gray-400">Here's what's happening at Sivakasi Fashion Hub today.</p>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {cards.map(({ title, value, icon: Icon, change, up, color, bg }) => (
          <div key={title} className="bg-white rounded-2xl p-5 shadow-sm border border-gold/10 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                <Icon size={20} className="text-white" />
              </div>
              <span className={`flex items-center gap-1 font-poppins text-xs font-semibold ${up ? 'text-green-600' : 'text-orange-500'}`}>
                {up ? <FiArrowUp size={12} /> : <FiArrowDown size={12} />}
                {change}
              </span>
            </div>
            <p className="font-playfair text-2xl font-bold text-text-dark">{value}</p>
            <p className="font-poppins text-xs text-gray-400 mt-1">{title}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gold/10 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gold/10">
            <h3 className="font-playfair font-bold text-text-dark">Recent Orders</h3>
            <Link href="/admin/orders" className="font-poppins text-xs text-primary hover:underline flex items-center gap-1">
              View All <FiEye size={12} />
            </Link>
          </div>
          <div className="overflow-x-auto">
            {recentOrders.length > 0 ? (
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50">
                    {['Order', 'Customer', 'Amount', 'Status', ''].map(h => (
                      <th key={h} className="px-4 py-3 text-left font-poppins text-xs font-semibold text-gray-400 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {recentOrders.map(order => (
                    <tr key={order._id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 font-poppins text-xs font-semibold text-primary">{order.orderNumber}</td>
                      <td className="px-4 py-3">
                        <p className="font-poppins text-xs text-text-dark">{order.customer?.name}</p>
                        <p className="font-poppins text-xs text-gray-400">{order.customer?.phone}</p>
                      </td>
                      <td className="px-4 py-3 font-poppins text-xs font-bold text-text-dark">₹{order.total?.toLocaleString()}</td>
                      <td className="px-4 py-3">
                        <span className={`badge text-xs ${statusColors[order.orderStatus] || 'badge-gold'}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/orders/${order._id}`} className="text-primary hover:text-primary-dark">
                          <FiEye size={14} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-10 text-center">
                <p className="font-poppins text-sm text-gray-400">No orders yet</p>
              </div>
            )}
          </div>
        </div>

        {/* Low Stock */}
        <div className="bg-white rounded-2xl shadow-sm border border-gold/10 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gold/10">
            <h3 className="font-playfair font-bold text-text-dark">Low Stock Alert</h3>
            <Link href="/admin/products" className="font-poppins text-xs text-primary hover:underline">Manage</Link>
          </div>
          <div className="p-4 space-y-3">
            {lowStock.length > 0 ? lowStock.map(p => (
              <div key={p._id} className="flex items-center gap-3 p-3 rounded-xl bg-red-50 border border-red-100">
                <img src={p.images?.[0]?.url || '/images/placeholder.jpg'} alt={p.name}
                  className="w-10 h-12 object-cover rounded-lg" />
                <div className="flex-1 min-w-0">
                  <p className="font-poppins text-xs font-semibold text-text-dark line-clamp-1">{p.name}</p>
                  <p className="font-poppins text-xs text-red-500">Only {p.totalStock} left</p>
                </div>
              </div>
            )) : (
              <p className="font-poppins text-sm text-gray-400 text-center py-6">All products well-stocked ✓</p>
            )}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { href: '/admin/products/new', label: 'Add Product', emoji: '➕' },
          { href: '/admin/orders', label: 'View Orders', emoji: '📦' },
          { href: '/admin/categories', label: 'Categories', emoji: '🏷️' },
          { href: '/', label: 'View Store', emoji: '🛍️', external: true },
        ].map(a => (
          <Link key={a.href} href={a.href} target={a.external ? '_blank' : undefined}
            className="bg-white rounded-2xl p-4 border border-gold/10 hover:border-primary/30 hover:shadow-md transition-all flex items-center gap-3 group">
            <span className="text-2xl">{a.emoji}</span>
            <span className="font-poppins text-sm font-semibold text-text-dark group-hover:text-primary transition-colors">{a.label}</span>
          </Link>
        ))}
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ req, res }) {
  const { verifyToken, getTokenFromRequest } = await import('../../lib/auth');
  const token = getTokenFromRequest({ headers: req.headers });
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== 'admin') {
    return { redirect: { destination: '/admin/login', permanent: false } };
  }

  try {
    const { default: dbConnect } = await import('../../lib/mongodb');
    const { default: Order } = await import('../../models/Order');
    const { default: Product } = await import('../../models/Product');
    const { default: User } = await import('../../models/User');
    await dbConnect();

    const [orderCount, productCount, customerCount, revenueData, recentOrders, lowStock] = await Promise.all([
      Order.countDocuments(),
      Product.countDocuments({ isActive: true }),
      User.countDocuments({ role: 'user' }),
      Order.aggregate([{ $match: { paymentStatus: 'paid' } }, { $group: { _id: null, total: { $sum: '$total' } } }]),
      Order.find().sort({ createdAt: -1 }).limit(8).lean(),
      Product.find({ totalStock: { $lte: 5, $gt: 0 }, isActive: true }).limit(5).lean(),
    ]);

    return {
      props: {
        stats: {
          orders: orderCount,
          products: productCount,
          customers: customerCount,
          revenue: revenueData[0]?.total || 0,
          lowStockCount: lowStock.length,
        },
        recentOrders: JSON.parse(JSON.stringify(recentOrders)),
        lowStock: JSON.parse(JSON.stringify(lowStock)),
      }
    };
  } catch {
    return { props: { stats: {}, recentOrders: [], lowStock: [] } };
  }
}
