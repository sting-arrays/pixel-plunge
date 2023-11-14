/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "water-bg": "url(/pixel_art_water_bg.png)",
      },
    },
  },
  plugins: [],
};
