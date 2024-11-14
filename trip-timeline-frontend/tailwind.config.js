/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      'arima': 'Arima Madurai',
      'nunito': 'Nunito',
    },
    extend: {
      colors: {
        'body': '#100227',
        'primary': '#0C58DD',
        'teal': '#79FEFB',
        'pink': '#FC03B8',
        'purple': '#7e43cd',
        'dark': '#210D42',
        'light': '#1B1B1B',
      },
      backgroundImage: {
        'bannerGradient': 'linear-gradient(180deg, rgba(0, 0, 0, 0), #12032A 90%)',
        'btnBg': 'linear-gradient(90deg, #025BDE 2.35%, #FE02B8 98.59%)',
        'btnHoverBg': 'linear-gradient(90deg, #FE02B8 2.35%, #025BDE 98.59%)',
        'sec': 'linear-gradient(125.1deg, rgba(255, 255, 255, 0.12) 2.04%, rgba(82, 0, 255, 0.2) 97.17%)',
        'lrcircle': 'linear-gradient(290.12deg, rgba(189, 0, 255, 0.5) 10.16%, rgba(82, 0, 255, 0.5) 62.62%)',
      },
      screens: {
        'xs': '480px',
      },
      container: {
        padding: '1rem',
        center: true,
      },
    }
  },
  plugins: [],
}
