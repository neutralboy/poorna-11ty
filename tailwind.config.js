/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./_includes/*html", "./_site/**/*.html"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
