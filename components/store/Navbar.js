import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import {
  FiShoppingBag,
  FiSearch,
  FiMenu,
  FiX,
  FiHeart,
  FiUser,
} from 'react-icons/fi';

const categories = [
  {
    slug: 'womens-kurtis',
    label: "Women's Kurtis",
  },
  {
    slug: 'womens-nighties',
    label: "Women's Nighties",
  },
  {
    slug: 'womens-innerwear',
    label: "Women's Innerwear",
  },
  {
    slug: 'mens-innerwear',
    label: "Men's Innerwear",
  },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQ, setSearchQ] = useState('');

  const { cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <>
      {/* Top Bar */}
      {/* <div className="bg-gradient-to-r from-primary to-rose-pink text-white text-center py-2 text-xs font-poppins tracking-wide">
        ✨ Free Shipping on orders above ₹599 | Online Store — Sivakasi,
        Virudhunagar ✨
      </div> */}

      {/* Navbar */}
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-gold/20'
            : 'bg-white/90 backdrop-blur-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16 md:h-20">
            
            {/* Logo */}
            <Link href="/" className="flex flex-col items-start">
              <span className="font-vibes text-2xl md:text-3xl text-primary leading-none">
                LakshmiBala
              </span>

              <span className="font-playfair text-xs md:text-sm text-secondary tracking-[0.2em] uppercase leading-none">
                Fashion Hub
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-8">
              <Link
                href="/"
                className="font-poppins text-sm text-text-dark hover:text-primary transition-colors"
              >
                Home
              </Link>

              {/* Collections Dropdown */}
              <div className="relative group">
                <button className="font-poppins text-sm text-text-dark hover:text-primary transition-colors flex items-center gap-1">
                  Collections

                  <svg
                    className="w-3 h-3 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gold/20 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  {categories.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/collections/${cat.slug}`}
                      className="block px-5 py-3 text-sm font-poppins text-text-dark hover:bg-accent/30 hover:text-primary transition-colors border-b border-gold/10 last:border-0"
                    >
                      {cat.label}
                    </Link>
                  ))}
                </div>
              </div>

              <Link
                href="/about"
                className="font-poppins text-sm text-text-dark hover:text-primary transition-colors"
              >
                About
              </Link>

              <Link
                href="/contact"
                className="font-poppins text-sm text-text-dark hover:text-primary transition-colors"
              >
                Contact
              </Link>
            </div>

            {/* Right Icons */}
            <div className="flex items-center gap-3">
              
              {/* Search */}
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-text-dark hover:text-primary transition-colors rounded-full hover:bg-accent/20"
              >
                <FiSearch size={20} />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="hidden md:flex p-2 text-text-dark hover:text-primary transition-colors rounded-full hover:bg-accent/20"
              >
                <FiHeart size={20} />
              </Link>

              {/* Account */}
              <Link
                href="/account"
                className="hidden md:flex p-2 text-text-dark hover:text-primary transition-colors rounded-full hover:bg-accent/20"
              >
                <FiUser size={20} />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="relative p-2 text-text-dark hover:text-primary transition-colors rounded-full hover:bg-accent/20"
              >
                <FiShoppingBag size={20} />

                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center font-poppins font-semibold">
                    {cartCount > 9 ? '9+' : cartCount}
                  </span>
                )}
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="md:hidden p-2 text-text-dark hover:text-primary transition-colors"
              >
                {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
              </button>
            </div>
          </div>

          {/* Search Bar */}
          {searchOpen && (
            <div className="pb-4 animate-fade-up">
              <form
                action="/search"
                method="GET"
                className="flex gap-2"
              >
                <input
                  type="text"
                  name="q"
                  value={searchQ}
                  onChange={(e) => setSearchQ(e.target.value)}
                  placeholder="Search kurtis, nighties, innerwear..."
                  className="luxury-input flex-1"
                  autoFocus
                />

                <button
                  type="submit"
                  className="btn-primary px-6 py-2 text-sm"
                >
                  Search
                </button>
              </form>
            </div>
          )}
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden bg-white border-t border-gold/20 px-4 py-4 space-y-2 animate-fade-up">
            
            <Link
              href="/"
              className="block py-2 font-poppins text-sm text-text-dark hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>

            {/* Mobile Collections */}
            <div className="py-1">
              <p className="text-xs font-semibold text-secondary uppercase tracking-wider mb-2">
                Collections
              </p>

              {categories.map((cat) => (
                <Link
                  key={cat.slug}
                  href={`/collections/${cat.slug}`}
                  className="block py-2 pl-3 font-poppins text-sm text-text-dark hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {cat.label}
                </Link>
              ))}
            </div>

            <Link
              href="/wishlist"
              className="block py-2 font-poppins text-sm text-text-dark hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Wishlist
            </Link>

            <Link
              href="/account"
              className="block py-2 font-poppins text-sm text-text-dark hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              My Account
            </Link>

            <Link
              href="/about"
              className="block py-2 font-poppins text-sm text-text-dark hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              About
            </Link>

            <Link
              href="/contact"
              className="block py-2 font-poppins text-sm text-text-dark hover:text-primary"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}