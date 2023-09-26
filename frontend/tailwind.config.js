/** @type {import('tailwindcss').Config} */

const {nextui} = require("@nextui-org/theme");
export default {

  content: [
    './components/**/*.{html,js}',
    './pages/**/*.{html,js}',
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    'node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  

  ],
  theme: {
    extend: {

      colors: {
        kunjappan: "#2596be"
      },


    },
  },
  darkMode: "class",
 
  plugins: [
    require('daisyui'),
    require('flowbite/plugin'),
   

  ],
  daisyui: {
    darkTheme: "light"
  },
  flowbite:{
    darkTheme:"light"
  }
}

