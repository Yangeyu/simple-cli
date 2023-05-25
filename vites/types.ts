export interface IViteEnv {
  VITE_APP_TITLE?: string;
  VITE_PUBLIC_URL: string;
  VITE_PORT?: number;
  VITE_IS_DROP?: boolean;
  VITE_API_URL?: string[] | string;
  VITE_BUILD_COMPRESS?: string;
  VITE_BUILD_DELETE_ORIGIN_FILE?: boolean;
  VITE_USE_LEGACY?: boolean;
}