import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    base: './', // Коректний шлях до ресурсів при деплої
    build: {
        outDir: 'dist', // Папка для збірки
        sourcemap: true, // Карти коду для відлагодження
        rollupOptions: {
            output: {
                manualChunks: {
                    // Оптимізує розбиття коду для кращого завантаження
                    vendor: ['react', 'react-dom']
                }
            }
        }
    }
});