/*
 * @Overview     : Do not edit
 * @Author       : Zi Jun
 * @Email        : zijun2030@163.com
 * @Date         : 2021-12-04 14:25:59
 * @LastEditTime : 2021-12-04 21:20:37
 * @LastEditors  : Zi Jun
 */

import { AxiosRequestConfig } from 'axios';
import { Axios } from './axios';
import { ContentTypeEnum } from '@/utils/enums';


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
    // 'Authorization': '0e54940221bf4fdc8a4e735d3da26468',
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
export const fetchAxios = new Axios({
  baseURL,
  headers,
  timeout,
  defaultExtraOptions: {
    isHideRequestLoading: true,
    isIgnoreCancelToken: false,
    isHandleResponseResult: true,
    loadingText: '加载中',
  },
});
