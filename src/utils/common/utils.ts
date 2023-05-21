import type { Spread } from './types-utils'
import { format } from 'date-fns'

export const deepClone = (target: any) => structuredClone(target)

/**
 * (bytes: number) => string
 * @description 字节换算
 * @param bytes 字节大小
 * @return 带单位带换算结果
 */
export const transBytes = (bytes: number) => {
  const UNIT = ['B', 'KB', 'MB', 'GB', 'TB']
  const MAX_THRESHOLD = Math.pow(1024, UNIT.length - 1)

  const formatter = (num: number, unit: string) => {
    const fixed_level = unit === UNIT[0] ? 0 : 2
    return num.toFixed(fixed_level) + ' ' + unit
  }

  const handler = (bytes: number, level = 0): string => {
    const threshold = Math.pow(1024, level)
    if (bytes >= MAX_THRESHOLD) return formatter(bytes / MAX_THRESHOLD, UNIT[UNIT.length - 1])
    if (bytes >= threshold * 1024) {
      return handler(bytes, level + 1)
    } else return formatter(bytes / threshold, UNIT[level])
  }

  if (!bytes) return formatter(0, UNIT[0])

  return handler(bytes)
}

/**
 * @description 时间转换
 * @param timestamp: number 
 * @param level: 1: YY-MM-DD HH:mm | 2: YY-MM-DD | 3: YY-MM-DD HH:mm:ss
 */
export const transDate = (timestamp: number, level = 1) => {
  const isMillisecond = (timestamp: any) => timestamp.toString().length === 13
  const sliceLastTowChar = (str: string) => str.slice(str.length - 2)

  if (!isMillisecond(timestamp)) timestamp = timestamp * 1000

  const d = new Date(timestamp)
  const year = d.getFullYear()
  const month = sliceLastTowChar(`0${d.getMonth() + 1}`)
  const date = sliceLastTowChar(`0${d.getDate()}`)
  const hours = sliceLastTowChar(`0${d.getHours()}`)
  const minutes = sliceLastTowChar(`0${d.getMinutes()}`)
  const seconds = sliceLastTowChar(`0${d.getSeconds()}`)

  if (level === 2) return year + '-' + month + '-' + date

  if (level === 3) {
    return year + '-' + month + '-' + date + ' '
      + hours + ':' + minutes + ':' + seconds
  }

  return year + '-' + month + '-' + date + ' ' + hours + ':' + minutes
}

/**
 * @description 异步等待
 * @param duration: 时长
 */
export const sleep = (duration: number) => {
  return new Promise(resovle => {
    setTimeout(() => {
      resovle('')
    }, duration)
  })
}

/**
 * @description Object.create 类型封装
 */
export const genObjectBy = <T extends object | null, V>(target: T, propsObject?: V): Spread<T & V> => {
  if (propsObject) return Object.assign(Object.create(target), propsObject)
  return Object.create(target)
}

/**
 * @description 格式化时间戳
 * @description yyyy | MM | dd | HH | mm | ss
 */
export const formatSecOrMsec = (timestamp: number, target: string) => {
  if (timestamp.toString().length === 10) timestamp = timestamp * 1000
  return format(timestamp, target)
}

/**
 * @description 错误处理封装
 */
export const useErrorHanlding = () => {
  let defaultHandler: any = (e: any) => {
    console.error('withErrorHandler:', e);
  }

  const withErrorHandler = async <T extends (...args: any[]) => any>(cb: T, args: Parameters<T> | [] = [], cusHandleError?: (e: any) => void) => {
    const handleError = cusHandleError
      ? cusHandleError
      : defaultHandler

    try {
      return await cb(...args)
    } catch (e) {
      handleError(e)
    }
  }

  const registerErrorHanlder = (fn: Function) => {
    defaultHandler = fn
  }

  return {
    withErrorHandler,
    registerErrorHanlder,
  }
}

