'use client'
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
  },
  {
    slug: 'womens-nighties',
    label: "Women's Nighties",
    desc: 'Comfortable & breathable',
    image: 'images/NIGHTY.webp',
  },
  {
    slug: 'womens-innerwear',
    label: "Women's Innerwear",
    desc: 'Premium comfort fit',
    image: 'images/INNER.webp',
  },
  {
    slug: 'mens-innerwear',
    label: "Men's Innerwear",
    desc: 'Everyday essentials',
    image: 'images/8.jpeg',
  },
];

const heroSlides = [
  { id: 1, image: 'images/hero1.jpeg' },
  { id: 2, image: 'images/hero2.jpeg' },
  { id: 3, image: 'images/hero3.jpeg' },
];

const features = [
  { icon: FiTruck,      title: 'Free Delivery',  desc: 'On orders above ₹599',     color: 'text-pink-600',  bg: 'bg-pink-50'   },
  { icon: FiShield,     title: 'Secure Payment', desc: 'UPI, Card & COD accepted',  color: 'text-rose-600',  bg: 'bg-rose-50'   },
  { icon: FiRefreshCw,  title: 'Easy Returns',   desc: '7-day hassle-free returns', color: 'text-pink-600',  bg: 'bg-pink-50'   },
  { icon: FiHeadphones, title: '24/7 Support',   desc: 'Always here to help you',   color: 'text-rose-600',  bg: 'bg-rose-50'   },
];

const testimonials = [
  { name: 'Priya R.',   location: 'Chennai',    text: 'Amazing quality kurtis! The fabric is so soft and the fit is perfect. Will definitely order again.', rating: 5 },
  { name: 'Lakshmi S.', location: 'Madurai',    text: 'The nighties are super comfortable. Fast delivery and packaging was great!',                          rating: 5 },
  { name: 'Meena K.',   location: 'Coimbatore', text: 'Best innerwear I have ever bought online. True to size and excellent quality.',                        rating: 4 },
];

const photos = [
  { img: "images/1.jpeg",  label: "Collection 01", title: "Evening Silhouette" },
  { img: "images/3.jpeg",  label: "Collection 02", title: "Urban Pulse"        },
  { img: "images/4.jpeg",  label: "Collection 03", title: "Twilight Bloom"     },
  { img: "images/5.jpeg",  label: "Collection 04", title: "Coastal Edit"       },
  { img: "images/6.jpeg",  label: "Collection 05", title: "Studio Minimal"     },
  { img: "images/8.jpeg",  label: "Collection 06", title: "Golden Hour"        },
  { img: "images/13.jpeg", label: "Collection 07", title: "Monochrome Story"   },
];

/* ─── Hero Carousel ─────────────────────────────────────────────── */
function HeroCarousel() {
  const [active, setActive]           = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [touchStart, setTouchStart]   = useState(null);
  const timerRef = useRef(null);

  const goTo = useCallback((idx) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive(idx);
    setTimeout(() => setIsAnimating(false), 700);
  }, [isAnimating]);

  const next = useCallback(() => goTo((active + 1) % heroSlides.length), [active, goTo]);
  const prev = useCallback(() => goTo((active - 1 + heroSlides.length) % heroSlides.length), [active, goTo]);

  useEffect(() => {
    timerRef.current = setInterval(next, 5500);
    return () => clearInterval(timerRef.current);
  }, [next]);

  const pauseTimer  = () => clearInterval(timerRef.current);
  const resumeTimer = () => { timerRef.current = setInterval(next, 2500); };

  const onTouchStart = (e) => setTouchStart(e.touches[0].clientX);
  const onTouchEnd   = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
    setTouchStart(null);
  };

  return (
    <section
      className="relative w-full h-[70vh] overflow-hidden"
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      {heroSlides.map((slide, i) => (
        <div
          key={slide.id}
          className="absolute inset-0 transition-opacity duration-700 ease-in-out"
          style={{ opacity: active === i ? 1 : 0, zIndex: active === i ? 10 : 0 }}
        >
          <img
            src={slide.image}
            alt={`Hero slide ${i + 1}`}
            className="absolute inset-0 w-full h-full object-cover object-center"
            loading={i === 0 ? 'eager' : 'lazy'}
          />
        </div>
      ))}

      <button
        onClick={prev}
        className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 flex items-center justify-center transition"
      >
        <FiChevronLeft size={22} />
      </button>

      <button
        onClick={next}
        className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/15 backdrop-blur-md text-white hover:bg-white/25 flex items-center justify-center transition"
      >
        <FiChevronRight size={22} />
      </button>

      <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex gap-2 sm:gap-3">
        {heroSlides.map((_, i) => (
          <button
            key={i}
            onClick={() => goTo(i)}
            className={`transition-all duration-300 rounded-full ${
              active === i ? 'w-8 sm:w-10 h-2 bg-white' : 'w-2 h-2 bg-white/50'
            }`}
          />
        ))}
      </div>
    </section>
  );
}

