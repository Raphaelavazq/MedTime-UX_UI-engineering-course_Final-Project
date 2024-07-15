/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'fjalla-one': ['"Fjalla One"', 'sans-serif'],
        'unica-one': ['"Unica One"', 'sans-serif'],
      },
      animation: {
        'bwwwin': 'bwwwin 0.5s ease-in-out 1 forwards',
      },
      keyframes: {
        bwwwin: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    
    },
  },
  plugins: [],
}