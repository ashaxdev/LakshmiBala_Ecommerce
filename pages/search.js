import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Layout from '../components/store/Layout';
import ProductCard from '../components/store/ProductCard';
import { FiSearch } from 'react-icons/fi';

export default function SearchPage({ results = [], query = '' }) {
  return (
    <Layout title={`Search: ${query}`} description={`Search results for "${query}" on Sivakasi Fashion Hub`}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="mb-8">
          <form action="/search" method="GET" className="flex gap-3 max-w-xl">
            <div className="relative flex-1">
              <FiSearch size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"/>
              <input type="text" name="q" defaultValue={query} className="luxury-input pl-11" placeholder="Search products..." />
            </div>
            <button type="submit" className="btn-primary px-6 py-3 text-sm font-semibold">Search</button>
          </form>
        </div>
        {query && <p className="font-poppins text-sm text-gray-500 mb-6">{results.length} results for "<strong>{query}</strong>"</p>}
        {results.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {results.map(p => <ProductCard key={p._id} product={p} />)}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="font-vibes text-primary text-4xl mb-2">No results</p>
            <p className="font-poppins text-gray-400 text-sm">Try a different search term</p>
          </div>
        )}
      </div>
    </Layout>
  );
}

export async function getServerSideProps({ query }) {
  const q = query.q || '';
  if (!q) return { props: { results: [], query: '' } };
  try {
    const { default: dbConnect } = await import('../lib/mongodb');
    const { default: Product } = await import('../models/Product');
    await dbConnect();
    const results = await Product.find({ isActive: true, $text: { $search: q } })
      .select('name slug price originalPrice images category sizes colors rating reviewCount isBestseller isNewArrival totalStock').limit(40).lean();
    return { props: { results: JSON.parse(JSON.stringify(results)), query: q } };
  } catch { return { props: { results: [], query: q } }; }
}
