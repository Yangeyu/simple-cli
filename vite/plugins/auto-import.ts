import type { Plugin } from 'vite';
import autoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default function createAutoImport(): Plugin {
  return autoImport({
    imports: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'pinia',
    ],
    resolvers: [
      ElementPlusResolver()
    ],
    dts: './auto-imports.d.ts'
  });
}
