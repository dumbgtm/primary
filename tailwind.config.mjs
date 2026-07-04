/** @type {import('tailwindcss').Config} */
export default {
    content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
    theme: {
          extend: {
                  colors: {
                            paper: '#E9FFF9',
                            ink: '#1D3354',
                            siren: '#D64045',
                            frost: '#9ED8DB',
                            cerulean: '#467599',
                            slate: '#5B6B85',
                  },
                  fontFamily: {
                            display: ['"Inter Tight"', 'Inter', 'sans-serif'],
                            body: ['Inter', 'Helvetica', 'Arial', 'sans-serif'],
                  },
          },
    },
    plugins: [],
};
