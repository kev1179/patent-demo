import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        ws: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        configure: (proxy, options) => {
          console.log('Proxy configured:', options);
          proxy.on('proxyReq', (proxyReq, req) => {
            console.log('Proxying request to:', req.url);
          });
          proxy.on('proxyRes', (proxyRes, req) => {
            console.log('Received response from:', req.url);
          });
        }
      },
    },
  },
  plugins: [react()],
})