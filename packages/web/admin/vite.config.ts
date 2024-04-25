import { defineConfig } from 'vite'
import { fileURLToPath, URL } from 'node:url'
import solidPlugin from 'vite-plugin-solid'
// import devtools from 'solid-devtools/vite'

export default defineConfig({
    plugins: [
        /* 
    Uncomment the following line to enable solid-devtools.
    For more info see https://github.com/thetarnav/solid-devtools/tree/main/packages/extension#readme
    */
        // devtools(),
        solidPlugin()
    ],
    server: {
        port: 3000
    },
    build: {
        target: 'esnext'
    },
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url)),
            '@api': fileURLToPath(new URL('../api', import.meta.url)),
            '@stores': fileURLToPath(new URL('../stores', import.meta.url)),
            '@components': fileURLToPath(new URL('../components', import.meta.url)),
            '@hooks': fileURLToPath(new URL('../hooks', import.meta.url))
        }
    }
})
