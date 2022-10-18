/*
 * @Overview     : Do not edit
 * @Author       : Zi Jun
 * @Email        : zijun2030@163.com
 * @Date         : 2021-12-04 14:25:59
 * @LastEditTime : 2021-12-04 21:19:33
 * @LastEditors  : Zi Jun
 */

/* ********************** app setting ************************ */

// 存储类型
export enum StorageType {
  COOKIE = 'cookie',
  SESSION_STORAGE = 'sessionStorage',
  LOCAL_STORAGE = 'localStorage',
}

/* ********************** axios ************************ */

// 请求方法
export enum RequestEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH',
}

// 网络错误类型
export enum NetworkErrorEnum {
  ERROR = 'Network Error',
  TIMEOUT = 'timeout',
}

// 请求Content类型
export enum ContentTypeEnum {
  JSON = 'application/json;charset=UTF-8',
  FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
  RAW = 'application/json;charset=UTF-8',
  FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
// Okr状态
export enum StateEnum {
  normal = 1,
  risk = 2,
  delay = 3,
  terminate = 4,
}
