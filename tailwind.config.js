/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js" // add this line
  ],
  important: true,
  theme: {

    extend: {
      colors: {
        fondo: '#FEFBFB',
        primary: '#F33535', // Azul
        secondary: '#33425B', // Rojo
        terceary: '#29252C', // Negro
        cuaternary: '#F6F8F6',
        verdeBritanico: '#64EE9B',





        success: '#31c48d'
      },

      borderWidth: {
        '10': '10px',
        '12': '12px',
        '14': '14px',
        '16': '16px',
      },
    },
  },
  plugins: [
    require('flowbite/plugin') // add this line
  ],
}
