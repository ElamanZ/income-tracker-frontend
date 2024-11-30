import {
  defineConfig,
  // loadEnv
} from 'vite';
import react from '@vitejs/plugin-react';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import path from 'path';
import { type VitePWAOptions, VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig(({
  // mode,
  command,
}) => {
  const NODE_ENV = command === 'serve' ? 'development' : 'production';

  // const env = loadEnv(mode, process.cwd());

  const pwaOptions: Partial<VitePWAOptions> = {
    mode: NODE_ENV,
    base: '/',
    includeAssets: ['favicon.svg'],
    devOptions: {
      enabled: process.env.SW_DEV === 'true',
      /* when using generateSW the PWA plugin will switch to classic */
      type: 'module',
      navigateFallback: 'index.html',
    },
  };

  return {
    plugins: [
      react(),
      TanStackRouterVite(),
      VitePWA(pwaOptions),
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './src')
      }
    },
    define: {
      'import.meta.env.APP_VERSION': JSON.stringify(process.env.npm_package_version),
    }
  };
})
