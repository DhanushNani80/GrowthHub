// tailwind.config.cjs
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#3B82F6",
        accent: "#6366F1",
        dark: "#1E293B",
      },
    },
  },
  plugins: [],
};
