import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D5BFF',
        secondary: '#0F172A',
        accent: '#22C55E'
      },
      borderRadius: {
        xl: '1rem',
        '2xl': '1.5rem'
      },
      boxShadow: {
        card: '0 10px 30px rgba(0, 0, 0, 0.08)'
      },
      fontFamily: {
        display: ['Inter', 'Noto Sans Oriya', 'ui-sans-serif', 'system-ui']
      }
    }
  },
  plugins: []
};

export default config;
