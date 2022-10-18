/*
 * @Overview     : Do not edit
 * @Author       : Zi Jun
 * @Email        : zijun2030@163.com
 * @Date         : 2021-12-04 14:25:59
 * @LastEditTime : 2021-12-04 21:20:11
 * @LastEditors  : Zi Jun
 */

import { AxiosRequestConfig, AxiosResponse } from 'axios';

/* 自定义的请求额外参数 */
export interface IRequestExtraOptions {
  // 是否隐藏接口请求loading效果
  isHideRequestLoading?: boolean;
  // 是否忽略重复请求
  isIgnoreCancelToken?: boolean;
  // 是否处理相应结果
  isHandleResponseResult?: boolean;
  // loading文字
  loadingText?: string;
}
export type IExtraOptions = IRequestExtraOptions | undefined;

/* 自定义创建Axios的参数 */
export interface IRequestConfig extends AxiosRequestConfig {
  // 请求额外参数
  defaultExtraOptions: IRequestExtraOptions;
}

export interface IAxiosHooks {
  // 额外的配置参数
  mergedExtraOptions: IRequestExtraOptions;
  // 请求之前，请求参数拦截
  beforeRequestHook?(
    config: AxiosRequestConfig,
    defaultConfig: AxiosRequestConfig,
    defaultExtraOptions: IRequestExtraOptions,
    extraOptions?: IRequestExtraOptions
  ): AxiosRequestConfig;
  // 请求成功后，数据拦截
  requestInterceptorHook?(config: AxiosRequestConfig): AxiosRequestConfig;
  // 响应成功后，数据拦截
  responseInterceptorHook?(res: AxiosResponse): any;
  // 响应错误，错误拦截
  responseCatchErrorHook?(err: Error): void;
}
