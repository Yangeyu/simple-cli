import type { Plugin } from 'vite';
import autoImport from 'unplugin-auto-import/vite';

export default function createAutoImport(): Plugin {
  return autoImport({
    imports: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'pinia',
    ],
  });
}