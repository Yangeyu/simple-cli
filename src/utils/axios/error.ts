import { router } from '@/router';

type ResData = {
  data?: any
  msg?: string
  code: number
}

// 网络错误类型
export enum NetworkErrorEnum {
  ERROR = 'Network Error',
  TIMEOUT = 'timeout',
}

/**
 *  弹窗提示
 * @param msg: 提示信息 
 * @returns (_: ResData): void
 */
const toastMsg = (msg: string) => (_: ResData) => $message.error(msg)

export const IGNORE_CODE: number[] = []

export const ERROR_CODE_HANDLER: { [k: string]: (data: ResData) => void } = {
  400: toastMsg('请求错误'),
  401: (_: ResData) => { $message.error('未授权，请登录') },
  403: toastMsg('拒绝访问'),
  404: toastMsg('请求地址出错'),
  408: toastMsg('请求超时'),
  500: toastMsg('服务器内部错误'),
  501: toastMsg('服务未实现'),
  502: toastMsg('网关错误'),
  503: toastMsg('服务不可用'),
  504: toastMsg('网关超时'),
  505: toastMsg('HTTP版本不受支持'),
}

// 错误码处理
export const handleError = (data: Spread<ResData>) => {
  const handler = ERROR_CODE_HANDLER[data.code]
  handler && handler(data)
  return !!handler
}

// 网络错误处理
export const networkError = (message: string): void => {
  let msg: string;
  if (!message) return
  if (message === NetworkErrorEnum.ERROR) {
    msg = '网络异常，请检查网络设置';
  } else if (message.includes(NetworkErrorEnum.TIMEOUT)) {
    msg = '网络异常，请检查网络设置';
  } else {
    msg = '请求失败';
  }
  console.log(msg);
  $message.error(msg);
};

// HTTP状态正常，接口定义的错误码处理
const handleLoginExpired = () => {
  $message.error('登录失效，请重新登录');
  // store.dispatch('user/logoutSave').then();
  router.replace('/login').then();
};
export const CUSTOM_CODE: any = (msg: string) => {
  return new Map([
    [1, { msg, action: handleLoginExpired }],
  ]);
};
