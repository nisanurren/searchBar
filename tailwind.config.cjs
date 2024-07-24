module.exports = {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#040433',
        'custom-black': '#000000',
        'fini-blue': '#0052cc',
        'fini-light': '#ccdae7'
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(to bottom, #040433, #000000)',
      },
      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out',
        fadeOut: 'fadeOut 0.5s ease-in-out'
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'scale(0.9)' },
          '100%': { opacity: 1, transform: 'scale(1)' }
        },
        fadeOut: {
          '0%': { opacity: 1, transform: 'scale(1)' },
          '100%': { opacity: 0, transform: 'scale(0.9)' }
        }
      }
    },
  },
  plugins: [],

}