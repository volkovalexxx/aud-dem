/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bybit: {
          orange: 'rgb(255, 156, 46)',
          'orange-hover': 'rgb(230, 140, 40)',
          black: '#0B0E11',
          dark: '#151A21',
          card: '#1C2128',
          header: '#17181e',
          gray: '#2C333A',
          'gray-light': '#6B7280',
          success: '#00C853',
          danger: '#FF3D00',
          warning: '#FFD600'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      height: {
        'header': '48px',
      }
    },
  },
  plugins: [],
}
