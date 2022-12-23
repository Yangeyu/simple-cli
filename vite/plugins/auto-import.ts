import type { Plugin } from 'vite';
import autoImport from 'unplugin-auto-import/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import IconsResolver from 'unplugin-icons/resolver'

export default function createAutoImport(): Plugin {
  return autoImport({
    dts: true,
    imports: [
      'vue',
      'vue-router',
      '@vueuse/core',
      'pinia',
    ],
    resolvers: [
      IconsResolver({}),
      ElementPlusResolver()
    ],
  });
}
