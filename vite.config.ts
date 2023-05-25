import { defineConfig, ConfigEnv, loadEnv } from 'vite'
import { resolve } from 'path'
import loadVitePlugins, { convertEnv } from './vites'
import { IViteEnv } from './vites/types'

// https://vitejs.dev/config/
const envPath = resolve('vites/env')

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
    envPath,
    plugins: loadVitePlugins(viteEnv, isBuild),
    server: {
      open: false,
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
