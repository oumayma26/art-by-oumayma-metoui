/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}"
  ],
  theme: {
    extend: {
      colors: {
        'rose-pale': '#FFF0F5',
        'rose-misty': '#FFE4E1',
        'rose-snow': '#FFFAFA',
        'rose-dark': '#DB7093',
        'rose-medium': '#C71585',
        'gold': '#D4AF37',
        'text-primary': '#4A4A4A',
        'text-secondary': '#8B7D7B'
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'],
        'body': ['Poppins', 'sans-serif']
      },
      boxShadow: {
        'pink': '0 10px 30px rgba(219, 112, 147, 0.15)',
        'pink-lg': '0 20px 40px rgba(219, 112, 147, 0.2)'
      },
      borderRadius: {
        'xl': '1.5rem',
        '2xl': '2rem',
        '3xl': '3rem'
      }
    }
  },
  plugins: []
}
