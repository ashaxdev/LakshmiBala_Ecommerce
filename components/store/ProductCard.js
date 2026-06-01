import { useState } from 'react';
import Link from 'next/link';
import { FiHeart, FiShoppingBag } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { dispatch } = useCart();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [selectedSize, setSelectedSize] = useState(
    product?.sizes?.[0]?.size || 'M'
  );

  const primaryImage =
    product?.images?.[0]?.url || '/images/placeholder.jpg';
  const secondaryImage =
    product?.images?.[1]?.url || primaryImage;

  const discountPercent =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round((1 - product.price / product.originalPrice) * 100)
      : 0;

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        productId: product._id,
        name: product.name,
        price: product.price,
        image: primaryImage,
        size: selectedSize,
        color: product.colors?.[0]?.name || '',
        quantity: 1,
        slug: product.slug,
      },
    });
    toast.success('Added to cart');
  };

  const toggleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
  };

  const handleSizeSelect = (e, size) => {
    e.preventDefault();
    e.stopPropagation();
    setSelectedSize(size);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,500;1,300&family=DM+Mono:wght@300;400&display=swap');

        .pc-card {
          width: 100%;
          background: #fff;
          border-radius: 2px;
          overflow: hidden;
          cursor: pointer;
          position: relative;
          font-family: 'DM Mono', monospace;
          border: 0.5px solid #e2ddd6;
          display: block;
          height: 100%;
          text-decoration: none;
          transition: box-shadow 0.3s ease;
        }
        .pc-card:hover {
          box-shadow: 0 12px 40px rgba(0,0,0,0.10);
        }
        .pc-img-wrap {
          position: relative;
          aspect-ratio: 3/4;
          overflow: hidden;
          background: #f0ede8;
        }
        .pc-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: all 0.7s cubic-bezier(.4,0,.2,1);
        }
        .pc-img-secondary {
          opacity: 0;
          transform: scale(1.08);
        }
        .pc-card:hover .pc-img-primary {
          transform: scale(1.08);
          opacity: 0;
        }
        .pc-card:hover .pc-img-secondary {
          opacity: 1;
          transform: scale(1.04);
        }
        .pc-badge {
          position: absolute;
          top: 12px;
          left: 12px;
          z-index: 20;
          background: #1a1a1a;
          color: #f5f0e8;
          font-size: 9px;
          letter-spacing: .2em;
          padding: 4px 10px;
          font-family: 'DM Mono', monospace;
        }
        .pc-wishlist {
          position: absolute;
          top: 10px;
          right: 10px;
          z-index: 20;
          width: 34px;
          height: 34px;
          border: 0.5px solid rgba(0,0,0,.15);
          background: rgba(255,255,255,.88);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          border-radius: 50%;
          transition: background .2s;
          backdrop-filter: blur(4px);
        }
        .pc-wishlist:hover { background: #fff; }
        .pc-quick-add {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          z-index: 20;
          transform: translateY(100%);
          opacity: 0;
          transition: all .4s cubic-bezier(.4,0,.2,1);
          padding: 13px 16px;
          background: rgba(20,20,20,.92);
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          color: #f5f0e8;
          font-size: 10px;
          letter-spacing: .22em;
          cursor: pointer;
          border: none;
          width: 100%;
          font-family: 'DM Mono', monospace;
        }
        .pc-card:hover .pc-quick-add {
          transform: translateY(0);
          opacity: 1;
        }
        .pc-quick-add:hover { background: #111; }
        .pc-out-of-stock {
          position: absolute;
          inset: 0;
          z-index: 30;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255,255,255,.72);
          backdrop-filter: blur(3px);
        }
        .pc-oos-label {
          font-size: 10px;
          letter-spacing: .22em;
          color: #666;
          font-family: 'DM Mono', monospace;
          border: 0.5px solid #ccc;
          padding: 7px 18px;
          background: #fff;
        }
        .pc-body {
          padding: 16px 16px 18px;
          background: #fff;
          border-top: 0.5px solid #ece8e2;
        }
        .pc-label {
          font-size: 8px;
          letter-spacing: .28em;
          color: #aaa49a;
          text-transform: uppercase;
          margin-bottom: 8px;
          font-family: 'DM Mono', monospace;
        }
        .pc-name {
          font-family: 'Cormorant Garamond', serif;
          font-size: clamp(18px, 3.5vw, 22px);
          font-weight: 300;
          color: #1a1a1a;
          line-height: 1.25;
          margin-bottom: 12px;
          letter-spacing: .01em;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .pc-name em { font-style: italic; }
        .pc-price-row {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 8px;
          flex-wrap: wrap;
        }
        .pc-price {
          font-size: 14px;
          font-weight: 400;
          color: #1a1a1a;
          letter-spacing: .04em;
          font-family: 'DM Mono', monospace;
        }
        .pc-original {
          font-size: 11px;
          color: #bbb;
          text-decoration: line-through;
          margin-top: 2px;
          letter-spacing: .03em;
          font-family: 'DM Mono', monospace;
        }
        .pc-sizes {
          display: flex;
          gap: 5px;
          flex-wrap: wrap;
        }
        .pc-size-dot {
          width: 26px;
          height: 26px;
          border: 0.5px solid #d8d3cc;
          color: #aaa;
          font-size: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all .15s;
          letter-spacing: .04em;
          font-family: 'DM Mono', monospace;
          background: none;
        }
        .pc-size-dot:hover { border-color: #888; color: #444; }
        .pc-size-dot.active {
          border-color: #1a1a1a;
          color: #1a1a1a;
          background: #f7f5f2;
        }
        .pc-divider {
          height: 0.5px;
          background: #ece8e2;
          margin: 12px 0;
        }
        .pc-meta-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }
        .pc-stock {
          font-size: 8px;
          letter-spacing: .15em;
          color: #bbb;
          font-family: 'DM Mono', monospace;
        }
        .pc-stock-dot { color: #5a9e6f; }
        .pc-add-btn {
          background: #1a1a1a;
          border: none;
          color: #f5f0e8;
          font-size: 9px;
          letter-spacing: .2em;
          padding: 8px 14px;
          cursor: pointer;
          font-family: 'DM Mono', monospace;
          transition: background .2s;
          white-space: nowrap;
        }
        .pc-add-btn:hover { background: #333; }

        /* Mobile: always show add btn, hide quick-add */
        @media (max-width: 640px) {
          .pc-quick-add { display: none !important; }
          .pc-body { padding: 14px 14px 16px; }
          .pc-badge { font-size: 8px; padding: 3px 8px; top: 10px; left: 10px; }
          .pc-wishlist { width: 32px; height: 32px; top: 8px; right: 8px; }
          .pc-size-dot { width: 24px; height: 24px; font-size: 8px; }
          .pc-add-btn { padding: 8px 12px; font-size: 8px; }
        }

        @media (min-width: 641px) {
          .pc-mobile-add { display: none !important; }
        }
      `}</style>

      <Link href={`/product/${product.slug}`} className="pc-card group">

        {/* IMAGE */}
        <div className="pc-img-wrap">
          <img
            src={primaryImage}
            alt={product.name}
            className="pc-img pc-img-primary"
            onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
          />
          <img
            src={secondaryImage}
            alt={product.name}
            className="pc-img pc-img-secondary"
            onError={(e) => { e.target.src = '/images/placeholder.jpg'; }}
          />

          {discountPercent > 0 && (
            <div className="pc-badge">{discountPercent}% OFF</div>
          )}

          <button className="pc-wishlist" onClick={toggleWishlist} aria-label="Toggle wishlist">
            <FiHeart
              size={15}
              style={isWishlisted ? { fill: '#c0392b', stroke: '#c0392b' } : { stroke: '#555' }}
            />
          </button>

          {product.totalStock > 0 && (
            <button className="pc-quick-add" onClick={handleAddToCart}>
              <FiShoppingBag size={13} />
              QUICK ADD · {selectedSize}
            </button>
          )}

          {product.totalStock === 0 && (
            <div className="pc-out-of-stock">
              <span className="pc-oos-label">OUT OF STOCK</span>
            </div>
          )}
        </div>

        {/* BODY */}
        <div className="pc-body">
          <p className="pc-label">Premium Collection</p>

          <h3 className="pc-name">
            <em>{product.name}</em>
          </h3>

          <div className="pc-price-row">
            <div>
              <div className="pc-price">₹{product.price.toLocaleString()}</div>
              {product.originalPrice > product.price && (
                <div className="pc-original">₹{product.originalPrice.toLocaleString()}</div>
              )}
            </div>

            {product.sizes?.length > 0 && (
              <div className="pc-sizes">
                {product.sizes.map(({ size }) => (
                  <button
                    key={size}
                    className={`pc-size-dot${selectedSize === size ? ' active' : ''}`}
                    onClick={(e) => handleSizeSelect(e, size)}
                    aria-label={`Select size ${size}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="pc-divider" />

          <div className="pc-meta-row">
            {product.totalStock > 0 && product.totalStock <= 5 ? (
              <div className="pc-stock">
                <span className="pc-stock-dot">● </span>
                {product.totalStock} LEFT
              </div>
            ) : (
              <div className="pc-stock">IN STOCK</div>
            )}

            {product.totalStock > 0 && (
              <button className="pc-add-btn" onClick={handleAddToCart}>
                ADD TO CART
              </button>
            )}
          </div>
        </div>

      </Link>
    </>
  );
}
