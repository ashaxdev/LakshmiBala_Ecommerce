import Link from 'next/link';
import { FiMail, FiPhone, FiMapPin, FiInstagram, FiFacebook, FiYoutube } from 'react-icons/fi';

export default function Footer() {
  return (
    <footer className="bg-text-dark text-white">
      {/* Newsletter */}
      {/* <div className="bg-gradient-to-r from-primary to-rose-pink py-10">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="font-vibes text-4xl text-white mb-1">Stay in Style</h3>
          <p className="font-poppins text-sm text-white/80 mb-6">Subscribe for exclusive deals and new arrivals from Sivakasi</p>
          <form className="flex gap-3 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-5 py-3 rounded-full bg-white/20 backdrop-blur text-white placeholder-white/60 border border-white/30 outline-none focus:border-white font-poppins text-sm"
            />
            <button type="submit" className="btn-gold px-6 py-3 rounded-full font-semibold text-sm whitespace-nowrap">
              Subscribe
            </button>
          </form>
        </div>
      </div> */}

      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 py-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h2 className="font-vibes text-3xl text-accent mb-1">Sivakasi Fashion Hub</h2>
          <p className="font-playfair text-secondary text-xs tracking-widest uppercase mb-4">Elegance Redefined</p>
          <p className="font-poppins text-white/60 text-sm leading-relaxed mb-6">
            Your trusted online destination for premium women's kurtis, nighties, innerwear, and men's innerwear — delivered across India from the heart of Sivakasi.
          </p>
          <div className="flex gap-3">
            {[
              { icon: FiInstagram, href: '#', label: 'Instagram' },
              { icon: FiFacebook, href: '#', label: 'Facebook' },
              { icon: FiYoutube, href: '#', label: 'YouTube' },
            ].map(({ icon: Icon, href, label }) => (
              <a key={label} href={href} aria-label={label}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-primary flex items-center justify-center transition-colors">
                <Icon size={16} />
              </a>
            ))}
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="font-playfair text-secondary text-lg mb-5 border-b border-secondary/30 pb-2">Quick Links</h4>
          <ul className="space-y-2">
            {[
              { label: 'Home', href: '/' },
              { label: "Women's Kurtis", href: '/collections/womens-kurtis' },
              { label: "Women's Nighties", href: '/collections/womens-nighties' },
              { label: "Women's Innerwear", href: '/collections/womens-innerwear' },
              { label: "Men's Innerwear", href: '/collections/mens-innerwear' },
              { label: 'About Us', href: '/about' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="font-poppins text-sm text-white/60 hover:text-accent transition-colors flex items-center gap-2">
                  <span className="text-primary">›</span> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Customer */}
        <div>
          <h4 className="font-playfair text-secondary text-lg mb-5 border-b border-secondary/30 pb-2">Customer Care</h4>
          <ul className="space-y-2">
            {[
              { label: 'My Orders', href: '/orders' },
              { label: 'Track Order', href: '/track-order' },
              { label: 'Return Policy', href: '/returns' },
              { label: 'Size Guide', href: '/size-guide' },
              { label: 'FAQ', href: '/faq' },
              { label: 'Privacy Policy', href: '/privacy' },
              { label: 'Terms & Conditions', href: '/terms' },
            ].map(link => (
              <li key={link.href}>
                <Link href={link.href} className="font-poppins text-sm text-white/60 hover:text-accent transition-colors flex items-center gap-2">
                  <span className="text-primary">›</span> {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-playfair text-secondary text-lg mb-5 border-b border-secondary/30 pb-2">Contact Us</h4>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <FiMapPin className="text-primary mt-0.5 shrink-0" size={16} />
              <span className="font-poppins text-sm text-white/60 leading-relaxed">
                Sivakasi, Virudhunagar District,<br />Tamil Nadu — 626 123
              </span>
            </div>
            <div className="flex items-center gap-3">
              <FiPhone className="text-primary shrink-0" size={16} />
              <a href="tel:+919999999999" className="font-poppins text-sm text-white/60 hover:text-accent transition-colors">
                +91 99999 99999
              </a>
            </div>
            <div className="flex items-center gap-3">
              <FiMail className="text-primary shrink-0" size={16} />
              <a href="mailto:info@sivakaasifashion.com" className="font-poppins text-sm text-white/60 hover:text-accent transition-colors">
                info@sivakaasifashion.com
              </a>
            </div>
            <div className="mt-4 p-3 rounded-lg bg-white/5 border border-white/10">
              <p className="font-poppins text-xs text-white/50 mb-1">Business Hours</p>
              <p className="font-poppins text-sm text-white/70">Mon–Sat: 9:00 AM – 7:00 PM</p>
              <p className="font-poppins text-xs text-white/40 mt-1">Online Store: 24/7</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10 py-5">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-poppins text-xs text-white/40">
            © 2024 Sivakasi Fashion Hub. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/50px-Mastercard-logo.svg.png" alt="Mastercard" className="h-6 opacity-50" />
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/50px-Visa_Inc._logo.svg.png" alt="Visa" className="h-5 opacity-50" />
            <span className="font-poppins text-xs text-white/40 border border-white/20 px-2 py-0.5 rounded">UPI</span>
            <span className="font-poppins text-xs text-white/40 border border-white/20 px-2 py-0.5 rounded">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
