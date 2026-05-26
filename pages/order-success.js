import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '../components/store/Layout';
import { FiCheckCircle, FiShoppingBag } from 'react-icons/fi';

export default function OrderSuccessPage() {
  const router = useRouter();
  const { order } = router.query;

  return (
    <Layout title="Order Placed Successfully">
      <div className="min-h-[70vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center">
          <div className="w-24 h-24 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6 animate-pulse-gold">
            <FiCheckCircle size={48} className="text-green-500" />
          </div>
          <p className="font-vibes text-primary text-4xl mb-2">Thank You!</p>
          <h1 className="font-playfair text-2xl font-bold text-text-dark mb-3">Order Placed Successfully</h1>
          {order && (
            <div className="inline-block bg-accent/20 border border-gold/30 rounded-xl px-6 py-3 mb-4">
              <p className="font-poppins text-xs text-gray-500">Order Number</p>
              <p className="font-playfair font-bold text-primary text-xl">{order}</p>
            </div>
          )}
          <p className="font-poppins text-sm text-gray-500 mb-8 leading-relaxed">
            We've received your order and will process it shortly. You'll receive a confirmation soon. 
            Thank you for shopping at Sivakasi Fashion Hub!
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/orders" className="btn-primary px-8 py-3 text-sm font-semibold flex items-center gap-2 justify-center">
              <FiShoppingBag size={16} /> Track Your Order
            </Link>
            <Link href="/" className="btn-outline px-8 py-3 text-sm font-semibold">
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
