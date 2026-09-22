import type { Cabin, CabinExperience, GalleryImage, Menu, Package } from '@/types/models'

/**
 * Contrato de la capa de datos. Los componentes nunca importan JSON ni hacen fetch:
 * llaman a los servicios, que delegan en la implementación activa (local | api).
 */
export interface DataSource {
  getPackages(): Promise<Package[]>
  getCabins(): Promise<Cabin[]>
  getCabinExperiences(): Promise<CabinExperience[]>
  getMenu(): Promise<Menu>
  getGallery(): Promise<GalleryImage[]>
}
