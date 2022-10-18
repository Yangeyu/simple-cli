/*
 * @Overview     : Do not edit
 * @Author       : Zi Jun
 * @Email        : zijun2030@163.com
 * @Date         : 2021-12-04 14:25:59
 * @LastEditTime : 2021-12-04 21:20:44
 * @LastEditors  : Zi Jun
 */

import { router } from '@/router';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IAxiosHooks } from './types';
import { IRequestExtraOptions } from './types';
import { RequestEnum } from '@/utils/enums';
import { AxiosCanceler } from './cancel';
import { handleError, IGNORE_CODE, networkError } from './error';

const axiosCanceler = new AxiosCanceler();
const { axios: { successCode } } = $config;

export class AxiosHooks implements IAxiosHooks {
  // 额外配置参数(已合并)
  mergedExtraOptions: IRequestExtraOptions = {};

  /**
   * @description: // 请求之前，请求参数拦截
   * @param {AxiosRequestConfig} config 单个API传入的请求配置项
   * @param {AxiosRequestConfig} defaultConfig 自定义默认的请求配置项
   * @param {IRequestExtraOptions} defaultExtraOptions 单个API传入的额外配置项
   * @param {IRequestExtraOptions} extraOptions 自定义默认的额外配置项
   * @return {AxiosRequestConfig} 合并的axios请求配置项
   */
  beforeRequestHook(
    config: AxiosRequestConfig,
    defaultConfig: AxiosRequestConfig,
    defaultExtraOptions: IRequestExtraOptions,
    extraOptions?: IRequestExtraOptions
  ): AxiosRequestConfig {
    // 合并请求配置
    const mergeConfig = Object.assign(defaultConfig, config);
    this.mergedExtraOptions = Object.assign(defaultExtraOptions, extraOptions);
    return mergeConfig;
  }

  /**
   * @description: 请求拦截
   * @param {AxiosRequestConfig} config 请求配置
   * @return {*}
   */
  requestInterceptorHook(config: AxiosRequestConfig): AxiosRequestConfig {
    const { isIgnoreCancelToken } = this.mergedExtraOptions;

    // 请求防抖处理
    !isIgnoreCancelToken && axiosCanceler.addPending(config);

    // Get/Post请求Params/data兼容书写处理
    if (
      config.method &&
      [RequestEnum.GET]
        .includes(config.method.toLocaleUpperCase() as RequestEnum)
    ) {
      config.params = config.params ?? config.data;
      delete config.data;
    } else if (
      config.method &&
      config.method.toLocaleUpperCase() === RequestEnum.POST
    ) {
      config.data = config.data ?? config.params;
      delete config.params;
    }

    const requireAuth = router.currentRoute.value?.meta?.requireAuth || true;
    if (requireAuth) {
      config.headers || (config.headers = {});
    }

    return config;
  }

  /**
   * @description: 响应成功后，数据拦截
   * @param {AxiosResponse} res 响应数据
   * @return {*}
   */
  responseInterceptorHook(res: AxiosResponse): any {
    const { isHandleResponseResult } = this.mergedExtraOptions;
    // 请求防抖处理
    const { config } = res;
    config && axiosCanceler.removePending(config);

    // 响应数据结构处理

    if (isHandleResponseResult) {
      // status为200,返回数据处理,以下为针对性数据处理
      const { data: { code, msg } } = res;
      if (successCode.includes(code) || IGNORE_CODE.includes(code)) return res.data;
      else {
        // 错误码处理
        handleError(res.data)
        return Promise.reject(res.data);
      }
    } else {
      return res.data;
    }
  }

  responseCatchErrorHook(error: any): any {
    console.log({ error });

    if (axios.isCancel(error)) {
      // console.log('.....')
      return Promise.reject(error)
    }
    if (error.response) {
      const { status } = error.response;
      const hasHandled = handleError({ code: status })
      !hasHandled && networkError(error.message);
    } else {
      networkError(error.message);
    }
    return Promise.reject(error);
  }
}
