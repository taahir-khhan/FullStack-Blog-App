/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        herom: "0",
        herob: "1275px",
      },
    },
  },
  plugins: [],
};
