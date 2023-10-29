import { Spread } from '../common/types-utils'
import { print } from './wss-print'

export type TypeMiddleWare = {
  inject: (socket: Socket) => void
  [k: string]: any
}
/** 
  * @type message | close | 'open' | 'error': 与原生事件一致
  * @type break: 断网重连次数达到最大时，不再进行重连，触发break事件
  * @tyoe destroy: 手动调用 destrory 方法，销毁所有监听事件，触发destroy回调
  */
export type EventName = 'message' | 'close' | 'open' | 'error' | 'break' | 'destroy'
export enum ReadyState {
  CONNECTING = 0,
  OPEN = 1,
  CLOSING = 2,
  CLOSED = 3,
}
export type LinkType = 'live' | 'pause' | 'break' | 'destroy'


export class Socket {
  private ws: WebSocket
  private eventMap = new Map<EventName, Set<(ev: any) => void>>()
  private sendQue: (() => void)[] = []
  private middlewareSet: Set<TypeMiddleWare> = new Set()
  private linkType: LinkType = 'live'

  constructor(url: string) {
    this.ws = new WebSocket(url)
    this.initEventListener()
  }

  /**
   * Returns a readonly reference to the socket object.
   * @returns {Readonly<WebSocket>} A readonly reference to the socket object.
   */
  get raw(): Readonly<WebSocket> {
    return readonly(this.ws)
  }

  /**
   * Returns the socket state of the object.
   * @returns The current socket state.
   */
  get socketState() { return this.linkType }

  /**
   * Initializes the event listener for the WebSocket instance.
   * @returns {void}
   */
  private initEventListener = (): void => {
    this.ws.addEventListener('open', this.onOpen);
    this.ws.addEventListener('message', this.onMessage);
    this.ws.addEventListener('close', this.onClose);
    this.ws.addEventListener('error', this.onError);
  }

  /**
   * @description 监听 WebSocket - open 事件
   * @param ev - The event object
   */
  private onOpen = (ev: Event): void => {
    this.sendQue.forEach(send => send())
    this.sendQue = []

    print.info('[Socket(Event) -> open] ↓', ev)
    const evFns = this.eventMap.get('open')
    evFns?.forEach(fn => fn(ev))
  }

  /**
   * @description 监听 WebSocket - message 事件
   * @param ev - The message event object
   */
  private onMessage = (ev: MessageEvent): void => {
    // print.info('[Socket(Event) -> message] ↓', ev)
    const evFns = this.eventMap.get('message')
    evFns?.forEach(fn => fn(ev))
  }

  /**
   * @description 监听 WebSocket - close 事件
   * @param ev - The close event object
   */
  private onClose = (ev: CloseEvent): void => {
    print.stress('[Socket(Event) -> close] ↓', ev)
    const evFns = this.eventMap.get('close')
    evFns?.forEach(fn => fn(ev))

    if (this.linkType === 'destroy') this.emitDestroy()
  }

  /**
   * @description 监听 WebSocket - error 事件
   * @param ev - The error event object
   */
  private onError = (ev: Event): void => {
    print.error('[Socket(Event) -> error] ↓', ev)
    const evFns = this.eventMap.get('error')
    evFns?.forEach(fn => fn(ev))
  }

  /**
     * @description 发送 destroy 事件
     * @param ev The event data to be passed to the event listeners.
     */
  private emitDestroy = (ev: any = { type: 'destroy' }): void => {
    print.error('[Socket(Event) -> destroy] ↓', ev)
    const evFns = this.eventMap.get('destroy');
    evFns?.forEach(fn => fn(ev));
    this.sendQue = []
    this.clearAllEvents('all')
  }

  /**
   * @description 注入到实例的中间件
   * @middleware 中间件对象包含一个 inject 注入方法
   */
  public use = (middleware: Spread<TypeMiddleWare>) => {
    this.middlewareSet.add(middleware)
    middleware.inject(this)
    return this
  }

  /**
   * @description 重置 WebSocket 的连接
   * 断线重连时调用此方法
   */
  public resetSocket = (url: string): void => {
    this.ws = new WebSocket(url);
    this.initEventListener();
  }

  /**
   * Adds an event listener to the event map.
   * @param evName The event name to listen for.
   * @param cb The callback function to execute when the event occurs.
   */
  public addEventListener = (evName: Spread<EventName>, cb: (ev: any) => void): void => {
    const sets = this.eventMap.get(evName) || new Set()
    sets.add(cb)
    this.eventMap.set(evName, sets)
  }

  /**
   * Removes an event listener from the event map.
   * @param evName The event name to remove the listener from.
   * @param cb The callback function to remove.
   */
  public removeEventListener = (evName: Spread<EventName>, cb: (ev: any) => void): void => {
    const sets = this.eventMap.get(evName) || new Set()
    sets.delete(cb)
    this.eventMap.set(evName, sets)
  }

  /**
   * @description 触发事件回调
   * @param evname: 自定义事件名称
   * @param args: 传入的事件回调的参数
   */
  public $emit = (evName: string, ...args: any[]) => {
    const fns = this.eventMap.get(evName as any)
    // @ts-ignore
    fns?.forEach(fn => fn(...args))
  }

  /**
   * @description 由中间件设置链接状态
   * @param state: LinkType 
   */
  public $setLinkState = (state: LinkType) => {
    this.linkType = state
  }

  /**
   * @description 移除所有外部注册的事件回调
   * @param mode: 删除事件回调的模式
   * @param mode - all: 删除所有事件
   * @param mode - part: 保留 use 方法注入的事件
   */
  public clearAllEvents = (mode: 'all' | 'part' = 'part'): void => {
    this.eventMap.clear()

    if (mode === 'part') {
      this.middlewareSet.forEach(mid => { mid.inject(this) })
    }
  };

  /**
   * Sends data to the server using a WebSocket connection.
   * @param data - The data to send to the server.
   */
  public send = async (data: any): Promise<void> => {
    if (this.ws.readyState === ReadyState.CONNECTING) {
      print('[Socket - send] => <readyState - CONNECTING> ↓',)
      this.sendQue.push(() => this.ws.send(JSON.stringify(data)))
    }

    if (this.ws.readyState === ReadyState.OPEN) {
      // print('[Socket - send] => <readyState - OPEN> ↓', data)
      this.ws.send(JSON.stringify(data))
    }

    if (this.ws.readyState === ReadyState.CLOSING) {
      print('[Socket - send] => <readyState - CLOSING>')
    }

    if (this.ws.readyState === ReadyState.CLOSED) {
      print('[Socket - send] => <readyState - CLOSED>')
      this.sendQue.push(() => this.ws.send(JSON.stringify(data)))
    }
  }

  /**
   * @description 暂时关闭websocet链接, 触发close事件
   * 可调用resum方法恢复链接  
   */
  public pause = async () => {
    console.log('WebSocket Pause');

    this.$setLinkState('pause')
    this.ws.close()
  }

  /**
   * @description 恢复未被销毁的链接
   */
  public resume = () => {
    if (this.linkType === 'destroy') return
    console.log('WebSocket Resume')

    this.$setLinkState('live')
    this.resetSocket(this.raw.url)
  }

  /**
   * @description 销毁实例，确保在 WebSocket close 事件后执行 destroy 事件
   */
  public destroy = (): void => {
    this.$setLinkState('destroy')
    this.ws.close();
    if (this.ws.readyState === ReadyState.CLOSED) this.emitDestroy();
  }
}

