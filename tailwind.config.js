/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_includes/*html", "./static/*.html", "./post/*.md"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
