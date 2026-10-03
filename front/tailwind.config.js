/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-navy': '#0B1B33',
        'brand-navy-deep': '#050B14',
        'brand-teal': '#0F766E',
        'brand-teal-glow': '#14B8A6',
        'brand-gold': '#D4AF37',
        'brand-gray': '#F8FAFC',
      },
      borderRadius: {
        'xl': '12px',
        'lg': '8px',
        '2xl': '16px',
        '3xl': '24px',
      },
      boxShadow: {
        'soft': '0 4px 20px -4px rgba(11, 27, 51, 0.1)',
        'glow-teal': '0 0 40px -10px rgba(20, 184, 166, 0.5)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #0F766E 0%, #14B8A6 100%)',
        'gradient-dark': 'linear-gradient(180deg, #0B1B33 0%, #050B14 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F59E0B 100%)',
      },
    },
  },
  plugins: [],
}
