/// <reference types="vitest" />
import { ConfigEnv, defineConfig } from "vite";

export default defineConfig(({ command, mode }: ConfigEnv) => {
  console.log(command, mode);
  
  return {
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
