/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'matka-purple': '#1b003a',
        'matka-gold': '#c06c00',
        'matka-maroon': '#46001a',
        'matka-yellow': '#eef100',
        'matka-green': '#00ff00',
        'matka-contact': '#a16207',
      },
      backgroundImage: {
        'main-gradient': 'linear-gradient(to bottom, #1b003a, #000000)',
      }
    },
  },
  plugins: [],
}
