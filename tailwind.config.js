/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#e7702b',
        primaryDark: '#a63d00',
        gray900Dark: '#080d16'
      },
      animation: {
        wiggle: 'wiggleKF 0.4s ease-in-out infinite'
      },
      keyframes: {
        wiggleKF: {
          '0%, 100%': { transform: 'rotate(0)' },
          '50%': { transform: 'rotate(12deg)' }
        }
      },
      boxShadow: {
        '2xl': '0 0 16px 4px rgba(0, 0, 0, 0.5)'
      }
    }
  },
  plugins: []
};
