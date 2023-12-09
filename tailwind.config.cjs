/** @type {import('tailwindcss').Config} */
export default {
  content: ['./views/**/*.pug'],
  theme: {
    extend: {
      colors:{
        'azul': '#284A7D',
        'aqua': '#20B8AA',
        'verdeaqua': '#56F0B9',
        'rosa': '#FFB997',
        'white': '#FBFFFE',
        'verdealto': '#01E6F5',
        'body': '#C3FAEC'
        },
        boxShadow:{
          "negro":"0 0 15px rgba(0,0,0,0.4)",
        }
    },
  },
  plugins: [],
}

