import type { Plugin } from 'vite';
import setupExtend from 'vite-plugin-vue-setup-extend';

export default function createSetupExtend(): Plugin {
  return setupExtend();
}
