import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { Method } from './enums';
import { CUS_ERROR_CODE_HANDLER, ERROR_CODE_HANDLER, networkError } from './error';
import { EAxiosRequestConfig } from './types';
import { HttpCanceler } from './cancel';

const { axios: { successCode } } = $config;

/* **************************   Request Interceptors   ******************************* */

/**
 * @description Request interceptor for Axios.
 * @param config The configuration for the request.
 * @returns The updated configuration object after passing through all the interceptors.
 */
export const requestInterceptor = (config: InternalAxiosRequestConfig & EAxiosRequestConfig) => {
  const { meta } = config

  const chain: ((config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig)[] = []
  // Get/Post请求Params/data兼容书写处理
  chain.push(methodCompatibility)

  // 是否 cancel 连续的重复请求
  if (meta?.isIgnoreCancelToken) chain.push(enableCancel)

  return chain.reduce((prev, interceptor) => interceptor(prev), config)
}

export const requestCatchInterceptor = (err: AxiosError) => Promise.reject(err)

// Get/Post请求Params/data兼容书写处理
const methodCompatibility = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  const { method } = config

  if (method && method.toLowerCase() === Method.GET) {
    config.params = config.params ?? config.data;
    delete config.data;
  }
  if (method && method.toLowerCase() === Method.POST) {
    config.data = config.data ?? config.params;
    delete config.params;
  }

  return config
}

// 将给定的请求配置添加到挂起请求列表中以启用取消。
const enableCancel = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config = HttpCanceler.addPending(config)
  return config
}

/* **************************   Response Interceptors   ******************************* */

/**
 * @description Response interceptor
 * @param rsp - The response object returned by Axios.
 * @returns The data from the response if there are no error codes, else it throws an error.
 */
export const responseInterceptor = (rsp: AxiosResponse & { config: EAxiosRequestConfig }) => {
  const { data: { code, message }, config: { meta } } = rsp
  if (!meta?.isHandleResponseResult) return rsp

  if (!code || successCode.includes(code)) return rsp.data
  const defaultToast = (msg: string) => {
    const pattern = /[\u4e00-\u9fa5]/
    // 判断是否为中文
    msg = pattern.test(msg) ? msg : '出错了，请稍后重新'
    $message.error(msg)
  }

  // 业务错误码处理
  const errorHandler = CUS_ERROR_CODE_HANDLER[code]
    ? CUS_ERROR_CODE_HANDLER[code]
    : () => defaultToast(message)
  errorHandler()

  return Promise.reject(rsp.data)
}

/**
 * Intercept and handle errors in Axios responses.
 * @param err - The AxiosError object containing information about the error.
 * @returns A rejected Promise with the same error object if there is an Axios response error
 */
export const responseCatchInterceptor = (err: AxiosError): Promise<AxiosError> => {
  // Skip canceled error
  if (axios.isCancel(err) as any) { return Promise.reject(err) }

  // Gateway status code handling
  if (err.response) {
    const { status } = err.response
    const errorHanler = ERROR_CODE_HANDLER[status]
    errorHanler && errorHanler()
    return Promise.reject(err)
  }

  // Network error handling
  networkError(err.message)
  return Promise.reject(err)
}

