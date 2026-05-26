import AdminLayout from '../../components/admin/AdminLayout';
import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Settings() {
  const [store, setStore] = useState({ name:'Sivakasi Fashion Hub', phone:'+91 99999 99999', email:'info@sivakaasifashion.com', address:'Sivakasi, Virudhunagar, Tamil Nadu 626123', currency:'INR', freeShippingMin:599, shippingCharge:60 });
  return (
    <AdminLayout title="Settings">
      <div className="max-w-2xl">
        <h2 className="font-playfair text-xl font-bold text-text-dark mb-6">Store Settings</h2>
        <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm space-y-4">
          {[
            { k:'name', label:'Store Name', type:'text' },
            { k:'phone', label:'Phone / WhatsApp', type:'text' },
            { k:'email', label:'Contact Email', type:'email' },
            { k:'address', label:'Address', type:'text' },
            { k:'freeShippingMin', label:'Free Shipping Above (₹)', type:'number' },
            { k:'shippingCharge', label:'Default Shipping Charge (₹)', type:'number' },
          ].map(({ k, label, type }) => (
            <div key={k}>
              <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">{label}</label>
              <input type={type} value={store[k]} onChange={e=>setStore(s=>({...s,[k]:e.target.value}))} className="luxury-input text-sm" />
            </div>
          ))}
          <button onClick={()=>toast.success('Settings saved!')} className="btn-primary px-8 py-3 text-sm font-semibold">Save Settings</button>
        </div>
      </div>
    </AdminLayout>
  );
}

export async function getServerSideProps({ req }) {
  const { verifyToken, getTokenFromRequest } = await import('../../lib/auth');
  const token = getTokenFromRequest({ headers: req.headers });
  const decoded = token ? verifyToken(token) : null;
  if (!decoded || decoded.role !== 'admin') return { redirect: { destination: '/admin/login', permanent: false } };
  return { props: {} };
}
