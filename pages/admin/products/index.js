import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import Link from 'next/link';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiPlus, FiEdit2, FiTrash2, FiSearch, FiEye } from 'react-icons/fi';

export default function AdminProducts({ products: initialProducts = [] }) {
  const [products, setProducts] = useState(initialProducts);
  const [search, setSearch] = useState('');
  const [catFilter, setCatFilter] = useState('all');

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = catFilter === 'all' || p.category === catFilter;
    return matchSearch && matchCat;
  });

  const handleDelete = async (id) => {
    if (!confirm('Delete this product?')) return;
    try {
      await axios.delete(`/api/products/${id}`);
      setProducts(prev => prev.filter(p => p._id !== id));
      toast.success('Product deleted');
    } catch { toast.error('Delete failed'); }
  };

  const toggleActive = async (id, current) => {
    try {
      await axios.patch(`/api/products/${id}`, { isActive: !current });
      setProducts(prev => prev.map(p => p._id === id ? { ...p, isActive: !current } : p));
      toast.success(current ? 'Product hidden' : 'Product activated');
    } catch { toast.error('Update failed'); }
  };

  return (
    <AdminLayout title="Products">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <h2 className="font-playfair text-xl font-bold text-text-dark">All Products</h2>
          <p className="font-poppins text-xs text-gray-400">{products.length} total products</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary flex items-center gap-2 text-sm px-5 py-2.5">
          <FiPlus size={16} /> Add Product
        </Link>
      </div>
      <div className="bg-white rounded-2xl p-4 border border-gold/10 mb-6 flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FiSearch size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" value={search} onChange={e => setSearch(e.target.value)}
            placeholder="Search products..." className="luxury-input pl-9 py-2.5 text-sm" />
        </div>
        <select value={catFilter} onChange={e => setCatFilter(e.target.value)}
          className="luxury-input text-sm py-2.5 w-full sm:w-52">
          <option value="all">All Categories</option>
          <option value="womens-kurtis">Women's Kurtis</option>
          <option value="womens-nighties">Women's Nighties</option>
          <option value="womens-innerwear">Women's Innerwear</option>
          <option value="mens-innerwear">Men's Innerwear</option>
        </select>
      </div>
      <div className="bg-white rounded-2xl shadow-sm border border-gold/10 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {['Product','Category','Price','Stock','Status','Actions'].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-poppins text-xs font-semibold text-gray-400 uppercase tracking-wider">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {filtered.length > 0 ? filtered.map(p => (
                <tr key={p._id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <img src={p.images?.[0]?.url || '/images/placeholder.jpg'} alt={p.name}
                        className="w-10 h-12 object-cover rounded-lg border border-gold/10" />
                      <div>
                        <p className="font-poppins text-sm font-semibold text-text-dark line-clamp-1">{p.name}</p>
                        <p className="font-poppins text-xs text-gray-400">{p.slug}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3"><span className="font-poppins text-xs text-gray-500 capitalize">{p.category?.replace(/-/g,' ')}</span></td>
                  <td className="px-4 py-3">
                    <span className="font-poppins text-sm font-bold text-primary">₹{p.price?.toLocaleString()}</span>
                    {p.originalPrice > p.price && <span className="block font-poppins text-xs text-gray-400 line-through">₹{p.originalPrice?.toLocaleString()}</span>}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`font-poppins text-sm font-semibold ${p.totalStock===0?'text-red-500':p.totalStock<=5?'text-orange-500':'text-green-600'}`}>{p.totalStock}</span>
                  </td>
                  <td className="px-4 py-3">
                    <button onClick={() => toggleActive(p._id, p.isActive)}
                      className={`badge text-xs cursor-pointer ${p.isActive?'badge-green':'badge-red'}`}>
                      {p.isActive ? 'Active' : 'Hidden'}
                    </button>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <Link href={`/product/${p.slug}`} target="_blank" className="p-1.5 text-gray-400 hover:text-primary rounded-lg hover:bg-primary/10 transition-colors"><FiEye size={15}/></Link>
                      <Link href={`/admin/products/edit/${p._id}`} className="p-1.5 text-gray-400 hover:text-secondary rounded-lg hover:bg-secondary/10 transition-colors"><FiEdit2 size={15}/></Link>
                      <button onClick={() => handleDelete(p._id)} className="p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 transition-colors"><FiTrash2 size={15}/></button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr><td colSpan={6} className="text-center py-12">
                  <p className="font-poppins text-sm text-gray-400">No products found</p>
                  <Link href="/admin/products/new" className="font-poppins text-sm text-primary hover:underline mt-2 inline-block">Add your first product</Link>
                </td></tr>
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
    const { default: Product } = await import('../../../models/Product');
    await dbConnect();
    const products = await Product.find().sort({ createdAt: -1 }).lean();
    return { props: { products: JSON.parse(JSON.stringify(products)) } };
  } catch { return { props: { products: [] } }; }
}
