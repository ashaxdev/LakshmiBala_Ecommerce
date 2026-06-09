'use client'
import { useRef, useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import Layout from '../components/store/Layout';
import ProductCard from '../components/store/ProductCard';
import {
  FiArrowRight, FiStar, FiTruck, FiShield,
  FiRefreshCw, FiHeadphones, FiChevronLeft,
  FiChevronRight, FiShoppingBag, FiX,
} from 'react-icons/fi';

/* ─── Data ─────────────────────────────────────────────────────── */
const categories = [
  { slug: 'womens-kurtis',   label: "Women's Kurtis",   desc: 'Elegant ethnic styles',   image: 'images/KURTHI.jpeg' },
  { slug: 'womens-nighties', label: "Women's Nighties", desc: 'Comfortable & breathable', image: 'images/NIGHTY.webp' },
  { slug: 'womens-innerwear',label: "Women's Innerwear",desc: 'Premium comfort fit',      image: 'images/INNER.webp'  },
  { slug: 'mens-innerwear',  label: "Men's Innerwear",  desc: 'Everyday essentials',     image: 'images/8.jpeg'      },
];

const heroSlides = [
  { id: 1, image: 'images/hero1.jpeg' },
  { id: 2, image: 'images/hero2.jpeg' },
  { id: 3, image: 'images/hero3.jpeg' },
];

const features = [
  { icon: FiTruck,      title: 'Free Delivery',  desc: 'On orders above ₹599',     color: 'text-pink-600', bg: 'bg-pink-50'  },
  { icon: FiShield,     title: 'Secure Payment', desc: 'UPI, Card & COD accepted',  color: 'text-rose-600', bg: 'bg-rose-50'  },
  { icon: FiRefreshCw,  title: 'Easy Returns',   desc: '7-day hassle-free returns', color: 'text-pink-600', bg: 'bg-pink-50'  },
  { icon: FiHeadphones, title: '24/7 Support',   desc: 'Always here to help you',   color: 'text-rose-600', bg: 'bg-rose-50'  },
];

// Add `photos` array to each testimonial — leave empty [] if none
const testimonials = [
  {
    name: 'Priya R.',   location: 'Chennai',    rating: 5, date: '2 days ago',
    text: 'Amazing quality kurtis! The fabric is so soft and the fit is perfect. Will definitely order again.',
    photos: ['images/review1a.jpg', 'images/review1b.jpg'],
  },
  {
    name: 'Lakshmi S.', location: 'Madurai',    rating: 5, date: '1 week ago',
    text: 'The nighties are super comfortable. Fast delivery and packaging was great!',
    photos: ['images/review2a.jpg'],
  },
  {
    name: 'Meena K.',   location: 'Coimbatore', rating: 4, date: '2 weeks ago',
    text: 'Best innerwear I have ever bought online. True to size and excellent quality.',
    photos: [],
  },
];

// Replace videoUrl with your actual hosted video URL or MP4 path.
// productSlug links to /collections/<slug> — change to /products/<slug> for a specific product page.
const reels = [
  { handle: '@priya_style_diary', caption: 'Kurti haul — summer picks',      views: '12.4k', videoUrl: 'images/reel1.mp4', productSlug: 'womens-kurtis',    img: 'images/reel1.jpg', featured: true  },
  { handle: '@madurai_fashion',   caption: 'Nighty unboxing — so comfy!',    views: '8.1k',  videoUrl: 'images/reel2.mp4', productSlug: 'womens-nighties',  img: 'images/reel2.jpg', featured: false },
  { handle: '@tamil_trendsetter', caption: 'Styling ethnic kurtis 3 ways',   views: '5.7k',  videoUrl: 'images/reel3.mp4', productSlug: 'womens-kurtis',    img: 'images/reel3.jpg', featured: false },
  { handle: '@coimbatore_closet', caption: 'My monthly fashion order',       views: '9.3k',  videoUrl: 'images/reel4.mp4', productSlug: 'womens-innerwear', img: 'images/reel4.jpg', featured: false },
  { handle: '@lakshmistyle',      caption: 'Day to night outfit switch',     views: '6.2k',  videoUrl: 'images/reel5.mp4', productSlug: 'womens-kurtis',    img: 'images/reel5.jpg', featured: false },
  { handle: '@trendingwithtamil', caption: 'Budget buys under ₹599',        views: '4.8k',  videoUrl: 'images/reel6.mp4', productSlug: 'womens-nighties',  img: 'images/reel6.jpg', featured: false },
];

const photos = [
  { img: 'images/1.jpeg',  label: 'Collection 01', title: 'Evening Silhouette' },
  { img: 'images/3.jpeg',  label: 'Collection 02', title: 'Urban Pulse'        },
  { img: 'images/4.jpeg',  label: 'Collection 03', title: 'Twilight Bloom'     },
  { img: 'images/5.jpeg',  label: 'Collection 04', title: 'Coastal Edit'       },
  { img: 'images/6.jpeg',  label: 'Collection 05', title: 'Studio Minimal'     },
  { img: 'images/8.jpeg',  label: 'Collection 06', title: 'Golden Hour'        },
  { img: 'images/13.jpeg', label: 'Collection 07', title: 'Monochrome Story'   },
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
  const resumeTimer = () => { timerRef.current = setInterval(next, 5500); };

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
  const total       = photos.length;
  const [current, setCurrent] = useState(0);
  const wrapRef     = useRef(null);
  const isAnimating = useRef(false);
  const autoTimer   = useRef(null);

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
      style={{ width: '100%', overflow: 'hidden', padding: '40px 0 32px', position: 'relative', background: '#fff' }}
      onMouseEnter={() => clearInterval(autoTimer.current)}
      onMouseLeave={startAuto}
    >
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
              <div
                style={{
                  position: 'absolute', inset: 0,
                  background: 'linear-gradient(to top, rgba(20,20,20,0.7) 0%, transparent 55%)',
                  opacity: isCenter ? 1 : 0,
                  transition: 'opacity 0.7s',
                }}
              />
              <div
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
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
      {script && (
        <p className="font-serif italic text-pink-500 text-xl sm:text-2xl md:text-3xl mb-1">{script}</p>
      )}
      <h2 className="font-serif text-gray-900 text-2xl sm:text-3xl md:text-4xl font-bold">{title}</h2>
      <div className="flex items-center justify-center gap-3 mt-3">
        <span className="block h-px w-12 sm:w-16 bg-pink-200" />
        <span className="text-pink-400 text-[10px] tracking-widest font-medium">{dividerText}</span>
        <span className="block h-px w-12 sm:w-16 bg-pink-200" />
      </div>
    </div>
  );
}

