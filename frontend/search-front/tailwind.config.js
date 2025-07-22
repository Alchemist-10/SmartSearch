/** @type {import('tailwindcss').Config} */
import daisyui from 'daisyui'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",  // include JSX and TSX!
  ],
  theme: {
    extend: {
      animation: {
        'text-gradient': 'text-gradient 3s linear infinite'
      },
      keyframes: {
        'text-gradient': {
          to: {
            backgroundPosition: '200% center'
          }
        }
      }
    },
  },
  plugins: [daisyui],
  daisyui: {
    themes: ["cupcake"]
  }
}
