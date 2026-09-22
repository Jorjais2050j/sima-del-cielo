import { z } from 'zod'
import { MediaSchema, MoneySchema } from './catalog'

export const SiteSchema = z.object({
  business: z.object({
    name: z.string(),
    tagline: z.string(),
    summary: z.string(),
    packagesIntro: z.string(),
    pricesNote: z.string(),
  }),
  seo: z.object({
    siteUrl: z.string().url(),
    title: z.string(),
    description: z.string(),
    ogImage: z.string(),
    locale: z.string(),
  }),
  contact: z.object({
    phoneE164: z.string(),
    phoneDisplay: z.string(),
    email: z.string().email().nullable(),
    whatsapp: z.object({ number: z.string(), message: z.string() }),
  }),
  social: z.object({
    instagram: z.object({ handle: z.string(), url: z.string().url() }),
  }),
  location: z.object({
    addressLine: z.string(),
    locality: z.string(),
    region: z.string(),
    postalCode: z.string(),
    country: z.string(),
    coordinates: z.object({ lat: z.number(), lng: z.number() }).nullable(),
    mapsUrl: z.string().url(),
    embedUrl: z.string().url(),
    /** false mientras el cliente no confirme dirección/coordenadas */
    verified: z.boolean(),
  }),
  hours: z.string().nullable(),
  hero: z.object({
    poster: MediaSchema,
    video: z.object({
      /** media: 'mobile' | 'desktop' para servir un archivo más ligero en móvil */
      sources: z.array(z.object({ src: z.string(), type: z.string(), media: z.enum(['mobile', 'desktop']).optional() })),
    }),
  }),
  intro: z.object({ image: MediaSchema }),
  stay: z.object({
    checkIn: z.string(),
    checkOut: z.string(),
    extraGuestFee: MoneySchema,
    includes: z.array(z.string()),
    rules: z.array(z.string()),
  }),
  visit: z.object({
    recommendations: z.array(z.object({ title: z.string(), text: z.string() })),
  }),
})
