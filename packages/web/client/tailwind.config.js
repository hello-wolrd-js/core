/** @type {import('tailwindcss').Config} */
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                'press-start': ['"PressStart2P"'],
                zpix: ['Zpix']
            }
        }
    },
    plugins: [require('daisyui')],
    daisyui: {
        themes: ['light', 'dark', 'wireframe']
    }
}