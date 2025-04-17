/** @type {import('tailwindcss').Config} */
import tailwindScrollbar  from 'tailwind-scrollbar';
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
          "ayotaku-super-light": "#f6f6f9",
          "ayotaku-normal-light": "#ecedf2",
          "ayotaku-light": "#d6d7e1",
          "ayotaku-bit-dark": "#b2b4c7",
          "ayotaku-normal-dark": "#888ca8",
          "ayotaku-dark": "#3b3d51",
          "ayotaku-super-dark": "#23242e",
        },
        backgroundImage: {
          "ayotaku-genres": "url('/src/image/banner-red.jpg')",
        },
        textColor: {
          "ayotaku-text-default": "#d9d2ff",
        },
        fontSize: {
          "ayotaku-text-xs": "10px",
          "ayotaku-text-sm": "12px",
        },
        accentColor: {
          "ayotaku-accent-checkbox": "#3b3d51",
        },
        ringColor: {
          "ayotaku-ring": "#3b3d51",
        }
      },
    container: {
      center: true
    }
  },
  plugins: [
    tailwindScrollbar,
  ],
};