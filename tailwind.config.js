/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'head-img': "url('/src/assets/images/header-banner.png')",
        'search-bg': "url('/src/assets/images/search-bg.png')",
        'bg-main': "url('/src/assets/images/background.jpeg')",
      }
    },
  },
  plugins: [],
}