import Layout from '../components/store/Layout';
import { FiMapPin, FiPhone, FiMail } from 'react-icons/fi';

export default function About() {
  return (
    <Layout title="About Us" description="Learn about Sivakasi Fashion Hub — your trusted online fashion store from Sivakasi, Virudhunagar district, Tamil Nadu.">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <p className="font-vibes text-primary text-4xl mb-2">Our Story</p>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-text-dark">About Sivakasi Fashion Hub</h1>
          <div className="luxury-divider mt-4 max-w-xs mx-auto"><span className="font-poppins text-secondary text-xs tracking-widest">✦ EST. 2020 ✦</span></div>
        </div>
        <div className="grid md:grid-cols-2 gap-10 items-center mb-16">
          <div className="space-y-4">
            <p className="font-poppins text-text-dark/80 leading-relaxed">
              Founded in the heart of Sivakasi — the fireworks capital of India — <strong>Sivakasi Fashion Hub</strong> brings you premium quality women's and men's clothing straight to your doorstep across India.
            </p>
            <p className="font-poppins text-text-dark/80 leading-relaxed">
              We specialize in elegant women's kurtis, comfortable nighties, quality innerwear for women and men. Our online-only store ensures you get the best prices with no middlemen.
            </p>
            <p className="font-poppins text-text-dark/80 leading-relaxed">
              Every piece in our collection is carefully selected for fabric quality, comfort, and style — because you deserve nothing but the best.
            </p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-accent/30 rounded-3xl p-8 text-center border border-gold/20">
            <p className="font-vibes text-primary text-5xl mb-2">Elegance</p>
            <p className="font-playfair text-text-dark text-xl font-bold mb-4">Redefined for Every Woman</p>
            <div className="grid grid-cols-2 gap-4 mt-6">
              {[['500+','Products'],['10K+','Happy Customers'],['Pan India','Delivery'],['7-Day','Easy Returns']].map(([n,l])=>(
                <div key={l} className="bg-white/60 backdrop-blur rounded-2xl p-4 border border-gold/20">
                  <p className="font-playfair text-2xl font-bold text-primary">{n}</p>
                  <p className="font-poppins text-xs text-gray-500">{l}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="bg-white rounded-3xl p-8 border border-gold/20 shadow-sm">
          <h2 className="font-playfair text-2xl font-bold text-text-dark mb-6 text-center">Contact Us</h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              { icon: FiMapPin, label: 'Location', value: 'Sivakasi, Virudhunagar Dt, Tamil Nadu 626123' },
              { icon: FiPhone, label: 'Phone', value: '+91 99999 99999' },
              { icon: FiMail, label: 'Email', value: 'info@sivakaasifashion.com' },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="flex flex-col items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Icon size={22}/></div>
                <p className="font-poppins font-semibold text-sm text-text-dark">{label}</p>
                <p className="font-poppins text-sm text-gray-500">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
