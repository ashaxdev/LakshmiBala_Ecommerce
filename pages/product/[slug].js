import { useState } from 'react';
import Link from 'next/link';
import Layout from '../../components/store/Layout';
import { useCart } from '../../context/CartContext';
import { FiHeart, FiShoppingBag, FiStar, FiTruck, FiShield, FiChevronRight, FiShare2 } from 'react-icons/fi';
import toast from 'react-hot-toast';

export default function ProductPage({ product }) {
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0]?.size || '');
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.name || '');
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('desc');
  const { dispatch } = useCart();

  if (!product) {
    return (
      <Layout title="Product Not Found">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <p className="font-vibes text-primary text-5xl mb-3">Oops!</p>
            <h1 className="font-playfair text-2xl text-text-dark mb-4">Product not found</h1>
            <Link href="/" className="btn-primary">Back to Home</Link>
          </div>
        </div>
      </Layout>
    );
  }

  const selectedSizeObj = product.sizes?.find(s => s.size === selectedSize);
  const inStock = !selectedSize || (selectedSizeObj?.stock > 0);

  const addToCart = () => {
    if (!selectedSize && product.sizes?.length > 0) {
      toast.error('Please select a size');
      return;
    }
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: product.images?.[0]?.url,
        size: selectedSize,
        color: selectedColor,
        quantity: qty,
        slug: product.slug,
      }
    });
    toast.success('Added to cart!', {
      icon: '🛍️',
      style: { borderRadius: '50px', background: '#FFF9F5', color: '#3A2A2A', border: '1px solid #D4AF37' }
    });
  };

  const discountPct = product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100) : 0;

  return (
    <Layout
      title={product.seoTitle || product.name}
      description={product.seoDescription || product.shortDescription}
      keywords={(product.seoKeywords || []).join(', ')}
    >
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gold/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center gap-2 font-poppins text-xs text-gray-400">
          <Link href="/" className="hover:text-primary">Home</Link>
          <FiChevronRight size={12} />
          <Link href={`/collections/${product.category}`} className="hover:text-primary capitalize">
            {product.category?.replace(/-/g, ' ')}
          </Link>
          <FiChevronRight size={12} />
          <span className="text-text-dark truncate max-w-xs">{product.name}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 py-10">
        <div className="grid md:grid-cols-2 gap-10 lg:gap-16">
          {/* Images */}
          <div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden bg-gray-50 border border-gold/20 mb-4">
              <img
                src={product.images?.[activeImg]?.url || '/images/placeholder.jpg'}
                alt={product.images?.[activeImg]?.alt || product.name}
                className="w-full h-full object-cover"
              />
              {discountPct > 0 && (
                <span className="absolute top-4 left-4 badge badge-pink text-sm px-3">-{discountPct}% OFF</span>
              )}
              <button className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow hover:bg-primary hover:text-white transition-colors">
                <FiHeart size={18} />
              </button>
            </div>
            {product.images?.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pb-1">
                {product.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImg(i)}
                    className={`shrink-0 w-16 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                      activeImg === i ? 'border-primary' : 'border-gold/20'
                    }`}
                  >
                    <img src={img.url} alt={img.alt || product.name} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details */}
          <div>
            <p className="font-poppins text-xs text-secondary uppercase tracking-widest mb-2 capitalize">
              {product.category?.replace(/-/g, ' ')}
            </p>
            <h1 className="font-playfair text-2xl md:text-3xl font-bold text-text-dark mb-3 leading-tight">
              {product.name}
            </h1>

            {/* Rating */}
            {product.reviewCount > 0 && (
              <div className="flex items-center gap-2 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={14} className={i < Math.round(product.rating) ? 'star fill-current' : 'star-empty fill-current'} />
                  ))}
                </div>
                <span className="font-poppins text-sm text-gray-400">{product.rating} ({product.reviewCount} reviews)</span>
              </div>
            )}

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6 pb-6 border-b border-gold/20">
              <span className="font-playfair text-3xl font-bold text-primary">₹{product.price.toLocaleString()}</span>
              {product.originalPrice > product.price && (
                <>
                  <span className="font-poppins text-lg text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
                  <span className="badge badge-green">Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
                </>
              )}
            </div>

            {/* Colors */}
            {product.colors?.length > 0 && (
              <div className="mb-5">
                <p className="font-poppins font-semibold text-sm text-text-dark mb-2">
                  Color: <span className="text-primary">{selectedColor}</span>
                </p>
                <div className="flex gap-2 flex-wrap">
                  {product.colors.map(c => (
                    <button
                      key={c.name}
                      onClick={() => setSelectedColor(c.name)}
                      title={c.name}
                      className={`w-8 h-8 rounded-full border-2 transition-all ${
                        selectedColor === c.name ? 'border-primary scale-110 ring-2 ring-primary/30' : 'border-gold/30'
                      }`}
                      style={{ backgroundColor: c.hex }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Sizes */}
            {product.sizes?.length > 0 && (
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="font-poppins font-semibold text-sm text-text-dark">
                    Size: <span className="text-primary">{selectedSize}</span>
                  </p>
                  <Link href="/size-guide" className="font-poppins text-xs text-secondary hover:text-secondary-dark">
                    Size Guide →
                  </Link>
                </div>
                <div className="flex gap-2 flex-wrap">
                  {product.sizes.map(s => (
                    <button
                      key={s.size}
                      onClick={() => s.stock > 0 && setSelectedSize(s.size)}
                      disabled={s.stock === 0}
                      className={`min-w-[48px] px-3 py-2 rounded-lg text-sm font-poppins font-medium border-2 transition-all ${
                        selectedSize === s.size
                          ? 'border-primary bg-primary text-white'
                          : s.stock > 0
                          ? 'border-gold/40 text-text-dark hover:border-primary hover:text-primary'
                          : 'border-gray-200 text-gray-300 line-through cursor-not-allowed'
                      }`}
                    >
                      {s.size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Qty + Actions */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex items-center border border-gold/30 rounded-xl overflow-hidden">
                <button onClick={() => setQty(Math.max(1, qty - 1))} className="px-4 py-3 hover:bg-accent/20 text-text-dark font-semibold">−</button>
                <span className="px-4 py-3 font-poppins font-semibold text-text-dark min-w-[3rem] text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-4 py-3 hover:bg-accent/20 text-text-dark font-semibold">+</button>
              </div>
              <button
                onClick={addToCart}
                disabled={!inStock}
                className="flex-1 btn-primary flex items-center justify-center gap-2 py-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiShoppingBag size={18} />
                {inStock ? 'Add to Cart' : 'Out of Stock'}
              </button>
              <button className="w-12 h-12 border border-gold/30 rounded-xl flex items-center justify-center hover:border-primary hover:text-primary text-text-dark transition-colors">
                <FiShare2 size={18} />
              </button>
            </div>

            <Link
              href="/checkout"
              onClick={() => addToCart()}
              className="block w-full btn-gold py-3 text-center text-sm font-semibold rounded-full mb-6"
            >
              Buy Now
            </Link>

            {/* Assurance */}
            <div className="grid grid-cols-2 gap-3 p-4 bg-accent/10 rounded-2xl border border-gold/20">
              <div className="flex items-center gap-2">
                <FiTruck size={16} className="text-primary shrink-0" />
                <span className="font-poppins text-xs text-text-dark">Free ship above ₹599</span>
              </div>
              <div className="flex items-center gap-2">
                <FiShield size={16} className="text-secondary shrink-0" />
                <span className="font-poppins text-xs text-text-dark">7-day easy returns</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-14 border-t border-gold/20 pt-10">
          <div className="flex gap-4 md:gap-8 border-b border-gold/20 mb-8 overflow-x-auto">
            {[
              { id: 'desc', label: 'Description' },
              { id: 'details', label: 'Product Details' },
              { id: 'reviews', label: `Reviews (${product.reviewCount || 0})` },
            ].map(t => (
              <button
                key={t.id}
                onClick={() => setTab(t.id)}
                className={`font-poppins text-sm font-medium pb-3 border-b-2 whitespace-nowrap transition-all ${
                  tab === t.id ? 'border-primary text-primary' : 'border-transparent text-gray-400 hover:text-text-dark'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          {tab === 'desc' && (
            <div className="max-w-2xl prose font-poppins text-sm text-text-dark/80 leading-relaxed">
              <p>{product.description}</p>
            </div>
          )}
          {tab === 'details' && (
            <div className="max-w-lg">
              {[
                ['Fabric', product.fabric],
                ['Brand', product.brand],
                ['Category', product.category?.replace(/-/g, ' ')],
                ['Care Instructions', product.careInstructions],
              ].filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="flex py-3 border-b border-gold/10">
                  <span className="font-poppins font-semibold text-sm text-text-dark w-40 shrink-0">{k}</span>
                  <span className="font-poppins text-sm text-gray-500 capitalize">{v}</span>
                </div>
              ))}
            </div>
          )}
          {tab === 'reviews' && (
            <div>
              {product.reviewCount === 0 ? (
                <p className="font-poppins text-sm text-gray-400">No reviews yet. Be the first to review!</p>
              ) : (
                <p className="font-poppins text-sm text-gray-500">Reviews will appear here.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  try {
    const { default: dbConnect } = await import('../../lib/mongodb');
    const { default: Product } = await import('../../models/Product');
    await dbConnect();
    const product = await Product.findOne({ slug: params.slug, isActive: true }).lean();
    if (!product) return { notFound: true };
    return { props: { product: JSON.parse(JSON.stringify(product)) } };
  } catch {
    return { notFound: true };
  }
}
