import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/store/Layout';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiCheck } from 'react-icons/fi';

export default function CheckoutPage() {
  const router = useRouter();
  const { items, cartTotal, dispatch } = useCart();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    line1: '', line2: '', city: '', state: 'Tamil Nadu', pincode: '',
    paymentMethod: 'cod',
  });

  const shipping = cartTotal >= 599 ? 0 : 60;
  const grandTotal = cartTotal + shipping;

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }));

  const handleOrder = async () => {
    if (!form.name || !form.email || !form.phone || !form.line1 || !form.city || !form.pincode) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    try {
      const { data } = await axios.post('/api/orders', {
        customer: { name: form.name, email: form.email, phone: form.phone },
        shippingAddress: { line1: form.line1, line2: form.line2, city: form.city, state: form.state, pincode: form.pincode },
        items: items.map(i => ({
          productId: i.productId, productName: i.name, productImage: i.image,
          size: i.size, color: i.color, quantity: i.quantity, price: i.price,
          total: i.price * i.quantity,
        })),
        subtotal: cartTotal,
        shippingCharge: shipping,
        total: grandTotal,
        paymentMethod: form.paymentMethod,
      });
      dispatch({ type: 'CLEAR_CART' });
      router.push(`/order-success?order=${data.orderNumber}`);
    } catch (err) {
      toast.error(err.response?.data?.error || 'Order failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0) {
    router.push('/cart');
    return null;
  }

  return (
    <Layout title="Checkout">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <h1 className="font-playfair text-2xl md:text-3xl font-bold text-text-dark mb-8">Checkout</h1>

        {/* Steps */}
        <div className="flex items-center gap-4 mb-10">
          {['Delivery', 'Payment', 'Review'].map((s, i) => (
            <div key={s} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-poppins text-sm font-semibold ${
                step > i + 1 ? 'bg-green-500 text-white' : step === i + 1 ? 'bg-primary text-white' : 'bg-gray-200 text-gray-400'
              }`}>
                {step > i + 1 ? <FiCheck size={16} /> : i + 1}
              </div>
              <span className={`font-poppins text-sm ${step === i + 1 ? 'text-primary font-semibold' : 'text-gray-400'}`}>{s}</span>
              {i < 2 && <div className="w-8 h-px bg-gray-200" />}
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            {step === 1 && (
              <div className="glass-card rounded-2xl p-6 border border-gold/20">
                <h2 className="font-playfair font-bold text-text-dark text-lg mb-6">Delivery Details</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {[
                    { k: 'name', label: 'Full Name *', type: 'text', full: true },
                    { k: 'email', label: 'Email Address *', type: 'email' },
                    { k: 'phone', label: 'Phone Number *', type: 'tel' },
                    { k: 'line1', label: 'Address Line 1 *', type: 'text', full: true },
                    { k: 'line2', label: 'Address Line 2', type: 'text', full: true },
                    { k: 'city', label: 'City *', type: 'text' },
                    { k: 'pincode', label: 'PIN Code *', type: 'text' },
                  ].map(({ k, label, type, full }) => (
                    <div key={k} className={full ? 'sm:col-span-2' : ''}>
                      <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">{label}</label>
                      <input
                        type={type}
                        value={form[k]}
                        onChange={e => update(k, e.target.value)}
                        className="luxury-input text-sm"
                        placeholder={label.replace(' *', '')}
                      />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">State</label>
                    <select value={form.state} onChange={e => update('state', e.target.value)} className="luxury-input text-sm">
                      {['Tamil Nadu','Karnataka','Kerala','Andhra Pradesh','Maharashtra','Delhi','West Bengal','Gujarat','Rajasthan','Other'].map(s => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
                <button onClick={() => setStep(2)} className="btn-primary mt-6 px-8 py-3 text-sm font-semibold">
                  Continue to Payment →
                </button>
              </div>
            )}

            {step === 2 && (
              <div className="glass-card rounded-2xl p-6 border border-gold/20">
                <h2 className="font-playfair font-bold text-text-dark text-lg mb-6">Payment Method</h2>
                <div className="space-y-3">
                  {[
                    { value: 'cod', label: 'Cash on Delivery', desc: 'Pay when your order arrives', emoji: '💵' },
                    { value: 'upi', label: 'UPI Payment', desc: 'PhonePe, Google Pay, Paytm', emoji: '📱' },
                    { value: 'online', label: 'Card / Net Banking', desc: 'Visa, Mastercard, all banks', emoji: '💳' },
                  ].map(p => (
                    <label key={p.value} className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                      form.paymentMethod === p.value ? 'border-primary bg-primary/5' : 'border-gold/20 hover:border-primary/50'
                    }`}>
                      <input type="radio" name="payment" value={p.value}
                        checked={form.paymentMethod === p.value}
                        onChange={e => update('paymentMethod', e.target.value)}
                        className="accent-primary"
                      />
                      <span className="text-2xl">{p.emoji}</span>
                      <div>
                        <p className="font-poppins font-semibold text-sm text-text-dark">{p.label}</p>
                        <p className="font-poppins text-xs text-gray-400">{p.desc}</p>
                      </div>
                    </label>
                  ))}
                </div>
                <div className="flex gap-3 mt-6">
                  <button onClick={() => setStep(1)} className="btn-outline px-6 py-3 text-sm">← Back</button>
                  <button onClick={() => setStep(3)} className="btn-primary px-8 py-3 text-sm font-semibold">Review Order →</button>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="glass-card rounded-2xl p-6 border border-gold/20">
                <h2 className="font-playfair font-bold text-text-dark text-lg mb-6">Review Your Order</h2>
                <div className="space-y-3 mb-6">
                  {items.map(item => (
                    <div key={`${item.productId}-${item.size}`} className="flex items-center gap-3 pb-3 border-b border-gold/10 last:border-0">
                      <img src={item.image || '/images/placeholder.jpg'} alt={item.name}
                        className="w-14 h-16 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="font-poppins text-sm text-text-dark font-medium line-clamp-1">{item.name}</p>
                        <p className="font-poppins text-xs text-gray-400">
                          {item.size && `Size: ${item.size}`} {item.color && `• ${item.color}`} • Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-poppins font-bold text-primary text-sm">₹{(item.price * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="bg-accent/10 rounded-xl p-4 mb-6">
                  <p className="font-poppins text-xs text-gray-500 mb-1">Delivering to:</p>
                  <p className="font-poppins text-sm text-text-dark font-medium">{form.name}</p>
                  <p className="font-poppins text-xs text-gray-500">{form.line1}, {form.city}, {form.state} — {form.pincode}</p>
                  <p className="font-poppins text-xs text-gray-500">{form.phone} | {form.email}</p>
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setStep(2)} className="btn-outline px-6 py-3 text-sm">← Back</button>
                  <button
                    onClick={handleOrder}
                    disabled={loading}
                    className="btn-primary flex-1 py-3 text-sm font-semibold disabled:opacity-60"
                  >
                    {loading ? 'Placing Order...' : `Place Order — ₹${grandTotal.toLocaleString()}`}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Order summary */}
          <div className="glass-card rounded-2xl p-6 border border-gold/20 h-fit sticky top-24">
            <h3 className="font-playfair font-bold text-text-dark text-lg mb-4 pb-3 border-b border-gold/20">Summary</h3>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between font-poppins text-sm">
                <span className="text-gray-500">Subtotal ({items.length} items)</span>
                <span>₹{cartTotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between font-poppins text-sm">
                <span className="text-gray-500">Shipping</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>{shipping === 0 ? 'FREE' : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between font-poppins font-bold text-base pt-3 border-t border-gold/20">
                <span>Total</span>
                <span className="text-primary">₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