/* ─── Review Photo Lightbox ─────────────────────────────────────── */
function ReviewPhotoLightbox({ photos: lightboxPhotos, open, onClose }) {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    if (!open) setIdx(0);
  }, [open]);

  // Close on Escape key
  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open, onClose]);

  if (!open || !lightboxPhotos?.length) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-white/15 backdrop-blur-sm text-white hover:bg-white/25 flex items-center justify-center transition"
      >
        <FiX size={20} />
      </button>

      <div
        className="relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={lightboxPhotos[idx]}
          alt={`Review photo ${idx + 1}`}
          className="w-full rounded-2xl object-cover max-h-[80vh]"
        />

        {lightboxPhotos.length > 1 && (
          <>
            <button
              onClick={() => setIdx((idx - 1 + lightboxPhotos.length) % lightboxPhotos.length)}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"
            >
              <FiChevronLeft size={18} />
            </button>
            <button
              onClick={() => setIdx((idx + 1) % lightboxPhotos.length)}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/40 text-white flex items-center justify-center"
            >
              <FiChevronRight size={18} />
            </button>
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {lightboxPhotos.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIdx(i)}
                  className={`rounded-full transition-all ${
                    idx === i ? 'w-5 h-2 bg-white' : 'w-2 h-2 bg-white/50'
                  }`}
                />
              ))}
            </div>
          </>
        )}

        {/* Counter */}
        <div className="absolute top-3 left-3 bg-black/40 backdrop-blur-sm text-white text-xs px-2 py-0.5 rounded-full">
          {idx + 1} / {lightboxPhotos.length}
        </div>
      </div>
    </div>
  );
}

