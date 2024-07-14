/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {

    extend: {
      colors: {
        primary: "#34623F",
        secondary: "#B39C4D",
        secondaryAccent: "#EAE2B7",
        primaryLight: "#768948",
        primaryDark: "#1E2F23",
        lightBlack: "#003049",
      },
      scale: {
        101: "1.01",
        102: "1.02",
      },
    },
  },
  plugins: [],
};
