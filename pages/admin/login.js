import { useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

export default function AdminLogin() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post('/api/auth/admin-login', form);
      toast.success('Welcome back!');
      router.push('/admin');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Login | Sivakasi Fashion Hub</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Toaster position="top-center" />

      <div className="min-h-screen bg-gradient-to-br from-background via-accent/20 to-primary/5 flex items-center justify-center px-4">
        {/* Decorative */}
        <div className="absolute top-20 left-20 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-secondary/10 rounded-full blur-3xl" />

        <div className="w-full max-w-md relative">
          {/* Card */}
          <div className="glass-card rounded-3xl p-8 border border-gold/30 shadow-2xl bg-white/80 backdrop-blur-xl">
            {/* Logo */}
            <div className="text-center mb-8">
              <p className="font-vibes text-primary text-4xl mb-1">Sivakasi Fashion Hub</p>
              <p className="font-poppins text-xs text-secondary tracking-[0.3em] uppercase">Admin Dashboard</p>
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-secondary to-transparent mx-auto mt-3" />
            </div>

            <h1 className="font-playfair text-xl font-bold text-text-dark text-center mb-6">
              Sign in to Admin Panel
            </h1>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1.5 block">Email Address</label>
                <div className="relative">
                  <FiMail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    className="luxury-input pl-10"
                    placeholder="admin@sivakaasifashion.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="font-poppins text-xs font-semibold text-text-dark mb-1.5 block">Password</label>
                <div className="relative">
                  <FiLock size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={form.password}
                    onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                    className="luxury-input pl-10 pr-10"
                    placeholder="Enter your password"
                    required
                  />
                  <button type="button" onClick={() => setShowPass(!showPass)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-primary">
                    {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary py-3.5 font-semibold text-sm mt-2 disabled:opacity-60"
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </button>
            </form>

            <p className="font-poppins text-xs text-gray-400 text-center mt-6">
              Default: admin@sivakaasifashion.com / Admin@123456
            </p>
          </div>

          <p className="font-poppins text-xs text-gray-400 text-center mt-4">
            © 2024 Sivakasi Fashion Hub. All rights reserved.
          </p>
        </div>
      </div>
    </>
  );
}
