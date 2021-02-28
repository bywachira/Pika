module.exports = {
  purge: [
    "./pages/**/*.tsx",
    "./components/**/*.tsx",
    "./pages/**/*.js",
    "./components/**/*.js",
  ],
  darkMode: "class", // or 'media' or 'class'
  theme: {
    fontFamily: {
      copywrite: ["'Paytone One', sans-serif"],
      inter: ["Inter"],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
