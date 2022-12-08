import type { Plugin } from 'vite';
import { IViteEnv } from '../types';
import legacy from '@vitejs/plugin-legacy'

export default function createLegacy(viteEnv: IViteEnv): Plugin[] {
  const { VITE_USE_LEGACY } = viteEnv
  if (VITE_USE_LEGACY) return legacy()
  return []
}
