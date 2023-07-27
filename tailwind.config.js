/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      ringWidth: ['hover', 'active'],
    },
  },
  plugins: [],
}

