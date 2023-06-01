import { AxiosRequestConfig, CreateAxiosDefaults, InternalAxiosRequestConfig } from 'axios';

export interface EAxiosOptions extends CreateAxiosDefaults {
  extraOptions?: IExtraOptions
}

export interface EAxiosRequestConfig extends AxiosRequestConfig {
  meta?: IExtraOptions 
}

export interface IExtraOptions {
  // 是否隐藏接口请求loading效果
  isHideRequestLoading?: boolean;
  // 是否取消重复请求
  isEnableCancelToken?: boolean;
  // 是否处理相应结果
  isHandleResponseResult?: boolean;
  // 请求失败重试
  retry?: number
}
