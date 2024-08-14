/** @type {import('tailwindcss').Config} */
export default {
  content: [
      './index.html',
      './src/**/*.{vue,js,ts,jsx,tsx}',
      './node_modules/primereact/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
      extend: {
        backgroundColor: {
          "ayotaku-box": "#46496A",
          "ayotaku-button": "#D9D2FF",
        },
        textColor: {
          "ayotaku-text-default": "#D9D2FF",
        },
      },
  },
  plugins: [],
};