/* ─── Photo Card Carousel ───────────────────────────────────────── */
const CARD_SIZES = {
  center: { width: 340, height: 420, opacity: 1,   zIndex: 3 },
  side1:  { width: 220, height: 300, opacity: 0.7, zIndex: 2 },
  side2:  { width: 160, height: 220, opacity: 0.4, zIndex: 1 },
  hidden: { width: 120, height: 160, opacity: 0,   zIndex: 0 },
};

function getRole(offset) {
  const abs = Math.abs(offset);
  if (abs === 0) return 'center';
  if (abs === 1) return 'side1';
  if (abs === 2) return 'side2';
  return 'hidden';
}

function PhotoCardCarousel() {
  const total = photos.length;
  const [current, setCurrent] = useState(0);
  const wrapRef      = useRef(null);
  const isAnimating  = useRef(false);
  const autoTimer    = useRef(null);

  const goTo = useCallback((idx) => {
    if (isAnimating.current) return;
    isAnimating.current = true;
    setCurrent(((idx % total) + total) % total);
    setTimeout(() => { isAnimating.current = false; }, 750);
  }, [total]);

  const startAuto = useCallback(() => {
    clearInterval(autoTimer.current);
    autoTimer.current = setInterval(() => {
      if (!isAnimating.current) setCurrent((prev) => (prev + 1) % total);
    }, 2800);
  }, [total]);

  useEffect(() => {
    startAuto();
    return () => clearInterval(autoTimer.current);
  }, [startAuto]);

  const getOffset = (i) => {
    let offset = i - current;
    if (offset >  total / 2) offset -= total;
    if (offset < -total / 2) offset += total;
    return offset;
  };

  const getTrackX = () => {
    const ww  = wrapRef.current?.offsetWidth ?? 680;
    const gap = 20;
    let x = ww / 2 - CARD_SIZES.center.width / 2;
    for (let i = 0; i < current; i++) {
      const role = getRole(getOffset(i));
      x -= CARD_SIZES[role].width + gap;
    }
    return x;
  };

  return (
    <div
      ref={wrapRef}
      style={{ width: '100%', overflow: 'hidden', padding: '40px 0 32px', position: 'relative', fontFamily: 'sans-serif', background: '#fff' }}
      onMouseEnter={() => clearInterval(autoTimer.current)}
      onMouseLeave={startAuto}
    >
      {/* Track */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 20,
          transform: `translateX(${getTrackX()}px)`,
          transition: 'transform 0.7s cubic-bezier(0.77,0,0.175,1)',
          willChange: 'transform',
        }}
      >
        {photos.map((photo, i) => {
          const offset   = getOffset(i);
          const role     = getRole(offset);
          const size     = CARD_SIZES[role];
          const isCenter = role === 'center';

          return (
            <div
              key={i}
              onClick={() => goTo(i)}
              style={{
                flexShrink: 0,
                width: size.width,
                height: size.height,
                borderRadius: 20,
                overflow: 'hidden',
                cursor: isCenter ? 'default' : 'pointer',
                opacity: size.opacity,
                zIndex: size.zIndex,
                position: 'relative',
                transition: 'all 0.7s cubic-bezier(0.77,0,0.175,1)',
                pointerEvents: role === 'hidden' ? 'none' : 'auto',
              }}
            >
              {/* FIX: added width/height/display to img so it fills the card */}
              <img
                src={photo.img}
                alt={photo.title}
                loading="lazy"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: isCenter ? 'scale(1.05)' : 'scale(1)',
                  transition: 'transform 0.7s ease',
                }}
              />

              {/* Overlay on center card */}
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: 'linear-gradient(to top, rgba(20,20,20,0.7) 0%, transparent 55%)',
                  opacity: isCenter ? 1 : 0,
                  transition: 'opacity 0.7s',
                }}
              />

              {/* Caption on center card */}
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  padding: '18px 20px',
                  opacity: isCenter ? 1 : 0,
                  transform: isCenter ? 'translateY(0)' : 'translateY(6px)',
                  transition: 'all 0.7s 0.1s',
                }}
              >
                <p style={{ fontSize: 10, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', margin: '0 0 4px' }}>
                  {photo.label}
                </p>
                <p style={{ fontSize: 22, fontStyle: 'italic', color: '#fff', margin: 0, lineHeight: 1.2, fontWeight: 600 }}>
                  {photo.title}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

/* ─── Section Heading ───────────────────────────────────────────── */
function SectionHeading({ script, title, dividerText }) {
  return (
    <div className="text-center mb-8 sm:mb-10 md:mb-12">
      {script && <p className="font-serif italic text-pink-500 text-xl sm:text-2xl md:text-3xl mb-1">{script}</p>}
      <h2 className="font-serif text-gray-900 text-2xl sm:text-3xl md:text-4xl font-bold">{title}</h2>
      <div className="flex items-center justify-center gap-3 mt-3">
        <span className="block h-px w-12 sm:w-16 bg-pink-200" />
        <span className="text-pink-400 text-[10px] tracking-widest font-medium">{dividerText}</span>
        <span className="block h-px w-12 sm:w-16 bg-pink-200" />
      </div>
    </div>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
// FIX: all three product lists are now received as props (fetched in getServerSideProps)
export default function HomePage({ featuredProducts = [], newArrivals = [], bestSelling = [], topRated = [] }) {

  const [activeTab, setActiveTab] = useState('new');

  // FIX: tabs array is defined INSIDE the component so it can reference the prop values
  const tabs = [
    { key: 'new',  label: 'New Arrivals', badge: '✦ JUST IN ✦',       href: '/collections/all',          products: newArrivals  },
    { key: 'best', label: 'Best Selling', badge: '✦ TOP PICKS ✦',     href: '/collections/best-selling', products: bestSelling  },
    { key: 'top',  label: 'Top Rated',    badge: '✦ HIGHEST RATED ✦', href: '/collections/top-rated',    products: topRated     },
  ];

  const current = tabs.find(t => t.key === activeTab);

  const hasProducts = newArrivals.length > 0 || bestSelling.length > 0 || topRated.length > 0;

  return (
    <Layout
      title="Premium Women's Fashion Online — Kurtis, Nighties & Innerwear | LakshmiBala Fashion Hub"
      description="Shop ethnic kurtis, comfortable nighties, and premium innerwear online. LakshmiBala Fashion Hub — quality clothing delivered pan-India. Free shipping above ₹599."
      keywords="women kurtis online sivakasi, buy nighties online tamil nadu, womens innerwear online india, mens innerwear buy online, ethnic wear online"
    >

      {/* ══ CATEGORIES ══ */}
      <section className="py-12 sm:py-16 md:py-5 bg-pink-50/50 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-5 overflow-x-auto pb-1 sm:justify-center sm:flex-wrap scrollbar-hide">
            {categories.map((cat) => (
              <Link
                key={cat.slug}
                href={`/collections/${cat.slug}`}
                className="flex flex-col items-center gap-2.5 flex-shrink-0 group"
              >
                <div className="p-[3px] w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] md:w-[100px] md:h-[100px]">
                  <div className="w-full h-full rounded-full overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.label}
                      className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                        e.currentTarget.parentElement.style.background = '#f472b6';
                      }}
                    />
                  </div>
                </div>
                <p className="text-xs sm:text-sm font-medium text-gray-800 text-center leading-snug max-w-[90px] sm:max-w-[110px]">
                  {cat.label}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══ HERO CAROUSEL ══ */}
      <HeroCarousel />

      {/* ══ PHOTO CARD CAROUSEL ══ */}
      <section className="py-8 sm:py-12 md:py-14 px-4 sm:px-6 lg:px-8 bg-white">
        <PhotoCardCarousel />
      </section>

      {/* ══ TABBED PRODUCTS ══ */}
      {hasProducts && (
        <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-7xl mx-auto">

            {/* Tab Buttons */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-100 rounded-full p-1 gap-1">
                {tabs.map(tab => (
                  <button
                    key={tab.key}
                    onClick={() => setActiveTab(tab.key)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-200 ${
                      activeTab === tab.key
                        ? 'bg-pink-500 text-white shadow-sm'
                        : 'text-gray-500 hover:text-pink-500'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Section Heading */}
            <SectionHeading title={current.label} dividerText={current.badge} />

            {/* Products Grid — graceful empty state */}
            {current.products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {current.products.map(p => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-12">No products found.</p>
            )}

            {/* CTA */}
            <div className="mt-8 text-center">
              <Link
                href={current.href}
                className="inline-flex items-center gap-2 border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white font-semibold text-sm px-8 py-3 rounded-full transition-colors"
              >
                View All {current.label} <FiArrowRight size={14} />
              </Link>
            </div>

          </div>
        </section>
      )}

      {/* ══ TESTIMONIALS ══ */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-pink-50/50">
        <div className="max-w-7xl mx-auto">
          <SectionHeading script="Customer Love" title="What Our Customers Say" dividerText="✦ REVIEWS ✦" />
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 md:gap-6">
            {testimonials.map((t, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl p-5 sm:p-6 border border-pink-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <FiStar
                      key={j}
                      size={14}
                      className={j < t.rating ? 'text-pink-400 fill-pink-400' : 'text-gray-200 fill-gray-200'}
                    />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center text-white font-serif font-bold text-base flex-shrink-0">
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

    </Layout>
  );
}

/* ─── SSR ────────────────────────────────────────────────────────── */
export async function getServerSideProps() {
  try {
    const { default: dbConnect } = await import('../lib/mongodb');
    const { default: Product }   = await import('../models/Product');
    await dbConnect();

    const selectFields = 'name slug price originalPrice images category sizes colors rating reviewCount isBestseller isNewArrival totalStock';

    // FIX: fetch all three product lists needed by the tabs
    const [featuredProducts, newArrivals, bestSelling, topRated] = await Promise.all([
      Product.find({ isActive: true, isFeatured: true })
        .select(selectFields)
        .limit(8)
        .lean(),
      Product.find({ isActive: true, isNewArrival: true })
        .select(selectFields)
        .sort({ createdAt: -1 })
        .limit(8)
        .lean(),
      Product.find({ isActive: true, isBestseller: true })
        .select(selectFields)
        .sort({ reviewCount: -1 })
        .limit(8)
        .lean(),
      Product.find({ isActive: true })
        .select(selectFields)
        .sort({ rating: -1 })
        .limit(8)
        .lean(),
    ]);

    return {
      props: {
        featuredProducts: JSON.parse(JSON.stringify(featuredProducts)),
        newArrivals:      JSON.parse(JSON.stringify(newArrivals)),
        bestSelling:      JSON.parse(JSON.stringify(bestSelling)),
        topRated:         JSON.parse(JSON.stringify(topRated)),
      },
    };
  } catch {
    return { props: { featuredProducts: [], newArrivals: [], bestSelling: [], topRated: [] } };
  }
}