/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        base: '#0A0F1E',
        surface: '#111827',
        card: 'rgba(255,255,255,0.05)',
        cyan: { DEFAULT: '#00D4FF', dark: '#00A8CC' },
        amber: { DEFAULT: '#FFB347', dark: '#E09020' },
        border: 'rgba(255,255,255,0.08)',
      },
      fontFamily: {
        heading: ['Syne', 'sans-serif'],
        body: ['DM Sans', 'sans-serif'],
      },
      backdropBlur: { glass: '20px' },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
        shimmer: 'shimmer 1.5s infinite',
        'fade-up': 'fadeUp 0.5s ease forwards',
      },
      keyframes: {
        gradientShift: {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        fadeUp: {
          from: { opacity: 0, transform: 'translateY(20px)' },
          to: { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
