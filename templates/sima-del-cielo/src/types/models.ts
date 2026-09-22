import type { z } from 'zod'
import type {
  CabinExperienceSchema, CabinSchema, GalleryImageSchema, MediaSchema, MenuCategorySchema,
  MenuItemSchema, MenuSchema, MoneySchema, PackageSchema, PriceSchema,
} from '@/schemas/catalog'
import type { SiteSchema } from '@/schemas/site'

export type Money = z.infer<typeof MoneySchema>
export type Price = z.infer<typeof PriceSchema>
export type Media = z.infer<typeof MediaSchema>
export type Package = z.infer<typeof PackageSchema>
export type Cabin = z.infer<typeof CabinSchema>
export type CabinExperience = z.infer<typeof CabinExperienceSchema>
export type MenuItem = z.infer<typeof MenuItemSchema>
export type MenuCategory = z.infer<typeof MenuCategorySchema>
export type Menu = z.infer<typeof MenuSchema>
export type GalleryImage = z.infer<typeof GalleryImageSchema>
export type SiteContent = z.infer<typeof SiteSchema>
export type ContactInformation = SiteContent['contact'] & { instagram: SiteContent['social']['instagram'] }

/*
 * Entidades futuras (NO implementadas). Documentadas para que los modelos actuales
 * no cierren la puerta: ids string, precios con unidad, capacidad separada.
 *
 * User          { id, email, name, phone, role: 'guest' | 'admin' }
 * Reservation   { id, userId, cabinId?, packageId?, experienceIds[], date/checkIn/checkOut, guests, total: Money, status }
 * Availability  { resourceType: 'cabin' | 'package', resourceId, date, slots }
 * Payment       { id, reservationId, provider: 'mercadopago', status, amount: Money, receiptUrl }
 * Order         { id, userId, items: { menuItemId, qty, price }[], total: Money, status }
 */
