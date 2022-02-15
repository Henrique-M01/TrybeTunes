module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      boxShadow: {
        '3xl': '0 35px 60px -15px black',
      },
      colors: {
        'gradient': 'linear-gradient(180deg, #075985, #165c88, #2e668f, #48759a, #6487a9, #829db8, #a0b3c9, #bccad9, #d6dee8, #eceff4, #fafbfc, #ffffff);',
      },
      maxHeight: {
        '128': '32rem',
      }
    },
  },
  plugins: [],
}
