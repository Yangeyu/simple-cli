import { Plugin } from 'vite';
import vue from '@vitejs/plugin-vue'
import createAutoImport from './plugins/auto-import';
import WindiCSS from 'vite-plugin-windicss'
import createHtml from './plugins/html';
import { IViteEnv } from './types';
import createSetupExtend from './plugins/setup-extend';
import createComponents from './plugins/components';

export default function loadVitePlugins(viteEnv: IViteEnv, isBuild = false): Plugin[] {
  const plugins: Plugin[] = []

  plugins.push(vue())
  plugins.push(createAutoImport())
  plugins.push(...WindiCSS())
  plugins.push(createHtml(viteEnv, isBuild) as Plugin)
  plugins.push(createSetupExtend())
  plugins.push(createComponents())
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