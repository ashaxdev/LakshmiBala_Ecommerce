import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { useCart } from '../../context/CartContext';
import {
  FiShoppingBag,
  FiSearch,
  FiMenu,
  FiX,
  FiHeart,
  FiUser,
  FiChevronDown,
  FiGrid,
} from 'react-icons/fi';

const categories = [
  { slug: 'womens-kurtis', label: "Women's Kurtis", emoji: '👗' },
  { slug: 'womens-nighties', label: "Women's Nighties", emoji: '🌙' },
  { slug: 'womens-innerwear', label: "Women's Innerwear", emoji: '🌸' },
  { slug: 'mens-innerwear', label: "Men's Innerwear", emoji: '👔' },
];

const searchCategories = [
  { value: 'all', label: 'All' },
  { value: 'womens-kurtis', label: 'Kurtis' },
  { value: 'womens-nighties', label: 'Nighties' },
  { value: 'womens-innerwear', label: "Women's Inner" },
  { value: 'mens-innerwear', label: "Men's Inner" },
];

const subNavLinks = [
  { href: '/', label: 'Home' },
  { href: '/collections', label: 'Shop' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/track-order', label: 'Track Order' },
];

const menuLinks = [
  { href: '/', label: 'Home' },
  { href: '/collections', label: 'Shop All' },
  { href: '/contact', label: 'Contact Us' },
  { href: '/track-order', label: 'Track Order' },
];

/* ─── Announcement Marquee ─────────────────────────────────────── */
function AnnouncementMarquee() {
  const items = [
    '🚚 Free Shipping on orders above ₹999',
    
  ];

  return (
    <div className="lbfh-marquee-bar">
      <div className="lbfh-marquee-track">
        {[...items, ...items].map((text, i) => (
          <span key={i} className="lbfh-marquee-item">
            {text}
            <span className="lbfh-marquee-sep">✦</span>
          </span>
        ))}
      </div>

      <style jsx>{`
        .lbfh-marquee-bar {
          width: 100%;
          overflow: hidden;
          background: linear-gradient(90deg, #f9a8d4 0%, #ec4899 50%, #f9a8d4 100%);
          background-size: 200% 100%;
          animation: gradientShift 6s ease infinite;
          padding: 7px 0;
          position: relative;
          z-index: 50;
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .lbfh-marquee-track {
          display: flex;
          white-space: nowrap;
          animation: marqueeScroll 35s linear infinite;
        }
        .lbfh-marquee-bar:hover .lbfh-marquee-track {
          animation-play-state: paused;
        }
        .lbfh-marquee-item {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #fff;
          font-size: 12px;
          font-weight: 500;
          letter-spacing: 0.04em;
          padding: 0 28px;
          font-family: 'Poppins', sans-serif;
        }
        .lbfh-marquee-sep {
          margin-left: 12px;
          opacity: 0.6;
          font-size: 10px;
        }
        @keyframes marqueeScroll {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @media (min-width: 640px) {
          .lbfh-marquee-item { font-size: 13px; }
        }
      `}</style>
    </div>
  );
}

/* ─── Inline Search Bar ─────────────────────────────────────────── */
function InlineSearchBar() {
  const [searchQ, setSearchQ] = useState('');
  const [selectedCat, setSelectedCat] = useState('all');
  const [catOpen, setCatOpen] = useState(false);
  const dropRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) setCatOpen(false);
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const selectedLabel = searchCategories.find(c => c.value === selectedCat)?.label || 'All';

  return (
    <form action="/search" method="GET" className="lbfh-inline-search" ref={dropRef}>
      <div className="lbfh-inline-cat">
        <button
          type="button"
          className="lbfh-inline-cat-btn"
          onClick={() => setCatOpen(p => !p)}
        >
          <span>{selectedLabel}</span>
          <FiChevronDown
            size={12}
            style={{
              transition: 'transform 0.2s',
              transform: catOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            }}
          />
        </button>
        {catOpen && (
          <div className="lbfh-inline-cat-dropdown">
            {searchCategories.map(cat => (
              <button
                key={cat.value}
                type="button"
                className={`lbfh-inline-cat-option ${selectedCat === cat.value ? 'active' : ''}`}
                onClick={() => { setSelectedCat(cat.value); setCatOpen(false); }}
              >
                {cat.label}
              </button>
            ))}
          </div>
        )}
        <input type="hidden" name="category" value={selectedCat} />
      </div>
      <div className="lbfh-inline-divider" />
      <input
        type="text"
        name="q"
        value={searchQ}
        onChange={e => setSearchQ(e.target.value)}
        placeholder="Search kurtis, nighties, innerwear..."
        className="lbfh-inline-input"
      />
      <button type="submit" className="lbfh-inline-submit" aria-label="Search">
        <FiSearch size={16} />
        <span className="lbfh-inline-submit-label">Search</span>
      </button>

      <style jsx>{`
        .lbfh-inline-search {
          display: flex; align-items: center; flex: 1; max-width: 560px;
          background: #fff; border: 1.5px solid #fbb6ce; border-radius: 50px;
          overflow: visible; box-shadow: 0 2px 12px rgba(236,72,153,0.10);
          position: relative; transition: border-color 0.2s, box-shadow 0.2s;
        }
        .lbfh-inline-search:focus-within {
          border-color: #ec4899;
          box-shadow: 0 4px 20px rgba(236,72,153,0.18);
        }
        .lbfh-inline-cat { position: relative; flex-shrink: 0; }
        .lbfh-inline-cat-btn {
          display: flex; align-items: center; gap: 4px; padding: 0 12px 0 18px;
          height: 42px; font-size: 12.5px; font-family: 'Poppins', sans-serif;
          font-weight: 600; color: #be185d; background: transparent; border: none;
          cursor: pointer; white-space: nowrap; transition: color 0.2s;
        }
        .lbfh-inline-cat-btn:hover { color: #9d174d; }
        .lbfh-inline-cat-dropdown {
          position: absolute; top: calc(100% + 8px); left: 0; background: #fff;
          border: 1.5px solid #fbb6ce; border-radius: 14px;
          box-shadow: 0 8px 24px rgba(236,72,153,0.15); z-index: 100;
          min-width: 140px; overflow: hidden; animation: fadeSlideDown 0.15s ease;
        }
        @keyframes fadeSlideDown {
          from { opacity: 0; transform: translateY(-6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .lbfh-inline-cat-option {
          display: block; width: 100%; text-align: left; padding: 9px 16px;
          font-size: 13px; font-family: 'Poppins', sans-serif; color: #4a4a4a;
          background: transparent; border: none; cursor: pointer;
          transition: background 0.15s, color 0.15s; border-bottom: 1px solid #fce7f3;
        }
        .lbfh-inline-cat-option:last-child { border-bottom: none; }
        .lbfh-inline-cat-option:hover { background: #fdf2f8; color: #be185d; }
        .lbfh-inline-cat-option.active { background: #fce7f3; color: #be185d; font-weight: 600; }
        .lbfh-inline-divider { width: 1px; height: 20px; background: #fbb6ce; flex-shrink: 0; }
        .lbfh-inline-input {
          flex: 1; border: none; outline: none; padding: 0 12px; height: 42px;
          font-size: 13.5px; font-family: 'Poppins', sans-serif; color: #1a1a1a;
          background: transparent; min-width: 0;
        }
        .lbfh-inline-input::placeholder { color: #d1a0b8; }
        .lbfh-inline-submit {
          display: flex; align-items: center; gap: 6px; padding: 0 18px; margin: 4px;
          height: 34px; background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
          color: #fff; border: none; border-radius: 50px; font-size: 13px;
          font-family: 'Poppins', sans-serif; font-weight: 600; cursor: pointer;
          transition: opacity 0.2s, transform 0.15s; white-space: nowrap; flex-shrink: 0;
        }
        .lbfh-inline-submit:hover { opacity: 0.88; transform: scale(1.02); }
      `}</style>
    </form>
  );
}

