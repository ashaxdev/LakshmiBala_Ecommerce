import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Layout from '../components/store/Layout';
import ProductCard from '../components/store/ProductCard';
import {
  FiArrowRight, FiStar, FiTruck, FiShield,
  FiRefreshCw, FiHeadphones, FiChevronLeft,
  FiChevronRight, FiSearch, FiShoppingBag, FiMenu, FiX
} from 'react-icons/fi';

/* ─── Data ─────────────────────────────────────────────────────── */
const categories = [
  {
    slug: 'womens-kurtis',
    label: "Women's Kurtis",
    desc: 'Elegant ethnic styles',
    image: 'images/KURTHI.jpeg',
    gradient: 'from-transparent via-pink-900/60 to-rose-900/80',
  },
  {
    slug: 'womens-nighties',
    label: "Women's Nighties",
    desc: 'Comfortable & breathable',
    image: 'images/NIGHTY.webp',
    gradient: 'from-transparent via-violet-900/60 to-purple-900/80',
  },
  {
    slug: 'womens-innerwear',
    label: "Women's Innerwear",
    desc: 'Premium comfort fit',
    image: 'images/INNER.webp',
    gradient: 'from-transparent via-rose-900/60 to-pink-900/80',
  },
  {
    slug: 'mens-innerwear',
    label: "Men's Innerwear",
    desc: 'Everyday essentials',
    image: 'images/MENINNER.webp',
    gradient: 'from-transparent via-indigo-900/60 to-blue-900/80',
  },
];

const bannerSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1400&q=80',
    tag: 'New Season Collection',
    heading: 'Elevate Your\nEthnic Style',
    sub: 'Explore our premium kurti collection — crafted with care, delivered with love across India.',
    cta: 'Shop Kurtis',
    href: '/collections/womens-kurtis',
    code: null,
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80',
    tag: 'Special Offer',
    heading: 'Get 20% Off\nYour First Order',
    sub: 'Use code WELCOME20 at checkout. Valid on all online orders above ₹499.',
    cta: 'Claim Offer',
    href: '/collections/womens-kurtis',
    code: 'WELCOME20',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=1400&q=80',
    tag: 'Comfort Essentials',
    heading: 'Sleep Better\nEvery Night',
    sub: 'Breathable nighties and innerwear for the whole family — premium cotton, everyday prices.',
    cta: 'Shop Nighties',
    href: '/collections/womens-nighties',
    code: null,
  },
];

const features = [
  { icon: FiTruck,       title: 'Free Delivery',   desc: 'On orders above ₹599',      color: 'text-rose-600',  bg: 'bg-rose-50'   },
  { icon: FiShield,      title: 'Secure Payment',  desc: 'UPI, Card & COD accepted',   color: 'text-amber-600', bg: 'bg-amber-50'  },
  { icon: FiRefreshCw,   title: 'Easy Returns',    desc: '7-day hassle-free returns',  color: 'text-rose-600',  bg: 'bg-rose-50'   },
  { icon: FiHeadphones,  title: '24/7 Support',    desc: 'Always here to help you',    color: 'text-amber-600', bg: 'bg-amber-50'  },
];

const testimonials = [
  { name: 'Priya R.',   location: 'Chennai',    text: 'Amazing quality kurtis! The fabric is so soft and the fit is perfect. Will definitely order again.', rating: 5 },
  { name: 'Lakshmi S.', location: 'Madurai',    text: 'The nighties are super comfortable. Fast delivery and packaging was great!',                          rating: 5 },
  { name: 'Meena K.',   location: 'Coimbatore', text: 'Best innerwear I have ever bought online. True to size and excellent quality.',                        rating: 4 },
];

