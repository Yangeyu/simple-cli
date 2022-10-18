import axios, { Canceler, AxiosRequestConfig } from 'axios';

// 用于存储每个请求的标识
export let pendingMap = new Map<string, Canceler>();

export class AxiosCanceler {
  /**
   * @description: 获取
   * @param {AxiosRequestConfig} config 请求参数
   * @return {*}
   */
  private static getPendingUrl(config: AxiosRequestConfig): string {
    return [config.method, config.url].join('&');
  }

  /**
   * @description: 添加请求
   * @param {AxiosRequestConfig} config
   * @return {*}
   */
  public addPending(config: AxiosRequestConfig): void {
    this.removePending(config);
    const url = AxiosCanceler.getPendingUrl(config);
    config.cancelToken =
      config.cancelToken ??
      new axios.CancelToken(cancel => {
        // 如果pendingMap中不存在当前请求，则添加进入
        if (!pendingMap.has(url)) {
          pendingMap.set(url, cancel);
        }
      });
  }

  /**
   * @description: 移除请求
   * @param {AxiosRequestConfig} config
   */
  public removePending(config: AxiosRequestConfig): void {
    const url = AxiosCanceler.getPendingUrl(config);
    if (pendingMap.has(url)) {
      const cancel = pendingMap.get(url);
      cancel && cancel(url);
      pendingMap.delete(url);
    }
  }

  /**
   * @description: 清空请求
   */
  public removeAllPending(): void {
    pendingMap.forEach(cancel => {
      cancel && cancel();
    });
    pendingMap.clear();
  }

  /**
   * @description: 重置pendingMap
   */
  public reset(): void {
    pendingMap = new Map<string, Canceler>();
  }
}
