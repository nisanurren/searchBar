module.exports = {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#1a1a6c',
        'custom-black': '#000000',
      },
      backgroundImage: {
        'gradient-custom': 'linear-gradient(to bottom, #1a1a6c, #000000)',
      },
    },
  },
  plugins: [],

}