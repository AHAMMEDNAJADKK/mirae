/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#0a0a0a',
        surface: '#121212',
        charcoal: '#181818',
        'soft-charcoal': '#242424',
        border: 'rgba(255, 255, 255, 0.08)',
        'border-light': 'rgba(255, 255, 255, 0.16)',
        subtle: '#8e8e8e',
        body: '#b0b0b0',
        cream: '#f4f3ef',
      },
      fontFamily: {
        pencrow: ['Pencrow', 'Pilcrow', 'Pilcrow Rounded', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        display: ['Pencrow', 'Pilcrow', 'Pilcrow Rounded', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        sans: ['Pencrow', 'Pilcrow', 'Pilcrow Rounded', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        pilcrow: ['Pencrow', 'Pilcrow', 'Pilcrow Rounded', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      letterSpacing: {
        architectural: '0.25em',
        widest: '0.35em',
      },
    },
  },
  plugins: [],
}
