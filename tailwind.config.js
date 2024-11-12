/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      fontFamily: {
        handwriting: ['Pacifico', 'cursive'],
      },
      colors: {
        primary: '#4D869C',
        'primary-hover': '#3A6B7E',
        secondary: '#F0B7A9',
        'secondary-hover': '#D89882',
        terciary: '#7AB2B2',
        'terciary-hover': '#639999',
        quaternary: '#cde8e5',
        'quaternary-hover': '#AACFCB',
        quinary: '#EEF7FF',
        'quinary-hover': '#D4E7FF',
        darkGray: '#333333',
        'darkGray-700': '#555555',
        'darkGray-500': '#777777',
        textMuted: '#4B5563', // Equivalente a gray-700
        mainBackground: '#F9FAFB', // Similar a gray-50
      },
    },
  },
  plugins: [],
}

