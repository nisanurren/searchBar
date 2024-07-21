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
    },
  },
  plugins: [],

}