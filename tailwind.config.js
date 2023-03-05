/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_includes/*html", "./static/*.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
