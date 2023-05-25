import type { Plugin } from 'vite';
import compression from 'vite-plugin-compression2';
import { IViteEnv } from '../types';

export default function createCompression(env: IViteEnv): Plugin[] {
  const { VITE_BUILD_COMPRESS, VITE_BUILD_DELETE_ORIGIN_FILE } = env;
  const compressList: string[] = VITE_BUILD_COMPRESS && VITE_BUILD_COMPRESS.split(',') || [];
  const plugin: Plugin | Plugin[] = [];
  if (compressList.includes('gzip')) {
    plugin.push(
      compression({
        deleteOriginalAssets: VITE_BUILD_DELETE_ORIGIN_FILE,
      })
    );
  }
  if (compressList.includes('brotli')) {
    plugin.push(
      compression({
        algorithm: 'brotliCompress',
        deleteOriginalAssets: VITE_BUILD_DELETE_ORIGIN_FILE,
      })
    );
  }
  return plugin;
}
