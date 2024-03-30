/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        'royal-blue': {
          '50': '#ffffff', 
          '100': '#dfebff',
          '200': '#c6d9ff',
          '300': '#a3bffe',
          '400': '#7f9bfa',
          '500': '#6077f4',
          '600': '#535fea',
          '700': '#353ecd',
          '800': '#2e37a5',
          '900': '#2c3483',
          '950': '#1a1e4c',
        },   
      },
    },
  },
  daisyui: {
    themes: ["light", "dark", "cupcake"],
  },
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  plugins: [require("daisyui")],
};
