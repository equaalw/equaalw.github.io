import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        colors: 'colors.html',
        diffusione: 'diffusione.html',
        oe: 'oe.html'
      }
    }
  }
})