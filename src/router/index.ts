import { App } from 'vue'
import {
  createRouter, createWebHashHistory,
  RouteLocationNormalized, RouteLocationNormalizedLoaded,
  Router, RouteRecordRaw,
} from 'vue-router'
import { routerBefore } from './router-before'

// 自动导入modules目录下的路由
const moduleRoutes: RouteRecordRaw[] = []
const allModules: { [k: string]: any } = import.meta.glob('./modules/*.ts', { eager: true })
Object.keys(allModules).forEach(name => {
  if (name.includes('_')) return
  moduleRoutes.push(...allModules[name].default)
})

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: {
      path: '/demo',
    },
  },
  ...moduleRoutes,
]

export const router: Router = createRouter({
  routes,
  history: createWebHashHistory(),
  strict: true,
  scrollBehavior(
    to: RouteLocationNormalized,
    _from: RouteLocationNormalizedLoaded,
    savedPosition
  ) {
    if (savedPosition) {
      return savedPosition;
    } else if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth',
      };
    } else {
      return { top: 0 };
    }
  },
})


export const setupRouter = (app: App) => {
  app.use(router)
  routerBefore(router)
}