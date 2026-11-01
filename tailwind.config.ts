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
          50: '#eff8fd',
          100: '#d8eefa',
          200: '#b4e0f5',
          300: '#7fcdec',
          400: '#43b3dc',
          500: '#1a98c7',
          600: '#065c8c',
          700: '#054d76',
          800: '#06405f',
          900: '#07364f',
          950: '#052336',
        },
        accent: {
          50: '#ecfeff',
          100: '#cffafe',
          200: '#a5f3fc',
          300: '#67e8f9',
          400: '#22d3ee',
          500: '#11a8b4',
          600: '#0e8b96',
          700: '#0f6e78',
          800: '#115a63',
          900: '#124b53',
          950: '#042f36',
        },
        ink: '#333333',
        cream: '#f8f9fa',
      },
      fontFamily: {
        sans: ['var(--font-body)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 20px 50px -24px rgba(5, 35, 54, 0.22)',
        float: '0 18px 40px -18px rgba(5, 35, 54, 0.35)',
      },
      backgroundImage: {
        'brand-gradient': 'linear-gradient(135deg, #065c8c 0%, #054d76 55%, #052336 100%)',
        'accent-gradient': 'linear-gradient(135deg, #11a8b4 0%, #0f6e78 100%)',
      },
    },
  },
  plugins: [],
};

export default config;
