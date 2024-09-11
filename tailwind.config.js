/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          950: 'var(--color-background-950)',
          900: 'var(--color-background-900)',
          800: 'var(--color-background-800)',
        },
        primary: {
          500: 'var(--color-primary-500)',
          600: 'var(--color-primary-600)',
          700: 'var(--color-primary-700)',
        },
        accent: {
          500: 'var(--color-accent-500)',
          600: 'var(--color-accent-600)',
          700: 'var(--color-accent-700)',
        },
        success: {
          500: 'var(--color-success-500)',
          600: 'var(--color-success-600)',
        },
        error: {
          500: 'var(--color-error-500)',
          600: 'var(--color-error-600)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          'primary-dark': 'var(--color-text-primary-dark)',
        },
      },
      fontFamily: {
        inter: ['var(--font-inter)'],
        montserrat: ['var(--font-montserrat)'],
      },
    },
  },
  plugins: [],
}