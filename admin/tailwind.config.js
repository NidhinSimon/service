/** @type {import('tailwindcss').Config} */

import daisyui from 'daisyui'
import flowbite from 'flowbite/plugin'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    daisyui,
    flowbite


  ],

  daisyui: {
    darkTheme: "light"
  },
  flowbite: {
    darkTheme: "light"
  }
}

