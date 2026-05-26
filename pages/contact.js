import { useState } from 'react';
import Layout from '../components/store/Layout';
import toast from 'react-hot-toast';
import { FiMapPin, FiPhone, FiMail, FiSend } from 'react-icons/fi';

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', phone:'', message:'' });
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Message sent! We will get back to you soon.');
    setForm({ name:'', email:'', phone:'', message:'' });
  };
  return (
    <Layout title="Contact Us" description="Get in touch with Sivakasi Fashion Hub. We are here to help with your orders, queries and returns.">
      <div className="max-w-5xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="font-vibes text-primary text-4xl mb-2">Get In Touch</p>
          <h1 className="font-playfair text-3xl font-bold text-text-dark">Contact Us</h1>
        </div>
        <div className="grid md:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div className="glass-card rounded-2xl p-6 border border-gold/20">
              <h2 className="font-playfair font-bold text-text-dark text-lg mb-4">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                {[
                  { k:'name', label:'Your Name', type:'text', placeholder:'Priya Sharma' },
                  { k:'email', label:'Email Address', type:'email', placeholder:'priya@email.com' },
                  { k:'phone', label:'Phone Number', type:'tel', placeholder:'+91 98765 43210' },
                ].map(({ k, label, type, placeholder }) => (
                  <div key={k}>
                    <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">{label}</label>
                    <input type={type} value={form[k]} onChange={e=>setForm(f=>({...f,[k]:e.target.value}))}
                      className="luxury-input text-sm" placeholder={placeholder} />
                  </div>
                ))}
                <div>
                  <label className="font-poppins text-xs font-semibold text-text-dark mb-1 block">Message</label>
                  <textarea value={form.message} onChange={e=>setForm(f=>({...f,message:e.target.value}))}
                    rows={4} className="luxury-input text-sm resize-none" placeholder="How can we help you?" />
                </div>
                <button type="submit" className="btn-primary w-full py-3 flex items-center justify-center gap-2 text-sm font-semibold">
                  <FiSend size={16}/> Send Message
                </button>
              </form>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { icon: FiMapPin, title: 'Our Location', lines: ['Sivakasi, Virudhunagar District','Tamil Nadu — 626 123','Online Store (Pan India Delivery)'] },
              { icon: FiPhone, title: 'Call / WhatsApp', lines: ['+91 99999 99999','Mon–Sat, 9 AM – 7 PM'] },
              { icon: FiMail, title: 'Email Us', lines: ['info@sivakaasifashion.com','support@sivakaasifashion.com'] },
            ].map(({ icon: Icon, title, lines }) => (
              <div key={title} className="glass-card rounded-2xl p-5 border border-gold/20 flex gap-4">
                <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0"><Icon size={20}/></div>
                <div>
                  <p className="font-playfair font-bold text-text-dark mb-1">{title}</p>
                  {lines.map(l=><p key={l} className="font-poppins text-sm text-gray-500">{l}</p>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
