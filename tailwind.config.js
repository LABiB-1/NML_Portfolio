/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        portfolio: {
          pink: '#dd7bbb',
          gold: '#d79f1e',
          green: '#5a922c',
          blue: '#4c7894',
          bg: '#000000',
          card: '#0d0d0d',
          border: 'rgba(255,255,255,0.08)',
          text: 'rgba(255,255,255,0.9)',
          muted: 'rgba(255,255,255,0.45)',
        }
      },
      fontFamily: {
        sans: ['DM Sans', 'sans-serif'],
        display: ['Syne', 'sans-serif'],
      },
      animation: {
        ping: 'ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      keyframes: {
        ping: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.75' },
          '50%': { transform: 'scale(1.3)', opacity: '0.4' },
        }
      }
    },
  },
  plugins: [],
}
