/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#111415',
        container: '#161A1D',
        'container-light': '#272B30'
      }
    },
  },
  plugins: [],
}
