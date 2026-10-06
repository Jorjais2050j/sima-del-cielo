import rawSite from '@/content/site.json'
import { SiteSchema } from '@/schemas/site'

/**
 * Configuración central del sitio.
 * Para cambiar teléfono, WhatsApp, Instagram, dirección o mapa edita SOLO
 * src/content/site.json. Aquí se valida y se exponen constantes con nombre.
 */
export const site = SiteSchema.parse(rawSite)

export const BUSINESS_NAME = site.business.name
export const WHATSAPP_NUMBER = site.contact.whatsapp.number
export const WHATSAPP_MESSAGE = site.contact.whatsapp.message
export const INSTAGRAM_URL = site.social.instagram.url
export const INSTAGRAM_HANDLE = site.social.instagram.handle
export const PHONE_DISPLAY = site.contact.phoneDisplay
export const PHONE_E164 = site.contact.phoneE164

export const LOCATION = site.location
export const GOOGLE_MAPS_URL = site.location.mapsUrl
export const GOOGLE_MAPS_EMBED_URL = site.location.embedUrl

export const NAV_ITEMS = [
  { label: 'Paquetes', hash: '#paquetes', path: '/paquetes' },
  { label: 'Cabañas', hash: '#cabanas', path: '/cabanas' },
  { label: 'Restaurante', hash: '#menu', path: '/menu' },
  { label: 'Contacto', hash: '#contacto', path: '/contacto' },
] as const
