const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cosmos: '#1E2A38',
        aurora: '#00C2FF',
        starlight: '#FFD166',
        verdant: '#A1FFCE',
        silvermist: '#C9D6E0'
      },
      fontFamily: {
        sans: ['Inter', 'Noto Sans TC', ...defaultTheme.fontFamily.sans]
      }
    }
  },
  plugins: []
};
