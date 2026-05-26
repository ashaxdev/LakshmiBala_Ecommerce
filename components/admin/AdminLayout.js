import { useState, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import {
  FiHome, FiShoppingBag, FiPackage, FiUsers, FiTag,
  FiBarChart2, FiSettings, FiLogOut, FiMenu, FiX, FiBell
} from 'react-icons/fi';
import axios from 'axios';
import toast from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';

const navItems = [
  { href: '/admin', label: 'Dashboard', icon: FiBarChart2 },
  { href: '/admin/products', label: 'Products', icon: FiPackage },
  { href: '/admin/orders', label: 'Orders', icon: FiShoppingBag },
  { href: '/admin/categories', label: 'Categories', icon: FiTag },
  { href: '/admin/customers', label: 'Customers', icon: FiUsers },
  { href: '/admin/settings', label: 'Settings', icon: FiSettings },
];

export default function AdminLayout({ children, title = 'Admin Panel' }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.post('/api/auth/logout');
      router.push('/admin/login');
    } catch {
      toast.error('Logout failed');
    }
  };

  return (
    <>
      <Head>
        <title>{title} | Sivakasi Fashion Hub Admin</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Toaster position="top-right" />

      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Overlay for mobile */}
        {sidebarOpen && (
          <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setSidebarOpen(false)} />
        )}

        {/* Sidebar */}
        <aside className={`fixed inset-y-0 left-0 z-30 w-64 bg-white shadow-xl transform transition-transform duration-300 lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          {/* Brand */}
          <div className="flex items-center justify-between p-5 border-b border-gold/20">
            <Link href="/admin" className="flex flex-col">
              <span className="font-vibes text-2xl text-primary leading-none">Sivakasi</span>
              <span className="font-poppins text-xs text-secondary tracking-widest uppercase">Admin Panel</span>
            </Link>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-400 hover:text-primary">
              <FiX size={20} />
            </button>
          </div>

          {/* Nav */}
          <nav className="p-4 space-y-1 overflow-y-auto">
            {navItems.map(({ href, label, icon: Icon }) => {
              const isActive = router.pathname === href || (href !== '/admin' && router.pathname.startsWith(href));
              return (
                <Link key={href} href={href}
                  className={`admin-sidebar-link ${isActive ? 'active' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon size={18} />
                  <span>{label}</span>
                  {label === 'Orders' && (
                    <span className="ml-auto bg-primary text-white text-xs px-2 py-0.5 rounded-full">New</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Bottom */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gold/20">
            <Link href="/" target="_blank"
              className="admin-sidebar-link mb-1"
            >
              <FiHome size={18} />
              <span>View Store</span>
            </Link>
            <button onClick={handleLogout} className="admin-sidebar-link w-full text-left text-red-400 hover:bg-red-50 hover:text-red-600">
              <FiLogOut size={18} />
              <span>Logout</span>
            </button>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Top bar */}
          <header className="bg-white shadow-sm border-b border-gold/20 px-4 md:px-6 py-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-500 hover:text-primary">
                <FiMenu size={22} />
              </button>
              <h1 className="font-playfair font-bold text-text-dark text-lg">{title}</h1>
            </div>
            <div className="flex items-center gap-3">
              <button className="relative p-2 text-gray-400 hover:text-primary transition-colors rounded-full hover:bg-accent/20">
                <FiBell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary" />
              </button>
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-primary to-rose-pink flex items-center justify-center text-white font-playfair font-bold text-sm">
                A
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-y-auto p-4 md:p-6">
            {children}
          </main>
        </div>
      </div>
    </>
  );
}
