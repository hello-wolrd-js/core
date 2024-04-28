/** @type {import('tailwindcss').Config} */
export default {
    content: ['*.{js,ts,jsx,tsx}'],
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['light', 'dark', 'wireframe', 'winter']
    }
}
