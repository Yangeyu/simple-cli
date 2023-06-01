import type { Plugin } from 'vite'
import Icons from 'unplugin-icons/vite'
import { FileSystemIconLoader } from 'unplugin-icons/loaders'

export function createUnpluginIcons (): Plugin  {
  return Icons({
    compiler: 'vue3',
    autoInstall: true,
    customCollections: {
      cus: FileSystemIconLoader('src/assets/icons'),
    },
    iconCustomizer(collection, icon, props) {
      const name = `${collection}:${icon}`
      if (collection === 'cus') {
        props.width = '4em'
        props.height = '4em'
        props.color = 'skyblue'
      }
    }
  }) as Plugin
}
