/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        0.25: "0.0625rem",
        13: "3.25rem",
      },
      borderWidth: {
        1: "0.0625rem",
      },
      borderRadius: {
        smd: "0.25rem",
      },
      fontFamily: {
        "roboto-mono": ["Roboto Mono", "monospace"],
        "dm-sans": ["DM Sans", "sans-serif"],
      },
      colors: {
        "primary-dark-color": "#222326",
        "gray-text-color": "#8B8B8B",
        "dark-gray-color": "#5A5B5D",
        "medium-gray-color": "#C1BFCD",
        "light-gray-color": "#DEDEDE",
        "very-light-gray": "#EEEFF0",
        "bg-color": "#F2F2F2",
        "light-blue": "#B9C3DD",
      },
    },
  },
  plugins: [],
};
