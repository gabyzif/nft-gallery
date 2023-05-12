/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["'Fira Sans Extra Condensed', sans-serif;"],
        play: ['Play, sans-serif;']
      },
      colors: {
        primary: {
          regular: '#5442ba',
          dark: 'rgba(25, 28, 31)'
        },
        secondary: {
          regular: '#44e1a4',
          dark: '#232528'
        },
        tertiary: {
          regular: '#f56032'
        }
      },
      height: {
        'screen-3/4': '90vh'
      }
    }
  },
  plugins: []
};
