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
  variants: {
    scale: ["active"],
  },
  plugins: [],
  purge: {
    content: [
      "./src/**/*.svelte",
      // may also want to include base index.html
    ],
    enabled: production, // disable purge in dev
  },
};
