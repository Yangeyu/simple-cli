import { PluginOption } from 'vite';
import { createHtmlPlugin } from 'vite-plugin-html';
import pkg from '../../package.json';
import { IViteEnv } from '../types';

export default function createHtml(env: IViteEnv, isBuild: boolean): PluginOption | PluginOption[] {
  const { VITE_PUBLIC_URL } = env;
  const path: string = VITE_PUBLIC_URL?.endsWith('/')
    ? `${VITE_PUBLIC_URL}`
    : `${VITE_PUBLIC_URL}/`;
  const appConfigSrc =
    `${path || '/'}global.js?v=${pkg.version}-${new Date().getTime()}`;
  return createHtmlPlugin({
    inject: {
      data: {
        injectScript: `<script src="${appConfigSrc}"></script>`,
      },
    },
    minify: isBuild,
  });
}
