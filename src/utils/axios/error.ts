import { HttpCanceler } from './cancel';

type ResData = {
  data?: any
  msg?: string
  code: number
}

/**
 * Displays an error toast message.
 * @param msg The error message to display
 */
const toastError = (msg: string): void => $message.error(msg);

// 网络错误类型
export enum NetworkErrorEnum {
  ERROR = 'Network Error',
  TIMEOUT = 'timeout',
}

export const IGNORE_CODE: number[] = []

// 网关层错误码
export const ERROR_CODE_HANDLER: Record<string, (data?: ResData) => any> = {
  400: () => toastError('请求错误'),
  401: handleTokenExpired,
  403: () => toastError('拒绝访问'),
  404: () => toastError('请求地址出错'),
  408: () => toastError('请求超时'),
  500: () => toastError('服务器内部错误'),
  501: () => toastError('服务未实现'),
  502: () => toastError('网关错误'),
  503: () => toastError('服务不可用'),
  504: () => toastError('网关超时'),
  505: () => toastError('HTTP版本不受支持'),
}

// 业务层错误码
export const CUS_ERROR_CODE_HANDLER: Record<string, (data?: ResData) => any> = {
  '-10002': handleTokenExpired,
}

// 网络错误处理
export const networkError = (message: string): void => {
  let msg: string;
  if (!message) return
  if (message === NetworkErrorEnum.ERROR) {
    msg = '网络异常，请检查网络设置';
  } else if (message.includes(NetworkErrorEnum.TIMEOUT)) {
    msg = '网络请求超时，请检查网络设置';
  } else {
    msg = '网络摆烂了，请稍后重试';
  }
  toastError(msg);
};


function handleTokenExpired() {
  toastError('登录已失效，请重新登录')
  HttpCanceler.removeAllPending()
}

