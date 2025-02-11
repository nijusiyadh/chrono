import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/providers/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      colors: {
        'bg-primary': '#323437',
        'bg-secondary': '#2C2E31',
        'text-yellow': '#E1B731',
        'text-faded': '#706565',
        'text-white': '#D0D0D0',
        'text-green': '#00B077',
        'bg-gray': '#646669',
        'bg-gray-light': '#a9a9a9',
      },
      maxWidth: {
        195: '724px',
        desktop: '1600px'
      }
    }
  },
  plugins: []
} satisfies Config
