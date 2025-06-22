import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: "#111827",
        light: "#FFFFFF",
        primary: "#BB86FC",
        secondary: "#03DAC6",
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-lora)', 'serif'],
      },
      animation: {
        'pulse-glow': 'pulse-glow 4s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 
            transform: 'scale(1)',
            boxShadow: '0 0 5px rgba(187, 134, 252, 0.2)' 
          },
          '50%': { 
            transform: 'scale(1.02)',
            boxShadow: '0 0 15px rgba(187, 134, 252, 0.4)' 
          },
        }
      }
    },
  },
  plugins: [
    require('@tailwindcss/aspect-ratio'),
  ],
}
export default config 