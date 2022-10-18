/*
 * @Overview     : Do not edit
 * @Author       : Zi Jun
 * @Email        : zijun2030@163.com
 * @Date         : 2021-12-04 14:25:59
 * @LastEditTime : 2021-12-04 21:21:48
 * @LastEditors  : Zi Jun
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IRequestConfig, IExtraOptions } from './types';
import { AxiosHooks } from './hooks';
import { deepClone } from '../common/utils';
const axiosHooks = new AxiosHooks();

export class Axios {
  private axios: AxiosInstance;
  private readonly options: IRequestConfig;

  constructor(options: IRequestConfig) {
    this.options = options;
    this.axios = axios.create(options);
    this.setupHooks();
  }

  private setupHooks(): void {
    /* axios原生拦截处理 */
    const { request, response } = this.axios.interceptors;
    // axios原生请求拦截
    request.use(
      (config: AxiosRequestConfig): AxiosRequestConfig => {
        if (axiosHooks.requestInterceptorHook) {
          return axiosHooks.requestInterceptorHook(config);
        } else {
          return config;
        }
      },
      (error: Error) => {
        return Promise.reject(error);
      }
    );
    // axios原生相应拦截
    response.use(
      (res: AxiosResponse): AxiosResponse => {
        if (axiosHooks.responseInterceptorHook) {
          return axiosHooks.responseInterceptorHook(res);
        } else {
          return res;
        }
      },
      (error: Error) => {
        if (axiosHooks.responseCatchErrorHook) {
          return axiosHooks.responseCatchErrorHook(error);
        }
      }
    );
  }

  public request<T = any>(
    config: AxiosRequestConfig,
    extraOptions?: IExtraOptions
  ): Promise<T> {
    const { defaultExtraOptions } = this.options;
    const originalOptions = deepClone(this.options);
    // if (originalOptions.defaultExtraOptions) { delete originalOptions.defaultExtraOptions; }
    axiosHooks.beforeRequestHook &&
      axiosHooks.beforeRequestHook(
        config,
        originalOptions,
        defaultExtraOptions,
        extraOptions
      );
    return new Promise<T>((resolve, reject) => {
      this.axios
        .request(config)
        .then(res => {
          resolve(res as unknown as Promise<T>);
        })
        .catch((err: Error) => {
          reject(err);
        });
    });
  }
}
