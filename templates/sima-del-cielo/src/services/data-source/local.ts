import { z } from 'zod'
import {
  CabinExperienceSchema, CabinSchema, GalleryImageSchema, MenuSchema, PackageSchema,
} from '@/schemas/catalog'
import type { DataSource } from './types'

/** Fase 1: JSON locales. Import dinámico → cada sección descarga sólo sus datos. */
export const localSource: DataSource = {
  getPackages: async () => z.array(PackageSchema).parse((await import('@/data/packages.json')).default),
  getCabins: async () => z.array(CabinSchema).parse((await import('@/data/cabins.json')).default),
  getCabinExperiences: async () =>
    z.array(CabinExperienceSchema).parse((await import('@/data/cabin-experiences.json')).default),
  getMenu: async () => MenuSchema.parse((await import('@/data/menu.json')).default),
  getGallery: async () => z.array(GalleryImageSchema).parse((await import('@/data/gallery.json')).default),
}
