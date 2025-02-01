import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vite.dev/config/
export default defineConfig({
  preview: {
    port: 5173,
    strictPort: true,
  },
  server: {
    port: 5173,
    strictPort: true,
    host: true,
    origin: "http://localhost:5173"
    ,
  },
  plugins: [react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "${path.join(process.cwd(), './_mantine').replace(/\\/g, '/')}" as mantine;`,
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@Hooks': path.resolve(__dirname, './src/common/presentation/view-model/hooks'),
      '@Styles': path.resolve(__dirname, './src/common/presentation/view/styles'),
      '@Utils': path.resolve(__dirname, './src/common/presentation/view-model/utils'),
      '@Atom': path.resolve(__dirname, './src/common/presentation/view/components/atom'),
      '@Molecule': path.resolve(__dirname, './src/common/presentation/view/components/molecule'),
      '@Organisme': path.resolve(__dirname, './src/common/presentation/view/components/organisme'),
    },
  },
})
