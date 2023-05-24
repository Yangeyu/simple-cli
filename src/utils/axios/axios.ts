import axios, { AxiosInstance } from 'axios';
import { EAxiosOptions, EAxiosRequestConfig, IExtraOptions } from './types';
import {
  requestCatchInterceptor, requestInterceptor,
  responseCatchInterceptor, responseInterceptor } from './interceptors';
import { Method } from './enums';

/**
 * Axios class for making HTTP requests using axios library with interceptors.
 */
export class Axios {
  private axios: AxiosInstance;
  private readonly options: EAxiosOptions;

  /**
   * Creates an instance of Axios.
   * @param options The options used to create the axios instance.
   */
  constructor(options: EAxiosOptions) {
    this.options = options
    this.axios = axios.create(options)
    this.setupHook()
  }

  /**
   * Sets up the interceptors for the axios instance.
   */
  private setupHook() {
    const { request, response } = this.axios.interceptors

    request.use(
      requestInterceptor,
      requestCatchInterceptor
    )

    response.use(
      responseInterceptor,
      responseCatchInterceptor
    )
  }

  /**
   * Makes a HTTP request using the axios instance.
   * @param config The configuration for the request.
   * @param extraOptions Optional extra options for the request.
   * @returns A promise that resolves to the response data.
   */
  public request<T = any>(
    config: EAxiosRequestConfig,
    extraOptions?: IExtraOptions
  ): Promise<T> {
    config.meta = Object.assign({}, this.options.extraOptions, extraOptions)
    return this.axios.request<T>(config) as Promise<T>
  }

  /**
   * Makes a POST request using the axios instance.
   * @param config The configuration for the request.
   * @param extraOptions Optional extra options for the request.
   * @returns A promise that resolves to the response data.
   */
  public post<T = any>(
    config: Omit<EAxiosRequestConfig, 'method'>,
    extraOptions?: IExtraOptions
  ): Promise<T> {
    return this.request<T>(
      {
        method: Method.POST,
        ...config,
      },
      extraOptions)
  }

  /**
   * Makes a GET request using the axios instance.
   * @param config The configuration for the request.
   * @param extraOptions Optional extra options for the request.
   * @returns A promise that resolves to the response data.
   */
  public get<T = any>(
    config: Omit<EAxiosRequestConfig, 'method'>,
    extraOptions?: IExtraOptions
  ): Promise<T> {
    return this.request<T>(
      {
        method: Method.GET,
        ...config,
      },
      extraOptions)
  }
}
