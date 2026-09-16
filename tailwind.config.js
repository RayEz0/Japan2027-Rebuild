/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        paper: '#F5F4F0',
        alt:   '#EFEDE7',
        surf:  '#FFFFFF',
        ink: {
          DEFAULT: '#0C0C0C',
          2: '#3A3A3A',
          3: '#777777',
          4: '#BBBBBB',
        },
        accent: {
          DEFAULT: '#B8321A',
          light:   '#D95E42',
          bg:      '#FDF3F0',
        },
        border: {
          DEFAULT: '#D5D2CA',
          strong:  '#0C0C0C',
        },
        city: {
          tokyo:  '#D8E6F2',
          fuji:   '#DCE8DD',
          kyoto:  '#E8DCC7',
          nara:   '#E8E4D0',
          osaka:  '#F4D6D6',
        },
      },
      fontFamily: {
        serif: ['Fraunces', 'Georgia', 'serif'],
        sans:  ['Outfit', 'system-ui', 'sans-serif'],
        mono:  ['"JetBrains Mono"', 'Menlo', 'monospace'],
      },
    },
  },
  plugins: [],
}
