/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** 'local' (JSON en /src/data) | 'api' (backend Express futuro) */
  readonly VITE_DATA_SOURCE?: 'local' | 'api'
  readonly VITE_API_URL?: string
  /** Si se define, las imágenes se sirven desde Cloudinary */
  readonly VITE_CLOUDINARY_CLOUD_NAME?: string
  readonly VITE_GOOGLE_MAPS_API_KEY?: string
}
interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, unknown>
  export default component
}
