/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      zIndex: {
        '500': '500',
      }
    },
  },
  plugins: [
    require("daisyui")
  ],
  prefix: 'tw-',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
}
