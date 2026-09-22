import { env } from '@/config/env'

const WIDTHS = [480, 768, 1080, 1440, 1920]

/**
 * Sin Cloudinary: devuelve la ruta local.
 * Con VITE_CLOUDINARY_CLOUD_NAME: `src` se interpreta como public_id y se generan
 * URLs con f_auto (webp/avif) y q_auto.
 */
export function imageUrl(src: string, width?: number): string {
  if (!env.cloudinaryCloud || src.startsWith('http')) return src
  const id = src.replace(/^\/media\//, 'sima-del-cielo/').replace(/\.\w+$/, '')
  const t = ['f_auto', 'q_auto', width ? `w_${width}` : null, 'c_limit'].filter(Boolean).join(',')
  return `https://res.cloudinary.com/${env.cloudinaryCloud}/image/upload/${t}/${id}`
}

export function imageSrcset(src: string): string | undefined {
  if (!env.cloudinaryCloud) return undefined
  return WIDTHS.map((w) => `${imageUrl(src, w)} ${w}w`).join(', ')
}
