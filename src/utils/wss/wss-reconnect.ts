import { getWebSocketHosts } from '@/api/question-answer'
import { Socket } from './wss'
import { print } from './wss-print'


export const useReconnect = (
  options: {
    interval?: number,
    retryCount?: number
  } = {}
) => {
  const { interval = 5000, retryCount = 5 } = options
  let timer: any = null
  let isStarted = false
  let resumSocket: any = null

  const clearTimer = () => {
    if (!timer) return
    clearTimeout(timer)
    timer = null
  }

  /**
   * Stop the timer and set isStarted flag to false.
   * @returns void
   */
  const stop = (): void => {
    clearTimer()
    isStarted = false
  }

  /**
   * Enable WebSocket reconnection
   * 1. First request server address list through getWebSocketHosts
   * 2. Then try to connect to servers one by one through numerical remainder
   */
  const start = async (socket: Socket) => {
    // If reconnection has already been enabled, it will not be enabled again
    if (isStarted) return
    isStarted = true
    let curCount = 1
    let hosts: string[] | null = null

    const retry = async () => {
      clearTimer()

      hosts = hosts || await getHosts().catch(() => {
        startNext()
        return Promise.reject() as Promise<any[]>
      })

      if (hosts.length === 0) {
        return print.error('[Socket(Reconnect) - ERROR] - No servers available to reconnect')
      }

      const len = hosts.length
      const index = curCount % len
      const host = hosts[index]

      print.tip(`[Socket(Reconnect) - RUNNING] - 目标服务器: ${host}`)
      const url = socket.raw.url.replace(/ws.*?(?=\?)/, `${host}`)
      socket.resetSocket(url)
      startNext()
    }

    const getHosts = async () => {
      const rsp = await getWebSocketHosts()
      const { data: { host_list } } = rsp
      return host_list || []
    }

    const startNext = () => {
      curCount++
      if (curCount > retryCount) {
        socket.$emit('break')
        socket.$setLinkState('break')
        return print.error('[Socket(Reconnect) - ERROR] - Maximum reconnection attempts reached');
      }
      timer = setTimeout(retry, interval)
    }

    timer = setTimeout(retry, 0)
  }

  /**
   * 监听系统网络恢复，执行 socket 链接恢复.
   * @returns void
   */
  const onOnline = () => {
    resumSocket && resumSocket()
  }

  /**
   * Attaches event listeners to the provided WebSocket object to automatically reconnect to the server
   * when an error occurs or the connection is lost unexpectedly.
   * @param socket - The WebSocket object to attach listeners to.
   * @returns Void.
   * @throws Nothing.
   */
  const inject = (socket: Socket): void => {

    window.addEventListener('online', onOnline)
    resumSocket = () => {
      if (socket.socketState === 'break') {
        print('websocket 恢复链接啦')
        socket.resetSocket(socket.raw.url)
        socket.$setLinkState('live')
      }
    }

    socket.addEventListener('error', () => {
      print.error(`[Socket(reconnect - listener)] -> <readyState - ${socket.raw.readyState}>`)
      // if (socket.raw.readyState === ReadyState.CONNECTING) {
      //   start(socket);
      // }
    });

    socket.addEventListener('close', (ev: CloseEvent) => {
      // close 事件回复状态异常触发重连
      if (!ev.wasClean) { start(socket); }
    });

    socket.addEventListener('heartbeat-reconnect' as any, () => {
      // 监听心跳异常，启动重连
      start(socket)
    })

    socket.addEventListener('open', () => {
      // 成功建立连接时停止重连
      stop();
    });

    socket.addEventListener('destroy', () => {
      // socket 被主动销毁时停止重连
      stop();
      window.removeEventListener('online', onOnline)
    });
  };

  return {
    inject,
  }
}


