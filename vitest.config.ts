/// <reference types="vitest" />
import { ConfigEnv, defineConfig } from "vite";
import { resolve } from 'path'

export default defineConfig(({ command, mode }: ConfigEnv) => {
  console.log(command, mode);
  
  return {
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: resolve('src') + '/',
        },
      ],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      deps: { },
      threads: false,
      environmentOptions: {
        jsdom: {
          resources: 'usable'
        }
      }
    }
  }
})
