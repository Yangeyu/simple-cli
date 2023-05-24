import { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios';

// 用于存储每个请求的标识
const pendingMap = new Map<string, AbortController>()

export const HttpCanceler = {

  /**
   * @description: 获取
   * @param {AxiosRequestConfig} config 请求参数
   */
  genPendingKey(config: AxiosRequestConfig) {
    const bodyStr = JSON.stringify(config.data ?? config.params ?? {})
    return [config.method, config.url, bodyStr].join('&')
  },

  /**
   * @description: 添加请求
   * @param {AxiosRequestConfig} config
   */
  addPending(config: InternalAxiosRequestConfig): InternalAxiosRequestConfig {
    this.removePending(config)

    const key = this.genPendingKey(config)
    const controller = new AbortController()
    config.signal = controller.signal
    pendingMap.set(key, controller)
    return config
  },

  /**
   * @description: 移除请求
   * @param {AxiosRequestConfig} config
   */
  removePending(config: AxiosRequestConfig) {
    const key = this.genPendingKey(config)
    const controller = pendingMap.get(key)
    controller?.abort()
    pendingMap.delete(key)
  },

  /**
   * @description: 清空请求
   */
  removeAllPending() {
    pendingMap.forEach(controller => { controller.abort() })
    pendingMap.clear()
  },

}





