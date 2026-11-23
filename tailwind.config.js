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
        pureBlack: '#000000',
        pureWhite: '#FFFFFF',
        charcoal: '#111111',
        darkGray: '#242424',
        midGray: '#1c1c1c',
        subtleGray: '#333333',
        mutedGray: '#888888',
        lightGray: '#EAEAEA',
        softWhite: '#F5F5F5',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        sans: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.6' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        pulseSubtle: 'pulseSubtle 2s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
      },
      boxShadow: {
        'brutal-white': '4px 4px 0px 0px #FFFFFF',
        'brutal-black': '4px 4px 0px 0px #000000',
        'brutal-subtle': '0px 0px 30px rgba(255, 255, 255, 0.05)',
        'glow-white': '0 0 20px rgba(255, 255, 255, 0.15)',
      }
    },
  },
  plugins: [],
}
