# 项目配置说明

## 项目技术栈

`Vue3` + `Vite` + `Pinia` + `Windi` + `TypeScript ` + `ElementPlus`

## `Axios - extraOptions` 

- `isEnableCancelToken`: 是否取消重复请求

- `isHandleResponseResult`: 是否开启处理响应结果
- `retry`: 请求失败重试

## 使用 `unplugin-icons` 自动导入icon

配置的参考文档：https://github.com/antfu/unplugin-icons

1. 使用 `iconfont`: `<i-[iconfont-name] />`

   - `iconfont` 在 `unplugin-icons` 配置的字符集为 `icon`

     ```html
     <i-icon-shipin />
     ```

   - 作为组件使用

     ```vue
     <template>
       <ShiPin />
     </template>
     
     <script>
     import ShiPin from '~icons/icon/shipin'
     </script>
     ```

2. 使用 `element-icons`

   ```html
   <i-ep-icon-name /> or <i-ep:icon-name />
   <!-- example: 导入 CirclePlus 图标 -->
   <i-ep-circle-plus /> or <i-ep:circle-plus /> or <i-ep:CirclePlus />
   ```

3. 使用 `iconfy` 图标，自动下载图标

   ```html
   <!-- 直接使用 logos:booqable-icon 图标，插件会检测并自动下载, 使用方式同上 -->
   <i-logos:booqable-icon />
   
   ```

4. 动态导入 `icon` : `~icons/{图标集}/{图标名称}`

   ```vue
   <template>
     <HelpFilled />
   </template>
   
   <script>
   import HelpFilled from '~icons/ep/HelpFilled'
   </script>
   ```

5. 配置本地`icon`目录

   - `src/assest/icons` 存放本地的 `icon` 

   - 项目文件中可以直接使用： `i-custom-icon-name` 使用本地图标

   - 配置文件: `vite/plugins/unplugin-icons.ts`

     ```js
     ......
     customCollections: {
       // 配置本地icon目录 - 设定字符集为 custom
       cus: FileSystemIconLoader('src/assets/icons'),
       icon: async (iconName) => {
         return `<i class="iconfont icon-${iconName}"></i>`
       }
     
     },
     
       iconCustomizer(collection, icon, props) {
         // 配置custome 的默认样式
         if (collection === 'cus') {
           props.width = '4em'
           props.height = '4em'
           props.color = 'skyblue'
         }
       }
     ......
       
     ```

6. 配置 `icon` 的解析

- 配置文件：`vite/plugins/components.ts` 

  ```js
  IconResolver({
    // 标签的前缀
    prefix: 'i',
    // 自定义集合
    customCollections: ['cus', 'icon']
  })
  
  ```


## `public/global.js` 

提供打包后的外部配置文件
