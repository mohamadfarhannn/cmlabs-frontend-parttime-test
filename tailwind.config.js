/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./app/layouts/**/*.vue",
    "./app/pages/**/*.vue",
    "./app/plugins/**/*.{js,ts}",
    "./app/app.vue",
    "./app/error.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        brand: {
          50:  '#fdfdea',
          100: '#faf7c5',
          200: '#f6ee8d',
          300: '#efdf4c',
          400: '#e7bf3c', // Your logo base color
          500: '#d59d24',
          600: '#b8771b',
          700: '#94541a',
          800: '#7a451b',
          900: '#683a1b',
          950: '#3c1d0a',
        },
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.5s ease-out both',
        'fade-in': 'fadeIn 0.4s ease-out both',
        'slide-in-right': 'slideInRight 0.4s ease-out both',
        'scale-in': 'scaleIn 0.3s ease-out both',
        'spin-slow': 'spin 2s linear infinite',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
