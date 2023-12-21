import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    define: {
        'process.env': process.env,
    },
    server: {
        host: true,
        port: 5174,
        https: {
            key: '/home/citonex/conf/web/dev.adminalgo.ae/ssl/dev.adminalgo.ae.key',
            cert: '/home/citonex/conf/web/dev.adminalgo.ae/ssl/dev.adminalgo.ae.pem',
        }
    },
    base: './',
});
