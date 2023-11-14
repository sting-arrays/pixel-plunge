/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "water-bg": "url(src/assets/Background/pixel_art_water_bg.png)",
        "leaderboard-bg": "url(src/assets/Other/scroll-leaderboard)"
      },
    },
  },
  plugins: [],
};
