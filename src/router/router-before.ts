import { RouteLocationNormalized, RouteLocationNormalizedLoaded, Router } from 'vue-router'

export const routerBefore = (router: Router) => {
  router.beforeEach(
    async (to: RouteLocationNormalized, _from: RouteLocationNormalizedLoaded, next) => {
      next()
    })
}