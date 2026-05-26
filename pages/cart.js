import Link from 'next/link';
import Layout from '../components/store/Layout';
import { useCart } from '../context/CartContext';
import { FiTrash2, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';

export default function CartPage() {
  const { items, cartTotal, dispatch } = useCart();

  const shipping = cartTotal >= 599 ? 0 : 60;
  const grandTotal = cartTotal + shipping;

  if (items.length === 0) {
    return (
      <Layout title="Your Cart">
        <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
          <FiShoppingBag size={64} className="text-gold mb-6 opacity-50" />
          <p className="font-vibes text-primary text-4xl mb-2">Your cart is empty</p>
          <p className="font-poppins text-gray-400 text-sm mb-8">Add some beautiful pieces to your cart</p>
          <Link href="/" className="btn-primary">Continue Shopping</Link>
        </div>
      </Layout>
    );
  }

  return (
    <Layout title="Shopping Cart">
      <div className="max-w-7xl mx-auto px-4 py-10">
        <h1 className="font-playfair text-2xl md:text-3xl font-bold text-text-dark mb-8">
          Shopping Cart <span className="text-primary">({items.length})</span>
        </h1>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <div key={`${item.productId}-${item.size}-${item.color}`}
                className="glass-card rounded-2xl p-4 border border-gold/20 flex gap-4">
                <Link href={`/product/${item.slug}`}>
                  <img
                    src={item.image || '/images/placeholder.jpg'}
                    alt={item.name}
                    className="w-20 h-24 object-cover rounded-xl"
                  />
                </Link>
                <div className="flex-1 min-w-0">
                  <Link href={`/product/${item.slug}`}>
                    <h3 className="font-playfair font-semibold text-text-dark text-sm md:text-base line-clamp-2 hover:text-primary transition-colors">
                      {item.name}
                    </h3>
                  </Link>
                  <div className="flex gap-3 mt-1">
                    {item.size && <span className="font-poppins text-xs text-gray-400">Size: {item.size}</span>}
                    {item.color && <span className="font-poppins text-xs text-gray-400">Color: {item.color}</span>}
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-gold/30 rounded-xl overflow-hidden">
                      <button
                        onClick={() => {
                          if (item.quantity > 1) {
                            dispatch({ type: 'UPDATE_QUANTITY', payload: { ...item, quantity: item.quantity - 1 } });
                          } else {
                            dispatch({ type: 'REMOVE_ITEM', payload: item });
                          }
                        }}
                        className="px-3 py-1.5 hover:bg-accent/20 text-sm font-semibold"
                      >−</button>
                      <span className="px-3 py-1.5 text-sm font-poppins font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => dispatch({ type: 'UPDATE_QUANTITY', payload: { ...item, quantity: item.quantity + 1 } })}
                        className="px-3 py-1.5 hover:bg-accent/20 text-sm font-semibold"
                      >+</button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-poppins font-bold text-primary">₹{(item.price * item.quantity).toLocaleString()}</span>
                      <button
                        onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item })}
                        className="text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <FiTrash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            <Link href="/" className="flex items-center gap-2 font-poppins text-sm text-primary hover:text-primary-dark mt-4">
              <FiArrowLeft size={16} /> Continue Shopping
            </Link>
          </div>

          {/* Summary */}
          <div>
            <div className="glass-card rounded-2xl p-6 border border-gold/20 sticky top-24">
              <h2 className="font-playfair font-bold text-text-dark text-xl mb-6 pb-4 border-b border-gold/20">
                Order Summary
              </h2>
              <div className="space-y-3 mb-6">
                <div className="flex justify-between font-poppins text-sm">
                  <span className="text-gray-500">Subtotal</span>
                  <span className="text-text-dark font-medium">₹{cartTotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between font-poppins text-sm">
                  <span className="text-gray-500">Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600 font-medium' : 'text-text-dark font-medium'}>
                    {shipping === 0 ? 'FREE' : `₹${shipping}`}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="font-poppins text-xs text-primary">
                    Add ₹{(599 - cartTotal).toFixed(0)} more for free shipping!
                  </p>
                )}
                <div className="flex justify-between font-poppins font-bold text-base pt-3 border-t border-gold/20">
                  <span className="text-text-dark">Total</span>
                  <span className="text-primary">₹{grandTotal.toLocaleString()}</span>
                </div>
              </div>

              {/* Coupon */}
              <div className="flex gap-2 mb-6">
                <input
                  type="text"
                  placeholder="Coupon code"
                  className="luxury-input text-sm flex-1 py-2.5"
                />
                <button className="btn-outline text-sm px-4 py-2.5 whitespace-nowrap rounded-xl">Apply</button>
              </div>

              <Link
                href="/checkout"
                className="block w-full btn-primary text-center py-4 font-semibold rounded-full"
              >
                Proceed to Checkout
              </Link>

              <div className="flex items-center justify-center gap-4 mt-4">
                <span className="font-poppins text-xs text-gray-400 border border-gray-200 px-2 py-1 rounded">UPI</span>
                <span className="font-poppins text-xs text-gray-400 border border-gray-200 px-2 py-1 rounded">Card</span>
                <span className="font-poppins text-xs text-gray-400 border border-gray-200 px-2 py-1 rounded">COD</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
