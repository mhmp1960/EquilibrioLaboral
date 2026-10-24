import type { Config } from 'tailwindcss';

// La interfaz usa el sistema de diseño de src/app/globals.css; estos tokens permiten
// usar los mismos colores de marca en utilidades de Tailwind si se necesitan.
const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        navy: { 950: '#08202f', 900: '#0d2a3d', 800: '#123750', 700: '#1b4a66', DEFAULT: '#0d2a3d' },
        teal: { 700: '#0a6f68', 600: '#0b857b', 500: '#10a397', 400: '#3cc2b3', 200: '#b9e9e1', 100: '#d9f3ee', 50: '#eef9f7' },
        mint: '#bdebdd',
      },
    },
  },
  plugins: [],
};
export default config;
