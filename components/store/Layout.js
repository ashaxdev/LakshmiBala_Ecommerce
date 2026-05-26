import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

export default function Layout({ children, title, description, keywords, canonical }) {
  const siteTitle = title ? `${title} | Sivakasi Fashion Hub` : 'Sivakasi Fashion Hub — Women\'s Kurtis, Nighties & Innerwear Online';
  const siteDesc = description || 'Shop premium women\'s kurtis, nighties, innerwear and men\'s innerwear online from Sivakasi Fashion Hub, Virudhunagar. Trusted quality, best prices, pan-India delivery.';
  const siteKeywords = keywords || 'women kurtis online, nighties buy online, innerwear women, mens innerwear, sivakasi fashion, virudhunagar sarees, ethnic wear online india';
  const siteUrl = canonical || 'https://sivakaasifashion.com';

  return (
    <>
      <Head>
        <title>{siteTitle}</title>
        <meta name="description" content={siteDesc} />
        <meta name="keywords" content={siteKeywords} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={siteUrl} />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={siteTitle} />
        <meta property="og:description" content={siteDesc} />
        <meta property="og:url" content={siteUrl} />
        <meta property="og:site_name" content="Sivakasi Fashion Hub" />
        <meta property="og:image" content={`${siteUrl}/images/og-image.jpg`} />
        <meta property="og:locale" content="en_IN" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={siteTitle} />
        <meta name="twitter:description" content={siteDesc} />
        <meta name="twitter:image" content={`${siteUrl}/images/og-image.jpg`} />

        {/* Schema.org */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ClothingStore",
          "name": "Sivakasi Fashion Hub",
          "url": siteUrl,
          "description": siteDesc,
          "address": {
            "@type": "PostalAddress",
            "addressLocality": "Sivakasi",
            "addressRegion": "Tamil Nadu",
            "postalCode": "626123",
            "addressCountry": "IN"
          },
          "openingHours": "Mo-Sa 09:00-19:00",
          "priceRange": "₹₹"
        })}} />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <meta name="theme-color" content="#E91E63" />
      </Head>

      <Toaster position="top-center" />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}
