import type { Plugin } from 'vite';
import components from 'unplugin-vue-components/vite';
import { VantResolver } from 'unplugin-vue-components/resolvers'
import IconResolver from 'unplugin-icons/resolver'


export default function createComponents(): Plugin {
  return components({
    dts: true,
    dirs: ['src/components', 'src/layouts'],
    resolvers: [
      VantResolver(),
      IconResolver({
        customCollections: ['custom']
      })
    ],
  });
}
