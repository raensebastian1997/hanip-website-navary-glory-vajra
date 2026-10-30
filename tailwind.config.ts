import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#fff1f1',
          100: '#ffdede',
          200: '#ffc2c2',
          300: '#ff9797',
          400: '#ff5c5c',
          500: '#f91f1f',
          600: '#d80000',
          700: '#b60000',
          800: '#960606',
          900: '#7c0c0c',
          950: '#430202',
        },
        ink: '#141414',
        cream: '#faf7f2',
        gold: '#c9a227',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 20px 50px -24px rgba(20, 20, 20, 0.25)',
        float: '0 18px 40px -18px rgba(20, 20, 20, 0.4)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #d80000 0%, #7c0c0c 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
