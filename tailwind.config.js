/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: ['class'],
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
          DEFAULT: 'hsl(var(--background))',
        },
        primary: {
          500: '#00A9A5',
          600: '#008C89',
          700: '#007A77',
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        accent: {
          500: '#FFD700',
          600: '#E6C200',
          700: '#CCB000',
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        success: {
          500: '#00C853',
          600: '#4CAF50'
        },
        error: {
          500: '#FF5252',
          600: '#F44336'
        },
        notification: {
          DEFAULT: '#F44336'
        },
        text: {
          'primary': '#1A1A1A',
          'primary-dark': '#4A4A5C',
          'light-primary': '#EBE9FC',
          'light-primary-dark': '#9E9EAF'
        },
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))'
        }
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
        montserrat: ['Montserrat', 'sans-serif']
      },
      fontSize: {
        'heading-2xl': '2.25rem',
        'heading-xl': '2rem',
        'heading-lg': '1.5rem',
        'heading-md': '1.25rem',
        'body': '1.1235rem',
        'body-sm': '1rem',
        'body-xs': '0.875rem',
        'accent-xs': '0.75rem',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}