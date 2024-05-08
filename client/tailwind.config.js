/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#D62828',
        secondary: '#F77F00',
        secondaryAccent: '#FCBF49',
        contrastSecondary:'#EAE2B7',
        lightBlack:'#EAE2B7',
      }
    },
  },
  plugins: [],
}