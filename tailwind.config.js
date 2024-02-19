/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'#160F0d',
        bodyColor:'#777990'
      },
      fontFamily:{
        home:['Oswald', 'Serif']
      }
    },
  },
  plugins: [],
}