import { useState } from 'react';
import AdminLayout from '../../../components/admin/AdminLayout';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiPlus, FiX, FiUpload, FiArrowLeft } from 'react-icons/fi';
import Link from 'next/link';

const SIZES_BY_CAT = {
  'womens-kurtis': ['XS','S','M','L','XL','XXL','3XL'],
  'womens-nighties': ['S','M','L','XL','XXL','3XL'],
  'womens-innerwear': ['28','30','32','34','36','38','40','42'],
  'mens-innerwear': ['S','M','L','XL','XXL','3XL'],
};

export default function NewProduct() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [colorInput, setColorInput] = useState({ name: '', hex: '#E91E63' });
  const [seoKeywords, setSeoKeywords] = useState([]);
  const [kwInput, setKwInput] = useState('');
  const [form, setForm] = useState({
    name:'', category:'womens-kurtis', description:'', shortDescription:'',
    price:'', originalPrice:'', fabric:'', careInstructions:'', brand:'Sivakasi Fashion Hub',
    seoTitle:'', seoDescription:'',
    isActive:true, isFeatured:false, isNewArrival:true, isBestseller:false,
  });

  const update = (k,v) => setForm(f=>({...f,[k]:v}));

  const handleImages = (e) => {
    const files = Array.from(e.target.files);
    setImages(prev=>[...prev,...files]);
    setPreviews(prev=>[...prev,...files.map(f=>URL.createObjectURL(f))]);
  };

  const removeImage = (i) => {
    setImages(prev=>prev.filter((_,idx)=>idx!==i));
    setPreviews(prev=>prev.filter((_,idx)=>idx!==i));
  };

  const toggleSize = (size) => {
    setSizes(prev => prev.find(s=>s.size===size)
      ? prev.filter(s=>s.size!==size)
      : [...prev, {size, stock: 10}]
    );
  };

  const updateStock = (size, stock) => {
    setSizes(prev=>prev.map(s=>s.size===size?{...s,stock:Number(stock)}:s));
  };

  const addColor = () => {
    if (!colorInput.name) return;
    setColors(prev=>[...prev, colorInput]);
    setColorInput({name:'', hex:'#E91E63'});
  };

  const addKeyword = () => {
    if (!kwInput.trim()) return;
    setSeoKeywords(prev=>[...prev, kwInput.trim()]);
    setKwInput('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price || !form.description) { toast.error('Fill all required fields'); return; }
    setLoading(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k,v])=>fd.append(k, v));
      fd.append('sizes', JSON.stringify(sizes));
      fd.append('colors', JSON.stringify(colors));
      fd.append('seoKeywords', JSON.stringify(seoKeywords));
      images.forEach(img=>fd.append('images', img));

      await axios.post('/api/products', fd, { headers:{'Content-Type':'multipart/form-data'} });
      toast.success('Product created!');
      router.push('/admin/products');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to create product');
    } finally { setLoading(false); }
  };

  const suggestedSizes = SIZES_BY_CAT[form.category] || [];

  return (
    <AdminLayout title="Add New Product">
      <div className="mb-6 flex items-center gap-3">
        <Link href="/admin/products" className="p-2 rounded-xl border border-gold/20 hover:border-primary hover:text-primary transition-colors">
          <FiArrowLeft size={18}/>
        </Link>
        <h2 className="font-playfair text-xl font-bold text-text-dark">Add New Product</h2>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Info */}
          <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
            <h3 className="font-playfair font-bold text-text-dark mb-5">Basic Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Product Name *</label>
                <input type="text" value={form.name} onChange={e=>update('name',e.target.value)} className="luxury-input" placeholder="e.g. Rose Print Cotton Kurti" required />
              </div>
              <div>
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Category *</label>
                <select value={form.category} onChange={e=>update('category',e.target.value)} className="luxury-input text-sm">
                  <option value="womens-kurtis">Women's Kurtis</option>
                  <option value="womens-nighties">Women's Nighties</option>
                  <option value="womens-innerwear">Women's Innerwear</option>
                  <option value="mens-innerwear">Men's Innerwear</option>
                </select>
              </div>
              <div>
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Brand</label>
                <input type="text" value={form.brand} onChange={e=>update('brand',e.target.value)} className="luxury-input" />
              </div>
              <div>
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Selling Price (₹) *</label>
                <input type="number" value={form.price} onChange={e=>update('price',e.target.value)} className="luxury-input" placeholder="499" required />
              </div>
              <div>
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Original Price (₹)</label>
                <input type="number" value={form.originalPrice} onChange={e=>update('originalPrice',e.target.value)} className="luxury-input" placeholder="699" />
              </div>
              <div>
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Fabric</label>
                <input type="text" value={form.fabric} onChange={e=>update('fabric',e.target.value)} className="luxury-input" placeholder="Pure Cotton" />
              </div>
              <div>
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Care Instructions</label>
                <input type="text" value={form.careInstructions} onChange={e=>update('careInstructions',e.target.value)} className="luxury-input" placeholder="Hand wash cold" />
              </div>
              <div className="sm:col-span-2">
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Short Description</label>
                <input type="text" value={form.shortDescription} onChange={e=>update('shortDescription',e.target.value)} className="luxury-input" placeholder="One line summary" />
              </div>
              <div className="sm:col-span-2">
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Full Description *</label>
                <textarea value={form.description} onChange={e=>update('description',e.target.value)} rows={4} className="luxury-input resize-none" placeholder="Detailed product description..." required />
              </div>
            </div>
          </div>

          {/* Images */}
          <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
            <h3 className="font-playfair font-bold text-text-dark mb-5">Product Images</h3>
            <label className="block border-2 border-dashed border-gold/40 rounded-2xl p-8 text-center cursor-pointer hover:border-primary transition-colors">
              <FiUpload size={32} className="mx-auto text-gray-400 mb-2"/>
              <p className="font-poppins text-sm text-gray-500">Click to upload images</p>
              <p className="font-poppins text-xs text-gray-400 mt-1">JPG, PNG up to 5MB each</p>
              <input type="file" multiple accept="image/*" onChange={handleImages} className="hidden"/>
            </label>
            {previews.length > 0 && (
              <div className="flex gap-3 mt-4 flex-wrap">
                {previews.map((src,i)=>(
                  <div key={i} className="relative w-20 h-24 rounded-xl overflow-hidden border border-gold/20">
                    <img src={src} alt="" className="w-full h-full object-cover"/>
                    <button type="button" onClick={()=>removeImage(i)}
                      className="absolute top-1 right-1 w-5 h-5 bg-red-500 rounded-full text-white flex items-center justify-center">
                      <FiX size={10}/>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Sizes */}
          <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
            <h3 className="font-playfair font-bold text-text-dark mb-5">Sizes & Stock</h3>
            <div className="flex flex-wrap gap-2 mb-4">
              {suggestedSizes.map(size=>(
                <button type="button" key={size} onClick={()=>toggleSize(size)}
                  className={`px-4 py-2 rounded-xl text-sm font-poppins font-medium border-2 transition-all ${
                    sizes.find(s=>s.size===size) ? 'border-primary bg-primary text-white' : 'border-gold/30 text-text-dark hover:border-primary'
                  }`}>{size}</button>
              ))}
            </div>
            {sizes.length > 0 && (
              <div className="grid sm:grid-cols-3 gap-3">
                {sizes.map(s=>(
                  <div key={s.size} className="flex items-center gap-2 p-2 bg-gray-50 rounded-xl">
                    <span className="font-poppins text-sm font-semibold text-text-dark w-12">{s.size}</span>
                    <input type="number" value={s.stock} onChange={e=>updateStock(s.size,e.target.value)}
                      className="luxury-input text-sm py-1.5 flex-1" placeholder="Stock" min="0"/>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Colors */}
          <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
            <h3 className="font-playfair font-bold text-text-dark mb-5">Colors</h3>
            <div className="flex gap-2 mb-4">
              <input type="text" value={colorInput.name} onChange={e=>setColorInput(c=>({...c,name:e.target.value}))}
                className="luxury-input text-sm py-2 flex-1" placeholder="Color name (e.g. Rose Pink)"/>
              <input type="color" value={colorInput.hex} onChange={e=>setColorInput(c=>({...c,hex:e.target.value}))}
                className="w-12 h-10 rounded-lg border border-gold/30 cursor-pointer p-1"/>
              <button type="button" onClick={addColor} className="btn-primary px-4 py-2 text-sm whitespace-nowrap flex items-center gap-1">
                <FiPlus size={14}/> Add
              </button>
            </div>
            <div className="flex gap-2 flex-wrap">
              {colors.map((c,i)=>(
                <div key={i} className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 rounded-full border border-gold/20">
                  <div className="w-4 h-4 rounded-full border" style={{background:c.hex}}/>
                  <span className="font-poppins text-xs text-text-dark">{c.name}</span>
                  <button type="button" onClick={()=>setColors(prev=>prev.filter((_,idx)=>idx!==i))} className="text-gray-400 hover:text-red-500">
                    <FiX size={12}/>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
            <h3 className="font-playfair font-bold text-text-dark mb-5">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">SEO Title</label>
                <input type="text" value={form.seoTitle} onChange={e=>update('seoTitle',e.target.value)} className="luxury-input text-sm" placeholder="Product name | Sivakasi Fashion Hub"/>
              </div>
              <div>
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Meta Description</label>
                <textarea value={form.seoDescription} onChange={e=>update('seoDescription',e.target.value)} rows={2} className="luxury-input text-sm resize-none" placeholder="Short SEO description (max 160 chars)"/>
              </div>
              <div>
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Keywords</label>
                <div className="flex gap-2 mb-2">
                  <input type="text" value={kwInput} onChange={e=>setKwInput(e.target.value)}
                    onKeyDown={e=>e.key==='Enter'&&(e.preventDefault(),addKeyword())}
                    className="luxury-input text-sm flex-1" placeholder="Type keyword and press Enter"/>
                  <button type="button" onClick={addKeyword} className="btn-outline text-sm px-4 py-2">Add</button>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {seoKeywords.map((k,i)=>(
                    <span key={i} className="badge badge-gold flex items-center gap-1">
                      {k}
                      <button type="button" onClick={()=>setSeoKeywords(prev=>prev.filter((_,idx)=>idx!==i))}><FiX size={10}/></button>
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-6 border border-gold/10 shadow-sm">
            <h3 className="font-playfair font-bold text-text-dark mb-5">Product Status</h3>
            <div className="space-y-3">
              {[
                {key:'isActive', label:'Active (visible in store)'},
                {key:'isFeatured', label:'Featured on homepage'},
                {key:'isNewArrival', label:'Mark as New Arrival'},
                {key:'isBestseller', label:'Mark as Bestseller'},
              ].map(({key,label})=>(
                <label key={key} className="flex items-center gap-3 cursor-pointer">
                  <input type="checkbox" checked={form[key]} onChange={e=>update(key,e.target.checked)}
                    className="w-4 h-4 accent-primary rounded"/>
                  <span className="font-poppins text-sm text-text-dark">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="submit" disabled={loading}
            className="w-full btn-primary py-4 font-semibold text-base disabled:opacity-60">
            {loading ? 'Creating Product...' : 'Create Product'}
          </button>
          <Link href="/admin/products" className="block w-full btn-outline py-3 text-center text-sm font-semibold">
            Cancel
          </Link>
        </div>
      </form>
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
