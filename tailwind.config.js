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
        'base': '#2B2D42',
        'dark': '#2B2D3B'
      },
      'gray': {
        'base': '#8D99AE',
        'light': '#D8DBE2'
      }
    },
    fontFamily: {
      sans: ['Agenda', 'sans-serif'],
      serif: ['EB Garamond', 'Georgia', 'Cambria', 'serif'],
      flair: ['Abel']
    },
    extend: {},
  },
  plugins: [],
}