/* ─── Pink Sub-Nav Bar (desktop only) ──────────────────────────── */
function SubNav() {
  const [catOpen, setCatOpen] = useState(false);
  const [activeLink, setActiveLink] = useState(subNavLinks[0].href);
  const dropRef = useRef(null);

  useEffect(() => {
    function handleClick(e) {
      if (dropRef.current && !dropRef.current.contains(e.target)) {
        setCatOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="lbfh-subnav">
      <div className="lbfh-subnav-inner">

        {/* ── Categories button + dropdown ── */}
        {/* <div className="lbfh-subnav-cat" ref={dropRef}>
          <button
            className={`lbfh-subnav-cat-btn${catOpen ? ' open' : ''}`}
            onClick={() => setCatOpen(p => !p)}
          >
            <FiGrid size={14} />
            <span>Categories</span>
            <FiChevronDown
              size={12}
              className="lbfh-chev"
              style={{ transform: catOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
            />
          </button>

          {catOpen && (
            <div className="lbfh-subnav-dropdown">
              {categories.map(({ slug, label, emoji }) => (
                <Link
                  key={slug}
                  href={`/collections/${slug}`}
                  className="lbfh-drop-item"
                  onClick={() => setCatOpen(false)}
                >
                  <span className="lbfh-drop-icon">{emoji}</span>
                  <span className="lbfh-drop-label">{label}</span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <span className="lbfh-subnav-divider" /> */}

        {/* ── Nav pills ── */}
        <nav className="lbfh-subnav-links">
          {subNavLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`lbfh-subnav-pill${activeLink === href ? ' active' : ''}`}
              onClick={() => setActiveLink(href)}
            >
              {label}
            </Link>
          ))}
        </nav>
      </div>

      <style jsx>{`
        .lbfh-subnav {
  display: none;
}

@media (min-width: 768px) {
  .lbfh-subnav {
    display: block;
    background: linear-gradient(135deg, #ec4899 0%, #be185d 100%);
    position: sticky;
    top: 72px;
    z-index: 39;
    border-bottom: 1px solid rgba(255,255,255,0.12);
    box-shadow: 0 2px 12px rgba(190,24,93,0.2);
  }
}

.lbfh-subnav-inner {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 24px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.lbfh-subnav-links {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  width: 100%;
  overflow-x: auto;
  scrollbar-width: none;
  color:white;
}

.lbfh-subnav-links::-webkit-scrollbar {
  display: none;
}

.lbfh-subnav-pill {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 9px 18px;
  font-family: 'Poppins', sans-serif;
  font-size: 13px;
  font-weight: 500;
  color: #ffffff;
  text-decoration: none;
  border-radius: 999px;
  border: 1px solid rgba(255,255,255,0.25);
  white-space: nowrap;
  transition: all 0.3s ease;
}

.lbfh-subnav-pill:hover {
  background: rgba(255,255,255,0.15);
  border-color: rgba(255,255,255,0.45);
  color: #ffffff;
  transform: translateY(-2px);
}

.lbfh-subnav-pill.active {
  background: #ffffff;
  color: #be185d;
  border-color: #ffffff;
  font-weight: 600;
  box-shadow: 0 4px 14px rgba(255,255,255,0.25);
}

/* Optional for large screens */
@media (min-width: 1200px) {
  .lbfh-subnav-links {
    gap: 18px;
  }

  .lbfh-subnav-pill {
    padding: 10px 22px;
    font-size: 13.5px;
  }
}
      `}</style>
    </div>
  );
}

