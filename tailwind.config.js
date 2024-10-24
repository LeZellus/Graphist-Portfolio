/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./assets/**/*.js",
    "./templates/**/*.html.twig",
  ],
  theme: {
    extend: {
      colors: {
        'chamois': {
          DEFAULT: '#E9DDA9',
          50: '#FFFFFF',
          100: '#FFFFFF',
          200: '#FFFFFF',
          300: '#FAF7EA',
          400: '#F1EAC9',
          500: '#E9DDA9',
          600: '#DECB7C',
          700: '#D2BA50',
          800: '#BAA030',
          900: '#8D7A24',
          950: '#77661E'
        },
      }
    },
  },
  plugins: [],
}