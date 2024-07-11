/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['sharp-sans-medium', 'sharp-sans-semibold', 'sharp-sans-bold', 'Poppins', 'sans-serif'],
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
      colors: {
        'yellow-100': '#FFF4E0',
        'yellow-50': '#FFFAF0',
        'yellow-500': '#FFC107',
        'background': '#F7F8F9',
        'text-primary': '#333333',
      },
    },
  },
  plugins: [],
}