/* ─── Banner Carousel ───────────────────────────────────────────── */
function BannerCarousel() {
  const [active, setActive]         = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const timerRef = useRef(null);

  const goTo = useCallback((idx) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive(idx);
    setTimeout(() => setIsAnimating(false), 600);
  }, [isAnimating]);

  const next = useCallback(() => goTo((active + 1) % bannerSlides.length), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + bannerSlides.length) % bannerSlides.length), [active, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [next]);

  return (
    <div className="relative w-full overflow-hidden rounded-2xl shadow-xl" style={{ height: 'clamp(220px, 50vw, 480px)' }}>
      {bannerSlides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === active ? 1 : 0, zIndex: i === active ? 1 : 0 }}
        >
          <img
            src={slide.image}
            alt={slide.heading.replace('\n', ' ')}
            className="w-full h-full object-cover object-center"
            loading={i === 0 ? 'eager' : 'lazy'}
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement.style.background =
                'linear-gradient(135deg,#831843 0%,#9d174d 50%,#be185d 100%)';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-transparent" />

          <div className="absolute inset-0 flex items-center px-6 sm:px-12 md:px-16">
            <div className="max-w-sm sm:max-w-md">
              <span className="inline-block font-sans text-[10px] sm:text-xs tracking-widest uppercase text-yellow-300 bg-yellow-400/20 border border-yellow-300/30 px-3 py-1 rounded-full mb-3 sm:mb-4">
                {slide.tag}
              </span>
              <h2 className="font-serif text-white text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-3 sm:mb-4 whitespace-pre-line">
                {slide.heading}
              </h2>
              <p className="text-white/75 text-xs sm:text-sm md:text-base mb-4 sm:mb-6 leading-relaxed hidden sm:block">
                {slide.sub}
              </p>
              {slide.code && (
                <p className="text-xs sm:text-sm mb-4 hidden sm:block">
                  Use code{' '}
                  <span className="font-bold text-yellow-300 bg-white/15 border border-white/25 px-2 py-0.5 rounded tracking-wider">
                    {slide.code}
                  </span>
                </p>
              )}
              <Link
                href={slide.href}
                className="inline-flex items-center gap-2 bg-yellow-500 hover:bg-yellow-400 text-white text-xs sm:text-sm font-semibold px-5 sm:px-7 py-2.5 sm:py-3 rounded-full transition-colors"
              >
                {slide.cta} <FiArrowRight size={13} />
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Prev / Next */}
      <button
        onClick={prev}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center border border-white/20 transition-all"
        aria-label="Previous slide"
      >
        <FiChevronLeft size={16} />
      </button>
      <button
        onClick={next}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-black/40 hover:bg-black/60 text-white flex items-center justify-center border border-white/20 transition-all"
        aria-label="Next slide"
      >
        <FiChevronRight size={16} />
      </button>

      {/* Dots */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex gap-1.5">
        {bannerSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`rounded-full transition-all duration-300 ${
              i === active ? 'w-5 h-2 bg-yellow-400' : 'w-2 h-2 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

/* ─── Section Heading ───────────────────────────────────────────── */
function SectionHeading({ script, title, dividerText }) {
  return (
    <div className="text-center mb-8 sm:mb-10 md:mb-12">
      <p className="font-serif italic text-rose-700 text-xl sm:text-2xl md:text-3xl mb-1">{script}</p>
      <h2 className="font-serif text-gray-900 text-2xl sm:text-3xl md:text-4xl font-bold">{title}</h2>
      <div className="flex items-center justify-center gap-3 mt-3">
        <span className="block h-px w-12 sm:w-16 bg-yellow-300" />
        <span className="text-yellow-600 text-[10px] tracking-widest font-medium">{dividerText}</span>
        <span className="block h-px w-12 sm:w-16 bg-yellow-300" />
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function HomePage({ featuredProducts = [], newArrivals = [] }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const videoRef  = useRef(null);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(() => setVideoError(true));
    }
  }, []);

  return (
    <Layout
      title="Premium Women's Fashion Online — Kurtis, Nighties & Innerwear | Sivakasi Fashion Hub"
      description="Shop ethnic kurtis, comfortable nighties, and premium innerwear online. Sivakasi Fashion Hub — quality clothing delivered pan-India. Free shipping above ₹599."
      keywords="women kurtis online sivakasi, buy nighties online tamil nadu, womens innerwear online india, mens innerwear buy online, ethnic wear online"
    >

      {/* ══ ANNOUNCEMENT BAR ══ */}
      {/* <div className="bg-rose-800 text-white text-center py-2 px-4 text-[11px] sm:text-xs font-medium tracking-wide">
        🎉 Free delivery on orders above ₹599 &nbsp;|&nbsp; Use code&nbsp;
        <span className="bg-yellow-400 text-rose-900 font-bold px-2 py-0.5 rounded-full text-[10px] tracking-wider mx-1">
          WELCOME20
        </span>
        &nbsp;for 20% off your first order
      </div> */}

      {/* ══ STICKY HEADER ══ */}
      {/* <header className="sticky top-0 z-50 bg-white border-b border-rose-100 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-14 sm:h-16"> */}

          {/* Logo */}
          {/* <Link href="/" className="flex flex-col leading-tight">
            <span className="font-serif text-rose-800 text-base sm:text-lg font-bold">Sivakasi Fashion Hub</span>
            <span className="text-yellow-600 text-[9px] sm:text-[10px] tracking-[0.15em] uppercase font-medium hidden xs:block">
              Premium Ethnic Wear
            </span>
          </Link> */}

          {/* Desktop nav */}
          {/* <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link href="/collections/womens-kurtis"   className="hover:text-rose-700 transition-colors">Kurtis</Link>
            <Link href="/collections/womens-nighties" className="hover:text-rose-700 transition-colors">Nighties</Link>
            <Link href="/collections/womens-innerwear" className="hover:text-rose-700 transition-colors">Women's Innerwear</Link>
            <Link href="/collections/mens-innerwear"  className="hover:text-rose-700 transition-colors">Men's Innerwear</Link>
            <Link href="/collections/all"             className="hover:text-rose-700 transition-colors">All</Link>
          </nav> */}

          {/* Right icons */}
          {/* <div className="flex items-center gap-1 sm:gap-2">
            <button aria-label="Search" className="p-2 rounded-full hover:bg-rose-50 text-gray-600 hover:text-rose-700 transition-colors">
              <FiSearch size={18} />
            </button>
            <Link href="/cart" className="relative p-2 rounded-full hover:bg-rose-50 text-gray-600 hover:text-rose-700 transition-colors" aria-label="Cart">
              <FiShoppingBag size={18} />
              <span className="absolute top-1 right-1 bg-rose-700 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">0</span>
            </Link> */}
            {/* Hamburger */}
            {/* <button
              className="md:hidden p-2 rounded-full hover:bg-rose-50 text-gray-600"
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(v => !v)}
            >
              {mobileMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div> */}

        {/* Mobile menu drawer */}
        {/* {mobileMenuOpen && (
          <nav className="md:hidden bg-white border-t border-rose-100 px-4 pb-4 pt-2 flex flex-col gap-1">
            {[
              ['Kurtis', '/collections/womens-kurtis'],
              ['Nighties', '/collections/womens-nighties'],
              ["Women's Innerwear", '/collections/womens-innerwear'],
              ["Men's Innerwear", '/collections/mens-innerwear'],
              ['All Products', '/collections/all'],
            ].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="py-2.5 px-3 rounded-lg text-sm font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-700 transition-colors"
              >
                {label}
              </Link>
            ))}
          </nav>
        )}
      </header> */}

      {/* ══ HERO ══ */}
      <section className="relative overflow-hidden" style={{ minHeight: 'clamp(300px, 70vw, 85vh)' }}>
        {!videoError ? (
          <video
            ref={videoRef}
            className="absolute inset-0 w-full h-full object-cover object-center"
            autoPlay loop muted playsInline
            // poster="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1400&q=80"
            onError={() => setVideoError(true)}
          >
            <source src="/videos/hero-fashion.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src="https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=1400&q=80"
            alt="Fashion hero"
            className="absolute inset-0 w-full h-full object-cover object-top"
          />
        )}

        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/30 to-black/65" />

        {/* Floating rings */}
        <div className="absolute top-16 left-8 w-20 h-20 border border-yellow-300/30 rounded-full animate-pulse opacity-40 hidden sm:block" />
        <div className="absolute bottom-24 right-12 w-14 h-14 border border-yellow-300/20 rounded-full animate-pulse opacity-30 hidden sm:block" style={{ animationDelay: '1s' }} />

        <div className="relative z-10 flex items-center justify-center min-h-[inherit] px-4 py-20 sm:py-28">
          <div className="text-center max-w-2xl mx-auto">
            <p className="font-serif italic text-yellow-300 text-lg sm:text-2xl md:text-3xl mb-1 sm:mb-2">Welcome to</p>
            <h1 className="font-vibes text-white text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-3 sm:mb-4">
              LakshmiBala Fashion Hub
            </h1>
            <p className="font-serif text-white/80 italic text-sm sm:text-lg md:text-xl mb-4 sm:mb-6">
              Elegance Crafted for Every Woman
            </p>
            <p className="text-white/65 text-xs sm:text-sm md:text-base max-w-md mx-auto mb-8 leading-relaxed px-4">
              Premium kurtis, comfortable nighties, quality innerwear — delivered to your doorstep across India from the heart of Sivakasi, Tamil Nadu.
            </p>
            <div className="flex flex-col xs:flex-row gap-3 justify-center px-6 xs:px-0">
              <Link
                href="/collections/womens-kurtis"
                className="bg-rose-700 hover:bg-rose-800 text-white text-sm font-semibold px-7 py-3 rounded-full transition-colors text-center"
              >
                Shop Women's Collection
              </Link>
              <Link
                href="/collections/mens-innerwear"
                className="bg-yellow-500 hover:bg-yellow-400 text-white text-sm font-semibold px-7 py-3 rounded-full transition-colors text-center"
              >
                Men's Innerwear
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 animate-bounce hidden sm:flex">
          <span className="text-white/50 text-[10px] tracking-widest uppercase">Scroll</span>
          <div className="w-px h-7 bg-gradient-to-b from-white/50 to-transparent" />
        </div>
      </section>

      {/* ══ FEATURES BAR ══ */}
      {/* <section className="bg-white border-y border-rose-100 py-5 sm:py-7 md:py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-5 md:gap-8">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="flex items-center gap-3 p-3 sm:p-4 rounded-xl hover:bg-rose-50/50 transition-colors"
              >
                <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-full ${bg} flex items-center justify-center ${color} shrink-0`}>
                  <Icon size={18} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-xs sm:text-sm">{title}</p>
                  <p className="text-gray-400 text-[10px] sm:text-xs leading-snug">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* ══ CATEGORIES ══ */}
      <section className="py-12 sm:py-16 md:py-20 bg-rose-50/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <SectionHeading script="Our Collections" title="Shop by Category" dividerText="✦ EXPLORE ✦" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {categories.map((cat) => (
              <Link key={cat.slug} href={`/collections/${cat.slug}`} className="block group">
                <div className="relative rounded-2xl overflow-hidden border border-rose-100 shadow-sm hover:shadow-md transition-shadow"
                  style={{ aspectRatio: '3/4' }}>
                  <img
                    src={cat.image}
                    alt={cat.label}
                    className="absolute inset-0 w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                      e.currentTarget.parentElement.style.background = '#831843';
                    }}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-b ${cat.gradient}`} />

                  {/* hover ring */}
                  <div className="absolute inset-0 rounded-2xl ring-2 ring-yellow-400/0 group-hover:ring-yellow-400/50 transition-all duration-300" />

                  <div className="absolute inset-0 flex flex-col items-center justify-end p-3 sm:p-4 pb-5 sm:pb-6">
                    <h3 className="font-serif text-white text-sm sm:text-base md:text-lg font-bold text-center leading-snug drop-shadow-md">
                      {cat.label}
                    </h3>
                    <p className="text-white/75 text-[10px] sm:text-xs mt-1 text-center drop-shadow">
                      {cat.desc}
                    </p>
                    <div className="mt-3 opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300">
                      <span className="bg-white/20 backdrop-blur-sm text-white text-[10px] sm:text-xs px-3 sm:px-4 py-1.5 rounded-full border border-white/30 font-medium">
                        Shop Now →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FEATURED PRODUCTS ══ */}
      {featuredProducts.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-8 sm:mb-10 gap-2">
              <div>
                <p className="font-serif italic text-rose-700 text-xl sm:text-2xl mb-0.5">Handpicked for You</p>
                <h2 className="font-serif text-gray-900 text-2xl sm:text-3xl font-bold">Featured Products</h2>
              </div>
              <Link
                href="/collections/all"
                className="flex items-center gap-1.5 text-sm text-rose-700 hover:text-rose-900 font-medium transition-colors self-start sm:self-auto"
              >
                View All <FiArrowRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {featuredProducts.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
          </div>
        </section>
      )}

      {/* ══ BANNER CAROUSEL ══ */}
      <section className="py-8 sm:py-12 md:py-14 bg-rose-50/40 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <BannerCarousel />
        </div>
      </section>

      {/* ══ NEW ARRIVALS ══ */}
      {newArrivals.length > 0 && (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">
            <SectionHeading script="Fresh Picks" title="New Arrivals" dividerText="✦ JUST IN ✦" />
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
              {newArrivals.map(p => <ProductCard key={p._id} product={p} />)}
            </div>
            <div className="mt-8 text-center">
              <Link
                href="/collections/all"
                className="inline-flex items-center gap-2 border-2 border-rose-700 text-rose-700 hover:bg-rose-700 hover:text-white font-semibold text-sm px-8 py-3 rounded-full transition-colors"
              >
                View All New Arrivals <FiArrowRight size={14} />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ══ PROMO STRIP ══ */}
      <section className="relative overflow-hidden py-0">
        <div className="relative h-36 sm:h-48">
          <img
            src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1400&q=80"
            alt="Special offer"
            className="w-full h-full object-cover object-center"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-rose-900/90 via-rose-800/70 to-transparent" />
          <div className="absolute inset-0 flex items-center px-6 sm:px-12 md:px-16">
            <div>
              <p className="text-yellow-300 text-[10px] sm:text-xs tracking-widest uppercase mb-1 sm:mb-2">Limited Time Offer</p>
              <h3 className="font-serif text-white text-xl sm:text-3xl md:text-4xl font-bold leading-tight mb-2 sm:mb-4">
                Get 20% Off Your<br className="hidden xs:block" />First Order
              </h3>
              <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                <span className="bg-white/15 border border-white/30 text-white font-bold text-xs sm:text-sm px-3 sm:px-4 py-1 rounded-full tracking-wider">
                  WELCOME20
                </span>
                <Link
                  href="/collections/all"
                  className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold text-xs sm:text-sm px-5 sm:px-6 py-2 sm:py-2.5 rounded-full transition-colors inline-flex items-center gap-1"
                >
                  Shop Now <FiArrowRight size={12} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIALS ══ */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-rose-50/40">
        <div className="max-w-7xl mx-auto">
          <SectionHeading script="Customer Love" title="What Our Customers Say" dividerText="✦ REVIEWS ✦" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-rose-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <FiStar
                      key={j}
                      size={14}
                      className={j < t.rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-200 fill-gray-200'}
                    />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-rose-700 to-pink-500 flex items-center justify-center text-white font-serif font-bold text-base flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location}, Tamil Nadu</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER ══ */}
      {/* <section className="py-12 sm:py-16 bg-rose-800 px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto text-center">
          <p className="font-serif italic text-yellow-300 text-lg sm:text-2xl mb-1">Stay in the Loop</p>
          <h2 className="font-serif text-white text-2xl sm:text-3xl font-bold mb-3">Get Exclusive Offers</h2>
          <p className="text-white/70 text-xs sm:text-sm mb-6">
            Subscribe to get notified about new arrivals, sales, and style tips.
          </p>
          <form
            className="flex flex-col xs:flex-row gap-2 sm:gap-3 max-w-sm mx-auto"
            onSubmit={(e) => e.preventDefault()}
          >
            <input
              type="email"
              placeholder="Your email address"
              className="flex-1 rounded-full px-4 py-2.5 text-sm text-gray-900 outline-none border-2 border-transparent focus:border-yellow-400 min-w-0"
            />
            <button
              type="submit"
              className="bg-yellow-500 hover:bg-yellow-400 text-white font-semibold text-sm px-6 py-2.5 rounded-full transition-colors whitespace-nowrap"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section> */}

    </Layout>
  );
}

/* ─── SSR ────────────────────────────────────────────────────────── */
export async function getServerSideProps() {
  try {
    const { default: dbConnect } = await import('../lib/mongodb');
    const { default: Product }   = await import('../models/Product');
    await dbConnect();

    const [featuredProducts, newArrivals] = await Promise.all([
      Product.find({ isActive: true, isFeatured: true })
        .select('name slug price originalPrice images category sizes colors rating reviewCount isBestseller isNewArrival totalStock')
        .limit(8)
        .lean(),
      Product.find({ isActive: true, isNewArrival: true })
        .select('name slug price originalPrice images category sizes colors rating reviewCount isBestseller isNewArrival totalStock')
        .sort({ createdAt: -1 })
        .limit(8)
        .lean(),
    ]);

    return {
      props: {
        featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
        newArrivals:       JSON.parse(JSON.stringify(newArrivals)),
      },
    };
  } catch {
    return { props: { featuredProducts: [], newArrivals: [] } };
  }
}
