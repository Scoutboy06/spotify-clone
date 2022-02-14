module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'spotify-green': '#1DB954',
        '00dp': '#121212',
        '01dp': '#1E1E1E',
        '02dp': '#232323',
        '03dp': '#252525',
        '04dp': '#272727',
        '06dp': '#2C2C2C',
        '08dp': '#2F2F2F',
        '12dp': '#333333',
        '16dp': '#353535',
        '24dp': '#383838',
      },
      fontSize: {
        'xxs': '.65rem'
      },
      gridTemplateColumns: {
        'root': '256px auto',
      }
    },
  },
  plugins: [],
  darkMode: 'media', // or 'class'
}
