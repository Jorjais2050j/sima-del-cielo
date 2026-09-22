import { z } from 'zod'
import {
  CabinExperienceSchema, CabinSchema, GalleryImageSchema, MenuSchema, PackageSchema,
} from '@/schemas/catalog'
import { http } from '../http'
import type { DataSource } from './types'

/**
 * Fase 2+: backend Node/Express + MySQL.
 * Endpoints sugeridos (REST): GET /packages, /cabins, /cabin-experiences, /menu, /gallery
 * Las respuestas se validan con los mismos esquemas que los JSON locales.
 */
export const apiSource: DataSource = {
  getPackages: () => http.get('/packages', z.array(PackageSchema)),
  getCabins: () => http.get('/cabins', z.array(CabinSchema)),
  getCabinExperiences: () => http.get('/cabin-experiences', z.array(CabinExperienceSchema)),
  getMenu: () => http.get('/menu', MenuSchema),
  getGallery: () => http.get('/gallery', z.array(GalleryImageSchema)),
}
