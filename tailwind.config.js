/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/lib/esm/**/*.js",
  ],

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
      keyframes: {
        slideInLeft: {
          "0%": { transform: "translateX(-1rem)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInRight: {
          "0%": { transform: "translateX(1rem)" },
          "100%": { transform: "translateX(0)" },
        },
        slideInTop: {
          "0%": { transform: "translateY(-1rem)" },
          "100%": { transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { transform: "scale(1.1)" },
          "100%": { transform: "scale(1)" },
        },
      },
      animation: {
        "slide-in-left":
          "slideInLeft 0.5s cubic-bezier(.02,.88,.24,1) forwards",
        "slide-in-right":
          "slideInRight 0.5s cubic-bezier(.02,.88,.24,1) forwards",
        "slide-in-top": "slideInTop 0.5s cubic-bezier(.02,.88,.24,1) forwards",
        "scale-in": "scaleIn 0.5s cubic-bezier(.02,.88,.24,1) forwards",
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
