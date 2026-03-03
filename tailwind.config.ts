import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        sidebar: {
          DEFAULT: '#0f172a',
          lighter: '#1e293b',
          border: '#334155',
        },
        agent: {
          primary: '#6366f1',
          secondary: '#818cf8',
        },
      },
    },
  },
  plugins: [],
}
export default config
