module.exports = {
  content: [
    './assets/**/*.{js,ts,jsx,tsx}',
    './index.html'
  ],
  theme: {
    colors: {
      'red': '#FE5F55',
      'indigo': {
        'base': '#3F325D',
        'light': '#42517C'
      },
      'yellow': {
        'base': '#FFE066',
        'light': '#FFFFC7'
      },
      'bluegray': {
        'base': '#2B2D42'
      },
      'gray': {
        'base': '#8D99AE',
        'light': '#D8DBE2'
      }
    },
    fontFamily: {
      sans: ['Agenda', 'Abel', 'sans-serif'],
      serif: ['serif'],
    },
    extend: {},
  },
  plugins: [],
}