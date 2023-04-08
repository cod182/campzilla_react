/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'head-img': "url('/src/assets/images/header-banner.png')",
      }
    },
  },
  plugins: [],
}