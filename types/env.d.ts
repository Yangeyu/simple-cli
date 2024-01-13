declare interface Window {
  $config: any
  $message: import('element-plus').Message
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const $config: any

declare const $message: Message


