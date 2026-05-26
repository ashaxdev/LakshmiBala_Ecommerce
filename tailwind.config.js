/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E91E63',
        'primary-dark': '#C2185B',
        'primary-light': '#F48FB1',
        secondary: '#D4AF37',
        'secondary-dark': '#B8960C',
        background: '#FFF9F5',
        'text-dark': '#3A2A2A',
        accent: '#FFB6A3',
        'rose-pink': '#FF4D8D',
        'ivory': '#FFF9F5',
        'gold': '#D4AF37',
        'glass': 'rgba(255,255,255,0.15)',
      },
      fontFamily: {
        playfair: ['Playfair Display', 'serif'],
        poppins: ['Poppins', 'sans-serif'],
        vibes: ['Great Vibes', 'cursive'],
      },
      backgroundImage: {
        'rose-gradient': 'linear-gradient(135deg, #E91E63 0%, #FF4D8D 50%, #FFB6A3 100%)',
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F5D062 100%)',
        'hero-overlay': 'linear-gradient(to bottom, rgba(58,42,42,0.5) 0%, rgba(233,30,99,0.3) 100%)',
      },
      boxShadow: {
        'gold': '0 4px 20px rgba(212, 175, 55, 0.3)',
        'pink': '0 4px 20px rgba(233, 30, 99, 0.3)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.1)',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'float': 'float 3s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 175, 55, 0.4)' },
          '50%': { boxShadow: '0 0 0 10px rgba(212, 175, 55, 0)' },
        },
      },
    },
  },
  plugins: [],
}
