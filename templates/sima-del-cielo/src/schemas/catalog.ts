import { z } from 'zod'

/**
 * Esquemas Zod = contrato de datos.
 * Validan hoy los JSON locales y mañana las respuestas de la API.
 * Los tipos TS se derivan de aquí (src/types) → una sola definición.
 */

export const MoneySchema = z.object({
  amount: z.number().nonnegative(), // MXN enteros; en Fase 4 considerar centavos
  currency: z.literal('MXN'),
})

export const PriceUnitSchema = z.enum(['person', 'group', 'night', 'session', 'experience'])

export const PriceSchema = MoneySchema.extend({
  unit: PriceUnitSchema,
  /** Personas cubiertas por el precio (p. ej. cabaña x 2 personas) */
  guests: z.number().int().positive(),
})

export const MediaSchema = z.object({
  src: z.string(), // ruta local (/media/...) o public_id de Cloudinary
  alt: z.string(),
  width: z.number().int().positive(),
  height: z.number().int().positive(),
})

export const PackageSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  schedule: z.enum(['am', 'pm']).nullable(),
  category: z.enum(['aventura', 'sesion-fotos']),
  tags: z.array(z.string()),
  price: PriceSchema,
  includes: z.array(z.string()),
  notes: z.array(z.string()),
  images: z.array(MediaSchema).min(1),
  /** Reel de Instagram del paquete (opcional) */
  reel: z.string().url().nullable().optional(),
})

export const CabinSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  category: z.string(),
  description: z.string().nullable(),
  features: z.array(z.string()),
  capacity: z.object({
    baseGuests: z.number().int().positive(),
    maxGuests: z.number().int().positive().nullable(),
  }),
  price: PriceSchema,
  images: z.array(MediaSchema).min(1),
  isActive: z.boolean(),
})

/** Extras contratables sobre una cabaña (decoración romántica). Fase 2: add-on de la reservación. */
export const CabinExperienceSchema = z.object({
  id: z.string(),
  slug: z.string(),
  name: z.string(),
  category: z.literal('romantico'),
  price: PriceSchema,
  includes: z.array(z.string()),
  notes: z.array(z.string()),
  images: z.array(MediaSchema).min(1),
})

const PricedOptionSchema = z.object({ label: z.string(), price: z.number() })

export const MenuItemSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  /** null = "Consultar" (precio no confirmado) */
  price: z.number().nullable(),
  variants: z.array(PricedOptionSchema).optional(),
  addons: z.array(PricedOptionSchema).optional(),
})

export const MenuCategorySchema = z.object({
  id: z.string(),
  group: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  items: z.array(MenuItemSchema),
})

export const MenuSchema = z.object({
  groups: z.array(z.object({ id: z.string(), name: z.string() })),
  categories: z.array(MenuCategorySchema),
})

export const GalleryImageSchema = MediaSchema.extend({
  id: z.string(),
  category: z.string(),
})
