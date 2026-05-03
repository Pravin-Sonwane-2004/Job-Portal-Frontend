/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem',
      },
    },
    extend: {
      colors: {
        brand: {
          50: '#eef4ff',
          100: '#d9e6ff',
          200: '#bcd0ff',
          300: '#93b2ff',
          400: '#6790ff',
          500: '#416cff',
          600: '#2c4fe3',
          700: '#263fb7',
          800: '#25388f',
          900: '#233270',
        },
      },
      fontFamily: {
        sans: ['"IBM Plex Sans"', '"Segoe UI"', 'ui-sans-serif', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
