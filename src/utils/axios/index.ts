import { AxiosRequestConfig } from 'axios';
import { Axios } from './axios';
import { ContentTypeEnum } from './enums';

const { baseApiUrl } = $config;
const { VITE_API_URL } = import.meta.env;
const { timeout } = $config.axios;

/**
 * @description: axios的默认配置
 * @return {*}
 */
const defaultConfig = (): AxiosRequestConfig => {
  const baseURL = baseApiUrl || VITE_API_URL;

  const headers = {
    'Content-Type': ContentTypeEnum.RAW,
  };
  console.log(baseURL);
  return { baseURL, headers };
};


const { baseURL, headers } = defaultConfig();

/**
 * @description: 提供对外方法，API中使用
 * @param {*}
 * @return {*}
 */
export const http = new Axios({
  baseURL,
  headers,
  timeout,
  extraOptions: {
    isEnableCancelToken: true,
    isHandleResponseResult: true,
  },
});


