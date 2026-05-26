import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import toast from 'react-hot-toast';
import { FiPlus, FiTrash2 } from 'react-icons/fi';

const DEFAULT_CATS = [
  { _id:'1', name:"Women's Kurtis", slug:'womens-kurtis', isActive:true },
  { _id:'2', name:"Women's Nighties", slug:'womens-nighties', isActive:true },
  { _id:'3', name:"Women's Innerwear", slug:'womens-innerwear', isActive:true },
  { _id:'4', name:"Men's Innerwear", slug:'mens-innerwear', isActive:true },
];

export default function Categories() {
  const [cats, setCats] = useState(DEFAULT_CATS);
  const [form, setForm] = useState({ name:'', slug:'' });
  const addCat = () => {
    if (!form.name) return;
    setCats(c=>[...c,{_id:Date.now().toString(),...form,slug:form.slug||form.name.toLowerCase().replace(/\s+/g,'-'),isActive:true}]);
    setForm({ name:'', slug:'' });
    toast.success('Category added!');
  };
  return (
    <AdminLayout title="Categories">
      <div className="max-w-2xl">
        <h2 className="font-playfair text-xl font-bold text-text-dark mb-6">Manage Categories</h2>
        <div className="bg-white rounded-2xl p-5 border border-gold/10 shadow-sm mb-6">
          <h3 className="font-poppins font-semibold text-sm text-text-dark mb-3">Add New Category</h3>
          <div className="flex gap-3">
            <input type="text" value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} className="luxury-input text-sm flex-1" placeholder="Category name" />
            <button onClick={addCat} className="btn-primary px-4 py-2 text-sm flex items-center gap-1"><FiPlus size={14}/>Add</button>
          </div>
        </div>
        <div className="bg-white rounded-2xl border border-gold/10 shadow-sm overflow-hidden">
          {cats.map(cat=>(
            <div key={cat._id} className="flex items-center justify-between px-5 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50">
              <div>
                <p className="font-poppins font-semibold text-sm text-text-dark">{cat.name}</p>
                <p className="font-poppins text-xs text-gray-400">/collections/{cat.slug}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge text-xs ${cat.isActive?'badge-green':'badge-red'}`}>{cat.isActive?'Active':'Hidden'}</span>
                <button onClick={()=>{setCats(c=>c.filter(x=>x._id!==cat._id));toast.success('Removed');}} className="text-gray-400 hover:text-red-500"><FiTrash2 size={15}/></button>
              </div>
            </div>
          ))}
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
  return { props: {} };
}
