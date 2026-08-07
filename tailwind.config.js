/** @type {import('tailwindcss').Config} */
const config = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: "#C8A951",
        dark: {
          bg: "#0B0B0B",
          card: "#1A1A1A",
          muted: "#A1A1A1",
        },
      },
    },
  },
  plugins: [],
}

module.exports = config