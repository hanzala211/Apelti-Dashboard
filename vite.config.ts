import { defineConfig } from 'vite'
import path from 'node:path'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components/index.ts'),
      '@constants': path.resolve(__dirname, './src/constants/index.ts'),
      '@pages': path.resolve(__dirname, './src/pages/index.ts'),
      '@types': path.resolve(__dirname, 'src/types/index.ts'),
      '@context': path.resolve(__dirname, 'src/context/index.ts'),
      '@layouts': path.resolve(__dirname, 'src/layouts/index.ts'),
      '@services': path.resolve(__dirname, 'src/services/index.ts'),
      '@helpers': path.resolve(__dirname, 'src/helpers/index.ts'),
      '@hooks': path.resolve(__dirname, 'src/hooks/index.ts'),
      '@api': path.resolve(__dirname, 'src/api/index.ts'),
    }
  }
})
