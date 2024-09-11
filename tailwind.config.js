/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          950: '#F8F7F4',
          900: '#E8E7E0',
          800: '#F0EFE9',
          'dark-950': '#121212',
          'dark-900': '#1E1E1E',
          'dark-800': '#2A2A2A',
        },
        primary: {
          500: '#00A9A5',
          600: '#008C89',
          700: '#007A77',
        },
        accent: {
          500: '#FFD700',
          600: '#E6C200',
          700: '#CCB000',
        },
        success: {
          500: '#00C853',
          600: '#4CAF50',
        },
        error: {
          500: '#FF5252',
          600: '#F44336',
        },
        text: {
          primary: '#333333',
          'primary-dark': '#6E6E80',
          'light-primary': '#EBE9FC',
          'light-primary-dark': '#9E9EAF',
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
}