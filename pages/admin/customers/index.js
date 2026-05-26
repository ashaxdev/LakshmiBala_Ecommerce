import AdminLayout from '../../../components/admin/AdminLayout';
import { FiUser } from 'react-icons/fi';

export default function Customers({ customers = [] }) {
  return (
    <AdminLayout title="Customers">
      <h2 className="font-playfair text-xl font-bold text-text-dark mb-6">Customers ({customers.length})</h2>
      <div className="bg-white rounded-2xl border border-gold/10 shadow-sm overflow-hidden">
        {customers.length === 0 ? (
          <div className="py-16 text-center">
            <FiUser size={40} className="mx-auto text-gray-300 mb-3"/>
            <p className="font-poppins text-sm text-gray-400">No customers yet</p>
          </div>
        ) : (
          <table className="w-full">
            <thead><tr className="bg-gray-50">
              {['Name','Email','Phone','Joined','Orders'].map(h=>(
                <th key={h} className="px-4 py-3 text-left font-poppins text-xs font-semibold text-gray-400 uppercase">{h}</th>
              ))}
            </tr></thead>
            <tbody className="divide-y divide-gray-50">
              {customers.map(c=>(
                <tr key={c._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 font-poppins text-sm text-text-dark font-semibold">{c.name}</td>
                  <td className="px-4 py-3 font-poppins text-sm text-gray-500">{c.email}</td>
                  <td className="px-4 py-3 font-poppins text-sm text-gray-500">{c.phone||'—'}</td>
                  <td className="px-4 py-3 font-poppins text-xs text-gray-400">{new Date(c.createdAt).toLocaleDateString('en-IN')}</td>
                  <td className="px-4 py-3 font-poppins text-sm text-primary font-semibold">—</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
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
    const { default: User } = await import('../../../models/User');
    await dbConnect();
    const customers = await User.find({ role:'user' }).sort({ createdAt:-1 }).lean();
    return { props: { customers: JSON.parse(JSON.stringify(customers)) } };
  } catch { return { props: { customers: [] } }; }
}
