/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: { sans: ['IBM Plex Sans', ...defaultTheme.fontFamily.sans] },
      colors: {
        custom: {
          gray: '#6A6B83',
        },
        fetch: {
          offWhite: '#F9F7F2',
          grayDark: '#343A40',
          purple: '#300D38',
          bluePurple: '#6D62DD',
          gold: '#FBA919',
          danger: '#dc3545',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
