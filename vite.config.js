import { defineConfig } from 'vite'

export default defineConfig({
  base: '/',
  build: {
    rollupOptions: {
      input: {
        index: 'index.html',
        idiot: 'idiot.html',
        colors: 'colors.html',
        diffusione: 'diffusione.html',
        galerie: 'galerie-next.html',
        oe: 'oe.html'
      }
    }
  }
})