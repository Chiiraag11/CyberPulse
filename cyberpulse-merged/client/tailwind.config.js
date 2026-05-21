/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,jsx}', './components/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        neon: '#00ff88',
        cyan: '#00e5ff',
        dark: '#080d12',
        card: '#0d1521',
        border: '#1a2a3a',
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Syne', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
