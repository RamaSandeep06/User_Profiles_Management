/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // This line is the important one
  ],
  theme: {
    extend: {
      fontFamily: {
        // Add Inter font to match the design
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
