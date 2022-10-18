import { defineConfig, ConfigEnv, loadEnv } from 'vite'
import { resolve } from 'path'
import loadVitePlugins, { convertEnv } from './vite'
import { IViteEnv } from './vite/types'

// https://vitejs.dev/config/
const envPath = resolve('vite/env')

export default defineConfig(({ command, mode }: ConfigEnv) => {
  const viteEnv: IViteEnv = convertEnv(loadEnv(mode, envPath))
  const isBuild = command === 'build'
  const { VITE_IS_DROP } = viteEnv

  return {
    base: '/',
    resolve: {
      alias: [
        {
          find: /@\//,
          replacement: resolve('src') + '/',
        },
      ],
    },
    plugins: loadVitePlugins(viteEnv, isBuild),
    server: {
      open: true,
      host: '0.0.0.0',
    },
    build: {
      outDir: 'dist',
      minify: 'esbuild',
      chunkSizeWarningLimit: 500,
      reportCompressedSize: false,
    },
    esbuild: {
      drop: VITE_IS_DROP ? ['console', 'debugger'] : undefined,
    },
  }
})
