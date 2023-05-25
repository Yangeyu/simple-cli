declare type MessageType = 'success' | 'info' | 'error' | 'warning'
declare type MessageOptions = {
  message: string,
  grouping?: boolean,
  type?: MessageType,
  [k: string]: any
}
declare type MessageParamsWithType = Omit<MessageOptions, 'type'> | MessageOptions['message']
declare type MessageFn = {
  (options?: MessageOptions): void;
  closeAll(type?: messageType): void;
}
declare type MessageTypedFn = (options?: MessageParamsWithType) => void

declare interface Message extends MessageFn {
  success: MessageTypedFn;
  warning: MessageTypedFn;
  info: MessageTypedFn;
  error: MessageTypedFn;
}

declare interface Window {
  $config: any
  $message: Message
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare const $config: any

declare const $message: Message


