import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  assetsInclude: ['**/*.JPG', '**/*.jpg', '**/*.jpeg', '**/*.png', '**/*.svg', '**/*.gif', '**/*.webp'],
  build: {
    sourcemap: true, // Enable source maps
  },
})
