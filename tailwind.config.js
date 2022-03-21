const production = !process.env.ROLLUP_WATCH; // or some other env var like NODE_ENV
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      fontSize: {
        "7xl": "7.5rem",
      },
    },
  },
  plugins: [],
  content: [
    "./src/**/*.svelte",
    // may also want to include base index.html
  ],
};
