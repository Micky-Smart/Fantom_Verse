/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        fandom: {
          dark: '#09090b',
          card: '#141416',
          cardHover: '#1f1f23',
          border: 'rgba(244, 63, 94, 0.2)',
          rose: '#f43f5e',
          purple: '#8b5cf6',
          cyan: '#06b6d4',
          pink: '#ec4899',
          amber: '#f59e0b',
          blue: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Outfit', 'Inter', 'sans-serif'],
      },
      animation: {
        'pulse-glow': 'pulseGlow 2.5s infinite',
        'float': 'float 4s ease-in-out infinite',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', filter: 'blur(20px)' },
          '50%': { opacity: '0.8', filter: 'blur(30px)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
}
