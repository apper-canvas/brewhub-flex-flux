/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        coffee: '#6F4E37',
        caramel: '#D2691E',
        orange: '#FF6B35',
        cream: '#FFF8F3',
        latte: '#FAF6F2',
      },
      fontFamily: {
        display: ['Fredoka One', 'cursive'],
        body: ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-gentle': 'bounce 1s ease-out',
      },
    },
  },
  plugins: [],
}