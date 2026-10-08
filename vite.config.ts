import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import {viteSingleFile} from 'vite-plugin-singlefile';

export default defineConfig(({mode}) => ({
  plugins: [react(), tailwindcss(), ...(mode === 'demo' ? [viteSingleFile()] : [])],
  build: mode === 'demo' ? {outDir: 'dist-demo', assetsInlineLimit: 100_000_000} : {},
}));
