/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        zoomSlow: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.05)" },
        },
      },
      animation: {
        zoomSlow: "zoomSlow 8s ease-in-out forwards",
      },
      colors: {
        primary: "#facc15", // amarillo similar a yellow-400
      },
    },
  },
  plugins: [],
};
