import { WHATSAPP_MESSAGE, WHATSAPP_NUMBER } from '@/config/site'

/** Único lugar donde se construyen enlaces de WhatsApp. */
export function whatsappLink(message: string = WHATSAPP_MESSAGE): string {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
}
