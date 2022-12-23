
import type { Plugin } from 'vite';
import components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


export default function createComponents(): Plugin {
  return components({
    dirs: ['src/components', 'src/layouts'],
    resolvers: [
      ElementPlusResolver()
    ],
  });
}
