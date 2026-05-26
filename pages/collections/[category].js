import { useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '../../components/store/Layout';
import ProductCard from '../../components/store/ProductCard';
import { FiFilter, FiX, FiChevronDown } from 'react-icons/fi';

const categoryInfo = {
  'womens-kurtis': {
    title: "Women's Kurtis",
    desc: 'Explore our stunning collection of ethnic kurtis — from casual cotton to festive silk designs.',
    keywords: 'womens kurtis online, buy kurtis sivakasi, ethnic kurtis tamil nadu, cotton kurtis online india',
  },
  'womens-nighties': {
    title: "Women's Nighties",
    desc: 'Comfortable and breathable nightwear for a restful sleep. Premium cotton and soft fabrics.',
    keywords: 'womens nighties online india, buy nighties tamil nadu, cotton nightdress online',
  },
  'womens-innerwear': {
    title: "Women's Innerwear",
    desc: 'Premium innerwear collection designed for comfort, support, and style. All sizes available.',
    keywords: 'womens innerwear online india, buy bra panty set, ladies undergarments online',
  },
  'mens-innerwear': {
    title: "Men's Innerwear",
    desc: 'Quality essentials for everyday comfort. Breathable fabrics and perfect fit guaranteed.',
    keywords: 'mens innerwear online india, buy briefs vest online, mens undergarments',
  },
  'all': {
    title: 'All Products',
    desc: 'Browse our complete collection of women\'s and men\'s fashion essentials.',
    keywords: 'buy clothes online sivakasi, fashion hub virudhunagar',
  },
};

const sortOptions = [
  { value: 'newest', label: 'Newest First' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'popular', label: 'Most Popular' },
  { value: 'rating', label: 'Best Rating' },
];

export default function CollectionPage({ products = [], category, totalCount = 0 }) {
  const router = useRouter();
  const [filterOpen, setFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('newest');
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const info = categoryInfo[category] || categoryInfo['all'];

  const sorted = [...products].sort((a, b) => {
    if (sortBy === 'price-asc') return a.price - b.price;
    if (sortBy === 'price-desc') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    if (sortBy === 'popular') return b.sold - a.sold;
    return new Date(b.createdAt) - new Date(a.createdAt);
  }).filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

  return (
    <Layout
      title={`${info.title} | Buy Online`}
      description={info.desc}
      keywords={info.keywords}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-accent/20 to-background py-12 px-4 border-b border-gold/20">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-vibes text-primary text-2xl mb-1">Collection</p>
          <h1 className="font-playfair text-3xl md:text-4xl font-bold text-text-dark mb-3">{info.title}</h1>
          <p className="font-poppins text-sm text-gray-500 max-w-xl mx-auto">{info.desc}</p>
          <p className="font-poppins text-xs text-gray-400 mt-2">{totalCount} Products</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Controls */}
        <div className="flex items-center justify-between mb-6 gap-4 flex-wrap">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="flex items-center gap-2 font-poppins text-sm text-text-dark border border-gold/30 rounded-xl px-4 py-2 hover:border-primary hover:text-primary transition-colors"
          >
            <FiFilter size={16} /> Filters
          </button>

          <div className="flex items-center gap-2">
            <span className="font-poppins text-sm text-gray-400 hidden md:block">Sort by:</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="font-poppins text-sm border border-gold/30 rounded-xl px-4 py-2 bg-white text-text-dark focus:border-primary outline-none appearance-none pr-8 cursor-pointer"
              >
                {sortOptions.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
              <FiChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400" />
            </div>
          </div>
        </div>

        {/* Filters panel */}
        {filterOpen && (
          <div className="glass-card rounded-2xl p-6 mb-6 border border-gold/20">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-playfair font-semibold text-text-dark">Filter Products</h3>
              <button onClick={() => setFilterOpen(false)} className="text-gray-400 hover:text-primary">
                <FiX size={18} />
              </button>
            </div>
            <div>
              <p className="font-poppins text-sm font-semibold text-text-dark mb-3">Price Range</p>
              <div className="flex items-center gap-4">
                <span className="font-poppins text-sm text-primary font-semibold">₹{priceRange[0]}</span>
                <input
                  type="range" min="0" max="5000" step="100"
                  value={priceRange[1]}
                  onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                  className="flex-1 accent-primary"
                />
                <span className="font-poppins text-sm text-primary font-semibold">₹{priceRange[1]}</span>
              </div>
            </div>
          </div>
        )}

        {/* Product grid */}
        {sorted.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {sorted.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-vibes text-primary text-4xl mb-3">Coming Soon</p>
            <p className="font-playfair text-text-dark text-xl mb-2">No products found</p>
            <p className="font-poppins text-sm text-gray-400">Check back soon or explore other categories.</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ params }) {
  const category = params?.category || 'all';
  try {
    const { default: dbConnect } = await import('../../lib/mongodb');
    const { default: Product } = await import('../../models/Product');
    await dbConnect();

    const query = { isActive: true };
    if (category !== 'all') query.category = category;

    const products = await Product.find(query)
      .select('name slug price originalPrice images category sizes colors rating reviewCount isBestseller isNewArrival totalStock sold createdAt')
      .sort({ createdAt: -1 })
      .limit(50)
      .lean();

    return {
      props: {
        products: JSON.parse(JSON.stringify(products)),
        category,
        totalCount: products.length,
      }
    };
  } catch {
    return { props: { products: [], category, totalCount: 0 } };
  }
}
