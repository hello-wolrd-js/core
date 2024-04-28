import daisy from 'daisyui'
import type { Config } from 'tailwindcss'
export default {
    content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
    plugins: [daisy],
    daisyui: {
        themes: ['light', 'dark', 'wireframe']
    }
} as Config
