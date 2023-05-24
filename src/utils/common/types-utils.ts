// 判断union类型
export type isUnion<T, Copy = T> = T extends Copy
  ? [Copy] extends [T] ? false : true : never

// 展开union变量
export type UnionVarToUnion<U> = (U extends unknown ? (k: U) => void : never) extends infer F
  ? F extends (k: infer I) => void
  ? I
  : never
  : never

// 展开类型变量
export type Spread<T> = isUnion<T> extends true
  ? UnionVarToUnion<T>
  : T extends Function ? T : T extends object
  ? { [K in keyof T]: Spread<T[K]> }
  : T

// 获取对象值的uinio
export type GetV<T> = T[keyof T]


type Merge<T> = {
  [key in keyof T]: T[key]
}

export type PartialByKeys<T, K = any> = Merge<{
  [key in Exclude<keyof T, K>]: T[key]
} & {
  [key in Extract<keyof T, K>]?: T[key]
}>

export type RequiredByKeys<T, K extends keyof T = keyof T> = Merge<Omit<T, K> & Required<Pick<T, K>>>