/* ─── Mobile Drawer ─────────────────────────────────────────────── */
function MobileDrawer({ onClose }) {
  const [activeTab, setActiveTab] = useState('menu');

  return (
    <div className="drawer">
      <div className="drawer-header">
        <h4>Explore</h4>
      </div>

      <div className="drawer-tabs">
        <button
          className={`drawer-tab ${activeTab === 'menu' ? 'active' : ''}`}
          onClick={() => setActiveTab('menu')}
        >
          Menu
        </button>

        <button
          className={`drawer-tab ${activeTab === 'categories' ? 'active' : ''}`}
          onClick={() => setActiveTab('categories')}
        >
          Categories
        </button>
      </div>

      <div className="drawer-content">
        {activeTab === 'menu' && (
          <div className="menu-list">
            {menuLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                className="menu-item"
                onClick={onClose}
              >
                {label}
              </Link>
            ))}
          </div>
        )}

        {activeTab === 'categories' && (
          <div className="menu-list">
            {categories.map(cat => (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                className="menu-item"
                onClick={onClose}
              >
                {cat.label}
              </Link>
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .drawer {
          background: #fff;
          border-radius: 24px 24px 0 0;
          overflow: hidden;
          box-shadow: 0 -10px 35px rgba(236, 72, 153, 0.12);
          animation: slideUp .25s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .drawer-header {
          padding: 18px 20px 12px;
          text-align: center;
        }

        .drawer-header h4 {
          margin: 0;
          font-size: 18px;
          font-weight: 600;
          color: #db2777;
          font-family: 'Poppins', sans-serif;
        }

        .drawer-tabs {
          display: flex;
          margin: 0 16px 18px;
          padding: 4px;
          background: #fde7f3;
          border-radius: 999px;
        }

        .drawer-tab {
          flex: 1;
          border: none;
          background: transparent;
          padding: 12px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 600;
          color: #be185d;
          cursor: pointer;
          transition: all .3s ease;
        }

        .drawer-tab.active {
          background: linear-gradient(
            135deg,
            #ec4899,
            #db2777
          );
          color: white;
          box-shadow: 0 8px 18px rgba(236,72,153,.25);
        }

        .drawer-content {
          padding: 0 16px 20px;
          max-height: 60vh;
          overflow-y: auto;
        }

        /* MENU */

        .menu-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .menu-item {
          text-decoration: none;
          padding: 15px 18px;
          border-radius: 16px;
          background: #fff;
          border: 1px solid #fbcfe8;
          color: #374151;
          font-size: 14px;
          font-weight: 500;
          transition: all .25s ease;
          font-family: 'Poppins', sans-serif;
        }

        .menu-item:hover {
          background: #fff0f7;
          border-color: #ec4899;
          color: #ec4899;
          transform: translateX(4px);
        }

        /* CATEGORIES */

        .categories-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
        }

        .category-card {
          // min-height: 78px;
          padding: 12px;
          // border-radius: 18px;
          // text-decoration: none;

          display: flex;
          align-items: center;
          justify-content: center;

          text-align: center;

          // background: linear-gradient(
          //   135deg,
          //   #fff0f7,
          //   #ffffff
          // );

          // border: 1px solid #fbcfe8;

          // color: #374151;
          font-size: 13px;
          font-weight: 500;
          font-family: 'Poppins', sans-serif;

          transition: all .25s ease;
        }

        .category-card:hover {
          background: linear-gradient(
            135deg,
            #ec4899,
            #db2777
          );

          color: white;
          border-color: #ec4899;

          transform: translateY(-3px);

          box-shadow: 0 10px 20px rgba(236,72,153,.25);
        }

        .drawer-content::-webkit-scrollbar {
          width: 4px;
        }

        .drawer-content::-webkit-scrollbar-thumb {
          background: #f9a8d4;
          border-radius: 999px;
        }

        @media (max-width: 480px) {
          .categories-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .category-card {
            min-height: 65px;
            font-size: 12px;
          }
        }
      `}</style>
    </div>
  );
}
/* ─── Main Navbar ───────────────────────────────────────────────── */
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cartCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  return (
    <>
      <AnnouncementMarquee />

      <nav className={`lbfh-nav ${scrolled ? 'scrolled' : ''}`}>
        <div className="lbfh-nav-inner">

          {/* ── Desktop Layout ──────────────────────────────── */}
          <div className="lbfh-desktop-row">
            <Link href="/" className="lbfh-logo">
              <Image
                src="/images/laklogo.png"
                alt="LakshmiBala Fashion Hub"
                width={56}
                height={56}
                priority
                className="object-contain"
              />
            </Link>
            <InlineSearchBar />
            <div className="lbfh-icons">
              <Link href="/wishlist" className="lbfh-icon-btn" aria-label="Wishlist">
                <FiHeart size={20} />
                <span className="lbfh-icon-tooltip">Wishlist</span>
              </Link>
              <Link href="/account" className="lbfh-icon-btn" aria-label="Account">
                <FiUser size={20} />
                <span className="lbfh-icon-tooltip">Account</span>
              </Link>
              <Link href="/cart" className="lbfh-icon-btn lbfh-cart-btn" aria-label="Cart">
                <FiShoppingBag size={20} />
                {cartCount > 0 && (
                  <span className="lbfh-cart-badge">{cartCount > 9 ? '9+' : cartCount}</span>
                )}
                <span className="lbfh-icon-tooltip">Cart</span>
              </Link>
            </div>
          </div>

          {/* ── Mobile Layout ───────────────────────────────── */}
          <div className="lbfh-mobile-row">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lbfh-hamburger-btn"
              aria-label="Menu"
            >
              {isOpen ? <FiX size={18} /> : <FiMenu size={18} />}
            </button>

            <Link href="/" className="lbfh-logo lbfh-logo-center">
              <Image
                src="/images/laklogo.png"
                alt="LakshmiBala Fashion Hub"
                width={48}
                height={48}
                priority
                className="object-contain"
              />
            </Link>

            <div className="lbfh-mobile-right">
              <button
                className="lbfh-mobile-icon-btn"
                aria-label="Search"
                onClick={() => setMobileSearchOpen(p => !p)}
              >
                {mobileSearchOpen ? <FiX size={19} /> : <FiSearch size={19} />}
              </button>
              <Link href="/cart" className="lbfh-mobile-icon-btn lbfh-cart-btn" aria-label="Cart">
                <FiShoppingBag size={19} />
                {cartCount > 0 && (
                  <span className="lbfh-cart-badge">{cartCount > 9 ? '9+' : cartCount}</span>
                )}
              </Link>
            </div>
          </div>

          {/* ── Mobile: Expandable Search bar ─────────────── */}
          {mobileSearchOpen && (
            <div className="lbfh-mobile-search-row">
              <InlineSearchBar />
            </div>
          )}

        </div>

        {/* ── Mobile Drawer ────────────────────────────────── */}
        {isOpen && <MobileDrawer onClose={() => setIsOpen(false)} />}
      </nav>

      <SubNav />

      <style jsx>{`
        .lbfh-nav {
          position: sticky; top: 0; z-index: 40;
          background: rgba(255,255,255,0.97);
          backdrop-filter: blur(12px); -webkit-backdrop-filter: blur(12px);
          border-bottom: 1.5px solid #fce7f3;
          transition: box-shadow 0.3s, background 0.3s;
        }
        .lbfh-nav.scrolled {
          background: rgba(255,255,255,0.99);
          box-shadow: 0 4px 24px rgba(236,72,153,0.10);
        }
        .lbfh-nav-inner { max-width: 1280px; margin: 0 auto; padding: 0 24px; }

        .lbfh-desktop-row {
          display: none;
          align-items: center;
          justify-content: space-between;
          height: 72px;
          gap: 24px;
        }
        @media (min-width: 768px) {
          .lbfh-desktop-row { display: flex; }
          .lbfh-mobile-row  { display: none !important; }
          .lbfh-mobile-search-row { display: none !important; }
        }

        .lbfh-mobile-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          height: 62px;
          position: relative;
        }
        .lbfh-logo-center { position: absolute; left: 50%; transform: translateX(-50%); }
        .lbfh-mobile-right { display: flex; align-items: center; gap: 6px; }

        .lbfh-hamburger-btn {
          display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 10px;
          background: transparent; border: 1.5px solid transparent;
          color: #3d3d3d; cursor: pointer;
          transition: background 0.2s, border-color 0.2s, transform 0.15s;
          flex-shrink: 0; z-index: 1;
        }
        .lbfh-hamburger-btn:hover {
          background: #f3f4f6; border-color: #e5e7eb; transform: scale(1.05);
        }

        .lbfh-mobile-icon-btn {
          position: relative; display: flex; align-items: center; justify-content: center;
          width: 38px; height: 38px; border-radius: 10px; background: transparent;
          border: 1.5px solid transparent; color: #3d3d3d; cursor: pointer;
          text-decoration: none; transition: background 0.2s, border-color 0.2s, transform 0.15s;
          flex-shrink: 0;
        }
        .lbfh-mobile-icon-btn:hover {
          background: #f3f4f6; border-color: #e5e7eb; transform: scale(1.05);
        }

        .lbfh-mobile-search-row {
          padding: 0 0 12px;
          animation: searchSlide 0.2s ease;
        }
        @keyframes searchSlide {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .lbfh-logo { display: flex; align-items: center; text-decoration: none; flex-shrink: 0; }

        .lbfh-icons { display: flex; align-items: center; gap: 6px; flex-shrink: 0; }
        .lbfh-icon-btn {
          position: relative; display: flex; align-items: center; justify-content: center;
          width: 44px; height: 44px; border-radius: 12px; background: transparent;
          border: 1.5px solid transparent; color: #3d3d3d; cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, color 0.2s, border-color 0.2s, transform 0.15s;
        }
        .lbfh-icon-btn:hover {
          background: #fce7f3; border-color: #fbb6ce; color: #ec4899; transform: translateY(-2px);
        }
        .lbfh-icon-tooltip {
          position: absolute; bottom: -28px; left: 50%; transform: translateX(-50%);
          background: #1a1a1a; color: #fff; font-size: 10px; font-family: 'Poppins', sans-serif;
          font-weight: 500; padding: 3px 8px; border-radius: 6px; white-space: nowrap;
          pointer-events: none; opacity: 0; transition: opacity 0.2s, bottom 0.2s; z-index: 10;
        }
        .lbfh-icon-btn:hover .lbfh-icon-tooltip { opacity: 1; bottom: -32px; }

        .lbfh-cart-btn { position: relative; }
        .lbfh-cart-badge {
          position: absolute; top: 4px; right: 4px; width: 17px; height: 17px;
          border-radius: 50%; background: linear-gradient(135deg, #ec4899, #be185d);
          color: #fff; font-size: 9.5px; font-family: 'Poppins', sans-serif; font-weight: 700;
          display: flex; align-items: center; justify-content: center; border: 1.5px solid #fff;
          animation: badgePop 0.3s cubic-bezier(0.34,1.56,0.64,1);
        }
        @keyframes badgePop {
          from { transform: scale(0); }
          to   { transform: scale(1); }
        }
      `}</style>
    </>
  );
}