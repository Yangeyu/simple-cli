import { Socket, TypeMiddleWare } from './wss'
import { useHeartBeat } from './wss-heartbeat'
import { useReconnect } from './wss-reconnect'

export const useWebSocket = (url: string, options: {
  heartbeatController?: TypeMiddleWare,
  reconnectController?: TypeMiddleWare
}) => {

  const {
    heartbeatController = useHeartBeat(),
    reconnectController = useReconnect(),
  } = options

  const ws = new Socket(url)
  ws.use(heartbeatController)
  ws.use(reconnectController)
  
  return ws
}
