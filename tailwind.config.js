/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#1B120E',        // warm near-black
        coal: '#241813',
        cream: '#FDF6EC',
        sand: '#F3E7D6',
        ember: '#EA580C',      // burnt orange primary
        emberdark: '#C2410C',
        saffron: '#F59E0B',
        chili: '#E11D48',
        veg: '#16A34A',
        nonveg: '#DC2626',
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 10px 30px -12px rgba(27,18,14,0.18)',
        lift: '0 20px 45px -15px rgba(27,18,14,0.28)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        pop: { '0%': { transform: 'scale(1)' }, '50%': { transform: 'scale(1.15)' }, '100%': { transform: 'scale(1)' } },
        floaty: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-8px)' } },
        rise: { '0%': { opacity: 0, transform: 'translateY(14px)' }, '100%': { opacity: 1, transform: 'translateY(0)' } },
      },
      animation: {
        pop: 'pop .35s ease',
        floaty: 'floaty 6s ease-in-out infinite',
        rise: 'rise .5s ease both',
      },
    },
  },
  plugins: [],
}