/* ─── Reviews Section ────────────────────────────────────────────── */
function ReviewsSection() {
  const [lightbox, setLightbox] = useState({ open: false, photos: [] });

  const openLightbox = useCallback((photos) => {
    setLightbox({ open: true, photos });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox({ open: false, photos: [] });
  }, []);

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-pink-50/50">
      <ReviewPhotoLightbox
        photos={lightbox.photos}
        open={lightbox.open}
        onClose={closeLightbox}
      />

      <div className="max-w-7xl mx-auto">
        <SectionHeading script="Customer Love" title="What Our Customers Say" dividerText="✦ REVIEWS ✦" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">

          {/* ── Rating Summary Card ── */}
          <div className="bg-white rounded-2xl p-5 sm:p-6 border border-pink-100 flex flex-col items-center justify-center gap-2 shadow-sm">
            <p className="text-xs text-gray-400 font-medium tracking-wide">Overall Rating</p>
            <p className="text-5xl font-bold text-pink-500 leading-none">4.8</p>
            <div className="flex gap-1">
              {[...Array(5)].map((_, i) => (
                <FiStar key={i} size={16} className="text-pink-400 fill-pink-400" />
              ))}
            </div>
            <p className="text-xs text-gray-400">Based on 284 reviews</p>
            <div className="w-full mt-2 space-y-1.5">
              {[[5, 78],[4, 14],[3, 5],[2, 2],[1, 1]].map(([star, pct]) => (
                <div key={star} className="flex items-center gap-2">
                  <span className="text-[11px] text-gray-500 w-2">{star}</span>
                  <div className="flex-1 h-1.5 bg-pink-100 rounded-full overflow-hidden">
                    <div className="h-full bg-pink-400 rounded-full" style={{ width: `${pct}%` }} />
                  </div>
                  <span className="text-[11px] text-gray-400 w-7">{pct}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Individual Review Cards ── */}
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-5 sm:p-6 border border-pink-100 shadow-sm hover:shadow-md transition-shadow flex flex-col justify-between"
            >
              <div>
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <FiStar
                      key={j}
                      size={13}
                      className={j < t.rating ? 'text-pink-400 fill-pink-400' : 'text-gray-200 fill-gray-200'}
                    />
                  ))}
                </div>

                {/* Review text */}
                <p className="text-gray-500 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>

                {/* Review photos */}
                {t.photos?.length > 0 && (
                  <div className="flex gap-2 mb-4 flex-wrap">
                    {t.photos.slice(0, 3).map((photo, pi) => (
                      <button
                        key={pi}
                        onClick={() => openLightbox(t.photos)}
                        className="relative w-16 h-16 rounded-xl overflow-hidden border-2 border-pink-100 hover:border-pink-400 transition-colors flex-shrink-0 group"
                      >
                        <img
                          src={photo}
                          alt="Customer review photo"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                          onError={(e) => {
                            e.currentTarget.parentElement.style.background = '#fce7f3';
                            e.currentTarget.style.display = 'none';
                          }}
                        />
                        {/* Show "+N more" overlay on last visible thumb if there are more */}
                        {pi === 2 && t.photos.length > 3 && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <span className="text-white text-xs font-bold">+{t.photos.length - 3}</span>
                          </div>
                        )}
                        {/* Show "+N" overlay on first thumb if only 2 photos and more hidden */}
                        {pi === 0 && t.photos.length === 2 && (
                          <div className="absolute bottom-0 right-0 bg-pink-500 text-white text-[9px] font-bold px-1 py-0.5 rounded-tl-md">
                            2
                          </div>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Reviewer info */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-pink-500 to-rose-400 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {t.name[0]}
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-900">{t.name}</p>
                    <p className="text-xs text-gray-400">{t.location}, Tamil Nadu</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-pink-50">
                  <span className="text-[11px] bg-pink-50 text-pink-600 px-2 py-0.5 rounded-full font-medium">
                    ✓ Verified Purchase
                  </span>
                  <span className="text-[11px] text-gray-400">{t.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-8">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 bg-pink-500 hover:bg-pink-600 text-white font-semibold text-sm px-8 py-3 rounded-full transition-colors"
          >
            See All Reviews <FiArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}

/* ─── Reel Video Modal ───────────────────────────────────────────── */
function ReelModal({ reel, onClose }) {
  const videoRef = useRef(null);

  // Close on Escape
  useEffect(() => {
    if (!reel) return;
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [reel, onClose]);

  // Pause video when modal closes
  useEffect(() => {
    if (!reel && videoRef.current) {
      videoRef.current.pause();
    }
  }, [reel]);

  if (!reel) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/85 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute -top-11 right-0 flex items-center gap-1.5 text-white/80 hover:text-white text-sm transition"
        >
          <FiX size={18} /> Close
        </button>

        {/* Video player — aspect ratio 9:16 like a reel */}
        <div className="rounded-2xl overflow-hidden bg-black" style={{ aspectRatio: '9/16' }}>
          <video
            ref={videoRef}
            src={reel.videoUrl}
            poster={reel.img}
            controls
            autoPlay
            playsInline
            className="w-full h-full object-cover"
          />
        </div>

        {/* Shop This Look panel */}
        <div className="mt-3 bg-white rounded-2xl p-4 flex items-center justify-between gap-3 shadow-lg">
          <div className="min-w-0">
            <p className="text-[11px] text-gray-400 mb-0.5 truncate">{reel.handle}</p>
            <p className="text-sm font-semibold text-gray-900 leading-snug line-clamp-2">{reel.caption}</p>
          </div>
          <Link
            href={`/collections/${reel.productSlug}`}
            onClick={onClose}
            className="flex-shrink-0 inline-flex items-center gap-1.5 bg-pink-500 hover:bg-pink-600 text-white text-sm font-semibold px-4 py-2.5 rounded-full transition-colors"
          >
            <FiShoppingBag size={13} /> Shop
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── Shop By Reels Section ──────────────────────────────────────── */
function ReelsSection() {
  const [activeReel, setActiveReel] = useState(null);

  const closeReel = useCallback(() => setActiveReel(null), []);

  return (
    <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white border-t border-pink-100">
      <ReelModal reel={activeReel} onClose={closeReel} />

      <div className="max-w-7xl mx-auto">
        {/* Instagram badge */}
        <div className="text-center mb-2">
          <span className="inline-flex items-center gap-1.5 text-xs bg-pink-50 text-pink-600 border border-pink-100 px-3 py-1 rounded-full font-medium">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            As seen on Instagram
          </span>
        </div>

        <SectionHeading script="Real looks, real people" title="Shop By Reels" dividerText="✦ CUSTOMER VIDEOS ✦" />

        {/* Scrollable reel strip */}
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-4 px-4 sm:mx-0 sm:px-0 sm:flex-wrap sm:justify-center">
          {reels.map((reel, i) => (
            <div
              key={i}
              className={`flex-shrink-0 w-36 sm:w-40 relative rounded-2xl overflow-hidden cursor-pointer group ${
                reel.featured ? 'ring-2 ring-pink-500' : ''
              }`}
              style={{ height: 240 }}
            >
              {/* Thumbnail */}
              <img
                src={reel.img}
                alt={reel.caption}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.parentElement.style.background = '#fce7f3';
                }}
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

              {/* Views badge */}
              <div className="absolute top-2.5 right-2.5 flex items-center gap-1 bg-black/40 backdrop-blur-sm text-white text-[10px] px-2 py-0.5 rounded-full">
                <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
                {reel.views}
              </div>

              {/* Featured badge */}
              {reel.featured && (
                <div className="absolute top-2.5 left-2.5 bg-pink-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full tracking-wide uppercase">
                  Featured
                </div>
              )}

              {/* Play button — clicking opens video modal */}
              <button
                onClick={() => setActiveReel(reel)}
                className="absolute inset-0 flex items-center justify-center"
                aria-label={`Play reel: ${reel.caption}`}
              >
                <div className="w-11 h-11 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white group-hover:bg-white/35 group-hover:scale-110 transition-all duration-300">
                  <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
                    <polygon points="5 3 19 12 5 21 5 3"/>
                  </svg>
                </div>
              </button>

              {/* Bottom info + Shop button */}
              <div className="absolute bottom-0 left-0 right-0 p-3 pointer-events-none">
                <p className="text-[10px] text-white/70 mb-0.5">{reel.handle}</p>
                <p className="text-xs text-white font-semibold leading-snug line-clamp-2 mb-2">{reel.caption}</p>
                {/* Shop This Look — direct link, stops event from bubbling to play */}
                <Link
                  href={`/collections/${reel.productSlug}`}
                  onClick={(e) => e.stopPropagation()}
                  className="pointer-events-auto inline-flex items-center gap-1 bg-white text-pink-600 text-[10px] font-bold px-2.5 py-1 rounded-full hover:bg-pink-50 transition-colors"
                >
                  <FiShoppingBag size={9} /> Shop this look
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* Tag us line */}
        <p className="text-center mt-4 text-xs text-gray-400">
          Tag us{' '}
          <a
            href="https://instagram.com/lakshmibalafashion"
            target="_blank"
            rel="noreferrer"
            className="text-pink-500 font-semibold hover:underline"
          >
            @lakshmibalafashion
          </a>{' '}
          on Instagram to be featured here
        </p>

        {/* Follow CTA */}
        <div className="text-center mt-5">
          <a
            href="https://instagram.com/lakshmibalafashion"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 border-2 border-pink-500 text-pink-600 hover:bg-pink-500 hover:text-white font-semibold text-sm px-7 py-2.5 rounded-full transition-colors"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
              <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
            </svg>
            Follow on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Main Page ─────────────────────────────────────────────────── */
export default function HomePage({
  featuredProducts = [],
  newArrivals      = [],
  bestSelling      = [],
  topRated         = [],
}) {
  const [activeTab, setActiveTab] = useState('new');

  const tabs = [
    { key: 'new',  label: 'New Arrivals', badge: '✦ JUST IN ✦',       href: '/collections/all',          products: newArrivals  },
    { key: 'best', label: 'Best Selling', badge: '✦ TOP PICKS ✦',     href: '/collections/best-selling', products: bestSelling  },
    { key: 'top',  label: 'Top Rated',    badge: '✦ HIGHEST RATED ✦', href: '/collections/top-rated',    products: topRated     },
  ];

  const current     = tabs.find((t) => t.key === activeTab);
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

            {/* Tab buttons */}
            <div className="flex justify-center mb-8">
              <div className="flex bg-gray-100 rounded-full p-1 gap-1">
                {tabs.map((tab) => (
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

            <SectionHeading title={current.label} dividerText={current.badge} />

            {current.products.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
                {current.products.map((p) => (
                  <ProductCard key={p._id} product={p} />
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-400 py-12">No products found.</p>
            )}

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

      {/* ══ REVIEWS ══ */}
      <ReviewsSection />

      {/* ══ SHOP BY REELS ══ */}
      <ReelsSection />

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

    const [featuredProducts, newArrivals, bestSelling, topRated] = await Promise.all([
      Product.find({ isActive: true, isFeatured: true })
        .select(selectFields).limit(8).lean(),
      Product.find({ isActive: true, isNewArrival: true })
        .select(selectFields).sort({ createdAt: -1 }).limit(8).lean(),
      Product.find({ isActive: true, isBestseller: true })
        .select(selectFields).sort({ reviewCount: -1 }).limit(8).lean(),
      Product.find({ isActive: true })
        .select(selectFields).sort({ rating: -1 }).limit(8).lean(),
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
    return {
      props: { featuredProducts: [], newArrivals: [], bestSelling: [], topRated: [] },
    };
  }
}