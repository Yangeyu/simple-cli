import { Plugin, PluginOption } from 'vite';
import vue from '@vitejs/plugin-vue'
import createAutoImport from './plugins/auto-import';
import createHtml from './plugins/html';
import { IViteEnv } from './types';
import createComponents from './plugins/components';
import createCompression from './plugins/compression';
import createLegacy from './plugins/legacy';
import { createUnpluginIcons } from './plugins/unplugin-icons';
import UnoCSS from 'unocss/vite'

export default function loadVitePlugins(viteEnv: IViteEnv, isBuild = false){
  const plugins: PluginOption[] = []

  plugins.push(vue())
  plugins.push(createAutoImport())
  plugins.push(createHtml(viteEnv, isBuild) as Plugin)
  plugins.push(createComponents())
  plugins.push(createUnpluginIcons())
  plugins.push(UnoCSS())
  isBuild && plugins.push(...createCompression(viteEnv))
  isBuild && plugins.push(...createLegacy(viteEnv))
  return plugins
}

/**
 * @description: 转换env文件（字符串转为应为类型）
 * @param {any} envConfig
 * @return {IViteEnv}
 */
export const convertEnv = (envConfig: any): IViteEnv => {
  const resEnvConfig: any = {};
  for (const envName of Object.keys(envConfig)) {
    let realName = envConfig[envName].replace(/\\n/g, '\n');
    // 布尔型转换
    realName =
      realName === 'true' ? true : realName === 'false' ? false : realName;
    // 数值型
    envName === 'VITE_PORT' && (realName = Number.parseInt(realName));
    // 数组 => string
    // envName === 'VITE_API_URL' && (realName = JSON.parse(realName.replace(/'/g, '"')));
    resEnvConfig[envName] = realName;
  }
  return resEnvConfig;
};
