declare interface Window {
  $config: any
  $message: any
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const $config: any
declare const $message: any
