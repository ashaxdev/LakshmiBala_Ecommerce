import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FiHeart, FiShoppingBag, FiStar, FiEye } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [imgSrc, setImgSrc] = useState(product?.images?.[0]?.url || '/images/placeholder.jpg');
  const { dispatch } = useCart();

  const discountPercent = product.originalPrice && product.originalPrice > product.price
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const defaultSize = product.sizes?.[0]?.size || 'M';
    const defaultColor = product.colors?.[0]?.name || '';
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: imgSrc,
        size: defaultSize,
        color: defaultColor,
        quantity: 1,
        slug: product.slug,
      }
    });
    toast.success('Added to cart!', {
      icon: '🛍️',
      style: { borderRadius: '50px', background: '#FFF9F5', color: '#3A2A2A', border: '1px solid #D4AF37' }
    });
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist!', {
      icon: isWishlisted ? '💔' : '❤️',
      style: { borderRadius: '50px', background: '#FFF9F5', color: '#3A2A2A', border: '1px solid #D4AF37' }
    });
  };

  return (
    <Link href={`/product/${product.slug}`} className="block group">
      <div className="product-card glass-card rounded-2xl overflow-hidden border border-gold/20 bg-white">
        {/* Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-ivory">
          <img
            src={imgSrc}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            onError={() => setImgSrc('/images/placeholder.jpg')}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {discountPercent > 0 && (
              <span className="badge badge-pink text-xs px-2 py-0.5">-{discountPercent}%</span>
            )}
            {product.isNewArrival && (
              <span className="badge badge-gold text-xs px-2 py-0.5">New</span>
            )}
            {product.isBestseller && (
              <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full font-semibold">
                Bestseller
              </span>
            )}
          </div>

          {/* Action buttons */}
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <button
              onClick={toggleWishlist}
              className="w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors"
              aria-label="Add to wishlist"
            >
              <FiHeart size={16} className={isWishlisted ? 'fill-primary text-primary' : ''} />
            </button>
            <Link
              href={`/product/${product.slug}`}
              onClick={e => e.stopPropagation()}
              className="w-9 h-9 bg-white/90 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-colors"
              aria-label="Quick view"
            >
              <FiEye size={16} />
            </Link>
          </div>

          {/* Add to cart overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
            <button
              onClick={handleAddToCart}
              className="w-full py-2.5 rounded-xl bg-primary text-white font-poppins font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-dark transition-colors shadow-lg"
            >
              <FiShoppingBag size={16} />
              Add to Cart
            </button>
          </div>

          {/* Out of stock */}
          {product.totalStock === 0 && (
            <div className="absolute inset-0 bg-white/70 backdrop-blur-sm flex items-center justify-center">
              <span className="font-poppins text-sm font-semibold text-text-dark">Out of Stock</span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-4">
          <p className="font-poppins text-xs text-secondary uppercase tracking-wider mb-1 capitalize">
            {product.category?.replace(/-/g, ' ')}
          </p>
          <h3 className="font-playfair text-text-dark font-semibold text-base leading-tight mb-2 line-clamp-2">
            {product.name}
          </h3>

          {/* Rating */}
          {product.reviewCount > 0 && (
            <div className="flex items-center gap-1 mb-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={12} className={i < Math.round(product.rating) ? 'star fill-current' : 'star-empty fill-current'} />
                ))}
              </div>
              <span className="font-poppins text-xs text-gray-400">({product.reviewCount})</span>
            </div>
          )}

          {/* Price */}
          <div className="flex items-center gap-2">
            <span className="font-poppins font-bold text-primary text-lg">₹{product.price.toLocaleString()}</span>
            {product.originalPrice > product.price && (
              <span className="font-poppins text-sm text-gray-400 line-through">₹{product.originalPrice.toLocaleString()}</span>
            )}
          </div>

          {/* Sizes preview */}
          {product.sizes?.length > 0 && (
            <div className="flex gap-1 mt-2 flex-wrap">
              {product.sizes.slice(0, 5).map(s => (
                <span key={s.size} className={`font-poppins text-xs px-2 py-0.5 rounded border ${
                  s.stock > 0 
                    ? 'border-gold/40 text-text-dark' 
                    : 'border-gray-200 text-gray-300 line-through'
                }`}>
                  {s.size}
                </span>
              ))}
              {product.sizes.length > 5 && (
                <span className="font-poppins text-xs text-primary">+{product.sizes.length - 5}</span>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
