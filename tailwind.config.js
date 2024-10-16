/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './App.{js,jsx,ts,tsx}',
    './screens/**/*.{js,jsx,ts,tsx}',
    './component/**/*.{js,jsx,ts,tsx}',
    './component/CoffeeComponent/**/*.{js,jsx,ts,tsx}',
    './navigation/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
