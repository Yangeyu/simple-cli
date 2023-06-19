import { TRspMessage } from '@/api/question-answer/types'
import { Socket } from './wss'

/**
 * A function that creates a heartbeat mechanism for WebSocket connections
 * @param options An object containing optional parameters
 *  - interval The interval time in milliseconds for sending heartbeat packets.
 *      Defaults to 10 seconds.
 *  - hbPacket The heartbeat packet to send. Defaults to 'ping'.
 *  - dropMax: The maximum number of consecutive packet drops allowed. Defaults to 6.
 * @returns An object with a single method, `inject`,
 *   which should be called with a WebSocket instance to start the heartbeat mechanism.
 */
export const useHeartBeat = (
  options: {
    interval?: number,
    hbPacket?: any,
    dropMax?: number,
    sendHeartBeat?: (socket?: Socket) => unknown
  } = {}) => {

  const {
    interval = 10 * 1000,
    hbPacket = 'ping',
    dropMax = 6,
    sendHeartBeat = (socket: Socket) => socket.send(hbPacket),
  } = options

  let timer: any = null

  let dropCount = dropMax

  const resetDropCount = () => dropCount = dropMax

  const clearTimer = () => {
    if (!timer) return
    clearTimeout(timer)
    timer = null
  }

  /**
   * Starts the heartbeat mechanism for the given WebSocket connection
   * @param socket The WebSocket instance to use
   */
  const start = (socket: Socket) => {
    clearTimer()
    if (dropCount-- <= 0) { return socket.$emit('heartbeat-reconnect' as any) }
    sendHeartBeat(socket)
    timer = setTimeout(() => start(socket), interval)
  }

  /**
   * Injects the heartbeat mechanism into the given WebSocket instance
   * @param socket The WebSocket instance to use
   */
  const inject = (socket: Socket) => {
    socket.addEventListener('open', () => {
      resetDropCount()
      start(socket)
    })

    socket.addEventListener('close', () => {
      clearTimer()
    })

    socket.addEventListener('message', (ev: MessageEvent) => {
      const data = JSON.parse(ev.data) as TRspMessage
      if (data.header.messageType === 'keepAlive') { resetDropCount() }
    })
  }

  return {
    inject,
  }
}
